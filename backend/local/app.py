from flask import Flask
from flask import render_template
from flask import request, jsonify
from flask import request
from flask_cors import CORS
import json
import mysql.connector
import infermedica_api
import requests

app = Flask(__name__)
CORS(app)
app.config["DEBUG"] = True


#this is the python search function used for our advanced medical search
#this function searches our database using the common name as well as the medical name
#then returns the symptom information to the front end
@app.route('/search', methods=['POST'])
def search():
    mydb = mysql.connector.connect(
      host="localhost",
      user="root",
      passwd="krisali1",
      database="infermedica"
    )
    #mysql cursor object
    mycursor = mydb.cursor()

    #android sends json array objects and react sends a regular json
    #thats why there is an if statement checking the objects
    
    ##use json dumps for android
    #can use the search key for react
    #have to check type because react and android send different objects
    jsonResp=request.get_json()
    if type(jsonResp) is list:
        #in order to read the object, have to convert the json array that was sent to a json obj, then get the data
        #for each key, other wise we will  run into python errors

        #dumps converts the json to a string
        #we can take the first object because we know the android app will only send one object
        jsonString=json.dumps(jsonResp[0])
        #loads converts the string to a pyython json
        jsonObj = json.loads(jsonString)
        #get thhe data from the json
        stringSearch = jsonObj['search']
        stringSex= jsonObj['gender']
        numAge = jsonObj['age']
    else:
        #the json is much simpler from react
        #we can use the search keys directly
        stringSearch = jsonResp['search']
        stringSex= jsonResp['gender']
        numAge = jsonResp['age']

    #tokenizing the search term by using the split function with the separator as a space
    #this will take each word that is in the search phrase and store it in the array
    #stringArrSymp
    stringArrSymp =stringSearch.split(' ')

    #counter for the indexes
    numCount=0

    #replacing the apostrophes (if there are any) with double apostrophes because the single apostrophes
    #will cause errors in the sql statement that we use later
    for stringToken in stringArrSymp:
        stringArrSymp[numCount]=stringArrSymp[numCount].replace("'", "''")
        numCount=numCount+1

    #now we create the like part of the sql statement that will be responsible for doing the filtering
    
    stringSQLlike = ''

    #this loop iterates through the array and concatenates the like part of the sql statement
    #what the result will be is each word in the search phrase will be used in looking for an item
    #in our symptoms table
    for numCt in range(len(stringArrSymp)):
        if numCt==len(stringArrSymp)-1:
            break
        else:
            stringSQLlike = stringSQLlike +" (common_name LIKE '%"+ stringArrSymp[numCt] +"%' OR symptom_name LIKE '%"+ stringArrSymp[numCt] +"%')  OR "
            
    #concatenating the final search term
    stringSQLlike = stringSQLlike + " (common_name LIKE '%" + stringArrSymp[len(stringArrSymp)-1] +"%' OR symptom_name LIKE '%" + stringArrSymp[len(stringArrSymp)-1] +"%') AND (sex = 'both' or sex ='" +stringSex +"')"
    

    #adding the select portion of the sql statement to the front of the string
    stringSQLlike = ("SELECT SID, symptom_name, common_name, sex, seriousness, img_url " +
            " FROM infermedica.symptom_data WHERE " + stringSQLlike)

    #we have to use a json array regardless of what kind of result because if the android code sends a json array to the server
    #the server must send back a json array or the android code will run into errors
    jsonArrData = []
    #using try except to handle potential database errors
    try:
        #executing the statement
        mycursor.execute(stringSQLlike)
        #storing the results in an array
        myresult = mycursor.fetchall()
    
        if len(myresult) ==0:
            #if there are no results we have to let the front end know that, so put it in the first sid
            #sid = Symptom ID, symptom id is used in our database as a primary key for symptoms
            jsonArrData.append({'SID':'no_results'})
            return jsonify(jsonArrData)
        
        numCt=0
        #this for loop iterates through our results array, and adds  each symptom and its information to the json array which will
        #be sent back to the front end
        for result in myresult:
            jsonArrData.append({'SID': myresult[numCt][0], 'symptom_name': myresult[numCt][1],  'common_name': myresult[numCt][2], 'sex': myresult[numCt][3], 'seriousness': myresult[numCt][4], 'img_url': myresult[numCt][5]})
            numCt=numCt+1
            
        return jsonify(jsonArrData)
    except:
        #if there is an error, send it back to the front end
        jsonArrData.append({'SID':'error_python_error'})
        return jsonify(jsonArrData)

#this is the function used for our simple search
#this uses infermedica's NLP to parse and tokenize search phrases
#we send the phrase to the api and the api returns symptoms and their
#information, we then send that back to the front end
@app.route('/simpsearch', methods=['POST'])
def simpsearch():
    #android sends json array objects and react sends a regular json
    #thats why there is an if statement checking the objects
    
    ##use json dumps for android
    #can use the search key for react
    #have to check type because react and android send different objects
    jsonResp=request.get_json()
    if type(jsonResp) is list:
        #in order to read the object, have to convert the json array that was sent to a json obj, then get the data
        #for each key, other wise we will  run into python errors

        #dumps converts the json to a string
        #we can take the first object because we know the android app will only send one object
        jsonString=json.dumps(jsonResp[0])
        #loads converts the string to a pyython json
        jsonObj = json.loads(jsonString)
        #get thhe data from the json
        stringSearch = jsonObj['search']
    else:
        #the json is much simpler from react
        #we can use the search keys directly
        stringSearch = jsonResp['search']


    #infermedica api info, omitted real key and id
    url = "https://api.infermedica.com/v2/parse"
    headers = {
    'App-ID': "ab68b198",
    'App-Key': "0a0702c5648044b31adc9d388d37841d",
    'Content-Type': "application/json"
    }
    #creating the json as a string with all of the necessary info
    #text key is the search phrase that the user enters
    #concept type is set to symptoms because we want to get symptom information
    #to display to our users
    #include_tokens is set to true because we want results for each token in the phrase
    jsonData = '{"text":"' +stringSearch+'" , "concept_types": ["symptom"], "include_tokens": true}'
    
    response = requests.request("POST", url, data=jsonData, headers=headers)
    
    jsonResponse = json.loads(response.text)
    jsonArrData = []
    #using try except to catch potential infermedica api errors
    try:
        #mentions is the entire json of symtoms, if its length is 0 then the search yielded no results
        if len(jsonResponse['mentions']) == 0:
            jsonArrData.apppend({"SID": "no_results"})
            return jsonify(jsonArrData)

        #choice_id = present means the symptom is present in the user
        #so for example, if the user searches ssomething like i have a runny nose fever but no headache,
        #everything except headache will have a choice_id = present
        for jsonSymptoms in jsonResponse['mentions']:
            if jsonSymptoms['choice_id']=='present': 
                jsonArrData.append({'SID': jsonSymptoms['id'], 'common_name' : jsonSymptoms['common_name']})

        return jsonify(jsonArrData)
    except:
        jsonArrData.append({'SID':'error'})
        return jsonify(jsonArrData)

#this is the function used to get the diagnosis for the user
#the server receives a json of symptom ids, the server creates a json of symptom ids
#the server then uses the infermedica library to add the ids to an infermedica object, and receives
# a diagnosis. when we receive a diagnosis, we match it to the conditions in our database and send the
#user that information
@app.route('/diagnosis', methods=['POST'])
def diagnosis():
    mydb = mysql.connector.connect(
      host="localhost",
      user="root",
      passwd="krisali1",
      database="infermedica"
    )

    #mysql cursor object
    mycursor = mydb.cursor()
    
    #setting the api credentials, in the infermedica object
    api = infermedica_api.API(app_id='ab68b198', app_key='0a0702c5648044b31adc9d388d37841d')
    
    #android sends json array objects and react sends a regular json
    #thats why there is an if statement checking the objects
    
    ##use json dumps for android
    #can use the search key for react
    #have to check type because react and android send different objects
    jsonResp=request.get_json()
    if type(jsonResp) is list:
        #in order to read the object, have to convert the json array that was sent to a json obj, then get the data
        #for each key, other wise we will  run into python errors

        #dumps converts the json to a string
        #we can take the first object because we know the android app will only send one object
        jsonString=json.dumps(jsonResp[0])
        #loads converts the string to a pyython json
        jsonObj = json.loads(jsonString)
        #get thhe data from the json
        stringSearch = jsonObj['search']
        stringSex= jsonObj['gender']
        numAge = jsonObj['age']
    else:
        #the json is much simpler from react
        #we can use the search keys directly
        stringSearch = jsonResp['search']
        stringSex= jsonResp['gender']
        numAge = jsonResp['age']

    #setting the sex of the user
    ##there are errors when you send the item in the dictionary so do an if statement for a hardcoded sex value
    if stringSex =='Male':
        infer_request = infermedica_api.Diagnosis(sex='male', age=numAge)
    elif stringSex =='Female':
        infer_request = infermedica_api.Diagnosis(sex='female', age=numAge)
    else:
        #there really shouldnt ever be an error with gender because the front end sends hard coded values
        #also the front end checks for null entries as well
        return 'error with gender'

    #iterate through the json, and add each symptom id to the request, also set the symptom as present as apposed to absent
    for jsonSymp in jsonResp:
        infer_request.add_symptom(jsonSymp['SID'], 'present')


    #using the infermedica library, use the diagnosis function to receive the diagnosis
    infer_request = api.diagnosis(infer_request)

    jsonArrData =[]
    #have to convert the json received in the api request to a python string
    stringConditions =json.dumps(infer_request.conditions)
    #then convert it to a python json
    jsonConditions=json.loads(stringConditions)

    #each diagnosis we receive  from infermedica is referred to as a medical condition
    #our database has all of the medical conditions available in infermedica
    #when we receive the diagnosis( a json of conditions and their condition ids) we search our
    #database for those id's, and the condition's medical information, then send that information back to the
    #front end

    #if there is no available diagnosis
    if len(jsonConditions) ==0:
            jsonArrData.append({'CID':'no_results'})
            return jsonify(jsonArrData)

    for jsonTmp in jsonConditions:
        #create the sql select statement using the cid we receive from infermedica as the filter in the where statement
        #category is medical field, severity is medical severity, hint is advice that infermedica suggests,
        #physician is the specialist for the condition
        stringSQL = "SELECT category, severity, hint, physician FROM infermedica.condition_data WHERE CID = '" + jsonTmp['id'] + "'"
        #using try except to catch sql errors
        try:
            mycursor.execute(stringSQL)
            myresult = mycursor.fetchall()
            
            if len(myresult) ==0:
                #there should never be a case where we have 0 results, because all of the condition ids are in our database
                # but better to be safe
                
                #do nothing, skip to next item in the list
                #python throws an error if you dont execute a command, so just set a dummy variable
                t='t'
            else:
                #add the data to our json. convert probability to a string to avoid type errors for the front end and android
                jsonArrData.append({'CID': r['id'], 'common_name': r['common_name'], 'condition_name': r['name'], 'probability': str(r['probability']), 'category': myresult[0][0], 'severity': myresult[0][1], 'hint':myresult[0][2], 'physician': myresult[0][3]})
        except:
            #move on to the next item
            t='t'
        
    #again, there really shouldnt be a case like this, unless something went wrong in ppython or sql, so keep the error checking and let
    # the front end know theres an error
    #otherwise send the json of conditions
    if len(jsonArrData) ==0:
        jsonArrData.append({'CID':'error_python_error'})
        return jsonify(jsonArrData)
    else:
        return jsonify(jsonArrData)

	
#this is the function used to get dictionary results
#we send a search phrase to the api via a query string
#we get a response, and parse out each definition
#if there are no definitions there might be suggestions, or
#just no results at all, in those cases, notifiy front end
@app.route('/dct', methods=['POST'])
def dct():
    #android sends json array objects and react sends a regular json
    #thats why there is an if statement checking the objects
    
    ##use json dumps for android
    #can use the search key for react
    #have to check type because react and android send different objects
    jsonResp=request.get_json()
    if type(jsonResp) is list:
        #in order to read the object, have to convert the json array that was sent to a json obj, then get the data
        #for each key, other wise we will  run into python errors

        #dumps converts the json to a string
        #we can take the first object because we know the android app will only send one object
        jsonString=json.dumps(jsonResp[0])
        #loads converts the string to a pyython json
        jsonObj = json.loads(jsonString)
        #get thhe data from the json
        stringSearch = jsonObj['dict']
    else:
        #the json is much simpler from react
        #we can use the search keys directly
        stringSearch = jsonResp['dict']
    
    url = "https://www.dictionaryapi.com/api/v3/references/medical/json/"

    #replacing spaces and apostrophes
    stringSearch= stringSearch.replace(' ', '%20')
    stringSearch=stringSearch.replace("'", '%27')

    #updating the url
    url = url+stringSearch

    querystring = {"key":"7e644393-19e6-4f9f-9d3c-0f8536dd4955"}
    #making the api call to the dictinary api
    response = requests.request("GET", url, params=querystring)

    #store response in a json
    jsonResp= json.loads(response.text)

    jsonArrData=[]
    #sometimes the json comes back completely empty with  no results
    # or suggestions, in that case let the front end know
    if len(jsonResp) == 0:
        jsonArrData.append({'phrase':'no_results'})
        return jsonify(jsonArrData)
    
    #use try catch because there will be an error most likely with empty dictionaries
    #being sent back in the json, in that case theres no results,
    #or suggestions. a suggestion is what the dictionary 'suggests'
    #when it cant find the word you send
    #usually suggestions occur with mis spelling for example we send
    #hnad instead of hand
    try:
        for dicMeta in jsonResp:
            #inside the response from the dictionar all we need is the meta id
            #and the short def
            #meta id is the actual word that is being sent back by the dictionary
            #short def is a dictionary containing many possible definitions of the word/meta id
            stringMetaID =dicMeta['meta']['id']

            #add the word and each of its meanings
            for stringDef in dicMeta['shortdef']:
                jsonArrData.append({'phrase':meta, 'def': stringDef})

        return jsonify(jsonArrData)
    except:
        #if theres an error its because the jsons dont have the dictionary items we search for
        #in that case we either have no results or suggestions
        if len(jsonResp)==0:
            jsonArrData.append({'phrase':'no_results'})
            return jsonify(jsonArrData)
        elif len(jsonResp)!=0:
            #if the json isnt empty then we have suggestions, signal to the front end
            data.append({'phrase':'no_results_suggestions'})
            #add each suggesstion
            for stringPhrase in jsonResp:
                jsonArrData.append({'phrase': stringPhrase})

            return jsonify(jsonArrData)
        #extra error checking   
        else:
            jsonArrData.append({'phrase':'error_python_error'})
            return jsonify(jsonArrData)


app.run()
