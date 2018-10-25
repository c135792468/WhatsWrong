from flask import Flask
from flask import render_template
from flask import request, jsonify
from flask import request
import json
import mysql.connector

##mydb = mysql.connector.connect(
##  host="localhost",
##  user="root",
##  passwd="hunter3663943f",
##  database="test"
##)
###print(mydb)
##
##mycursor = mydb.cursor()

app = Flask(__name__)
 
##@app.route("/")
##def hello():
##    return "Welcome to Python Flask!"
 
##if __name__ == "__main__":
##    app.run()

app.config["DEBUG"] = True


# Create some test data for our catalog in the form of a list of dictionaries.
books = [
    {'id': 0,
     'title': 'A Fire Upon the Deep',
     'author': 'Vernor Vinge',
     'first_sentence': 'The coldsleep itself was dreamless.',
     'year_published': '1992'},
    {'id': 1,
     'title': 'The Ones Who Walk Away From Omelas',
     'author': 'Ursula K. Le Guin',
     'first_sentence': 'With a clamor of bells that set the swallows soaring, the Festival of Summer came to the city Omelas, bright-towered by the sea.',
     'published': '1973'},
    {'id': 2,
     'title': 'Dhalgren',
     'author': 'Samuel R. Delany',
     'first_sentence': 'to wound the autumnal city.',
     'published': '1975'}
]


@app.route('/', methods=['GET'])
def home():
    return '''<h1>Distant Reading Archive</h1>
<p>A prototype API for distant reading of science fiction novels.</p>'''


# A route to return all of the available entries in our catalog.
@app.route('/api/v1/resources/books/all', methods=['GET'])
def api_all():
    return jsonify(books)

@app.route('/test', methods=['GET'])
def test():
    return jsonify(books)



@app.route('/search', methods=['POST'])
def search():
##    mydb = mysql.connector.connect(
##      host="inferdb.chhodwazdagy.us-east-2.rds.amazonaws.com",
##      user="hunter_capstone",
##      passwd="hunter_capstone12345",
##      database="inferdb"
##    )
##    mydb = mysql.connector.connect(
##      host="localhost",
##      user="root",
##      passwd="hunter3663943f",
##      database="test"
##    )
    #print(mydb)
    mydb = mysql.connector.connect(
      host="127.0.0.1",
      user="root",
      passwd="rhassan0221",
      database="sys"
    )

    mycursor = mydb.cursor()
    #return jsonify(books)
    #return jsonify(js)
    #return "testsearc"
    y=request.get_json()
    #return y['t1']
    symp =y['t1'].split(' ')
    like = ''

    for x in range(len(symp)):
        if x==len(symp)-1:
            break
        else:
            #print(x)
            like = like +" common_name LIKE '%"+ symp[x] +"%' AND "
            #print(like)

    like = like + "common_name LIKE '%" + symp[len(symp)-1] +"%'"
    #print(like)

    #like = ("SELECT  sid FROM test.symptom_data WHERE " + like)

    like = ("SELECT common_name " +
            " FROM sys.symptom_data WHERE " + like)
    #print(like)
    #return like
    #SELECT  sid, common_name, sex, img_url, seriousness FROM test.symptom_data WHERE common_name 
    #LIKE '%foot%'
    mycursor.execute(like)
    myresult = mycursor.fetchall()
    #return myresult[0]
    data = []
    #data.append({'sd':'12'})
    #data.append({'sd':'123'})
    #return jsonify(data)
    for z in myresult:
        data.append({'name': z})
    return jsonify(data)


    
    
app.run()