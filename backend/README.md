Running the server code locally

1) Create the database
  - create a local connection, and set the password to krisali1. the password can be modified, however, if the password is modified, it        will need to be modified on the server code.
  - the sql code used to create our database is located in the sql folder. In MySQL, use the create_schema code, then the other 2 create      files to create the tables symptom_data and condition_data. then use the remaining three files to populate the tables
2) Run the code locally
  - there may be libraries that need to be installed, such as: flask, flask_cors, json, infermedica_api, requests, and mysql.conector.
  - Once those libraries are installed, using run the file using the cmd command py app.py (in the directory where the file resides.)
