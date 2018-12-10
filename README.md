# WhatsWrong

## Website is divided into three sections with a README.md provided for each on how to run the program locally:
1. Front-end
2. Back-end
3. Android

## Folder Organization

### Front-end

- /frontend (Folder contains all of the code for the frontend of the Website)
  - /public (Commonly contains html and images)
  	- /images (It is conventional to place images in the public folder. We used these images in src/Modals)
  	  - dict-1.png 
  	  - dict-2.png
  	  - dict-3.png
  	  - simp-search-1.png
  	  - simp-search-2.png
  	  - simp-search-3.png
  	  - smart-search-1.png
  	  - smart-search-2.png
  	- favicon.ico (This is the icon used for the title of the page)
  	- index.html (Default HTML file when creating React app. In here, we changed the title of the page, added javascript script tags for Bootstrap Modal, and added our Google font)
  	- manifest.json (Default React file)
  - /src (This is the folder that contains React code)
  	- /Components (This folder contains React code responsible for views within the website.)
  	  - /WhatsWrong (Folder containing React Code for Search View, Symptoms View, and Diagnosis View.)
  	  	- WhatsWrong.js (React file that contains code for the entire website. This includes Search View, Symptoms View, and Diagnosis View. This was done to ensure efficiency in both end-user experience and coding structure.)
  	  	- searchStyles.css (CSS file for Search View of Search.js)
  	  	- symptomStyles.css (CSS file for Symptoms View of Search.js)
  	  	- diagnosisStyles.css (CSS file for Diagnosis View of Search.js)
  	  - /Modals (These are the icons in the corners of the page. They pop-up a new window for the user while staying on the same page. These were implemented using BootStrap)
  	  	- Dictionary.js (React file. Allows for user to make a search in Medical Dictionary to further understand diagnosis provided by WhatsWrong)
  	  	- Dictionary.css (CSS file for Dictionary.js)
  	  	- HowToUse.js (React file. Step-by-step explanation to user on how the website works. Includes images from public/images)
  	  	- TeamContact.js (React file. Shows user the visionaries who made WhatsWrong possible. Also includes contact email)
  	  	- HowToUseTeamContact.css (CSS file for both HowToUse.js and TeamContact.js)
  	  	- modal.css (Copied whatever was needed to make Modal feature from Bootstrap CDN)
  	- App.test.js (Default React File. Used to make sure the page crashes with an error so that error can be analyzed and fixed)
  	- history.js (Allows for programmer to create separate URLS. Can keep the file as is)
  	- index.css (Default CSS file when creating React app)
  	- index.js (Default index.js file created with React app. Here, we can add more pages for the website using the Route tag)
  	- registerServiceWorker.js (Default React File)
  - README.md (Detailed step-by-step process on how to run the front-end locally)

### Back-end

### Android

- /MyApplication/app/src/main/java/com/example/a69591/myapplication
  - MainActivity.java (Calls the backend to get back the symptoms)
  - symptomsActivity.java (Shows a list of symptoms and stores the selected symptoms)
  - diagnosis.java (Calls the backend for both diagnosis and dictionary)
 
- /MyApplication/app/src/main/res/layout
  - activity_main.xml (view of the Search screen)
  - activity_symptoms.xml (view of the Symptoms screen)
  - activity_diagnosis.xml (view of the Diagnosis screen)

- /MyApplication/app/src/main/res/layout-land
  - activity_main.xml (view of the Search screen when screen is rotated)
  - activity_symptoms.xml (view of the Symptoms screen when screen is rotated)
  - activity_diagnosis.xml (view of the Diagnosis screen when screen is rotated)
    
