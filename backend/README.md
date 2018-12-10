## Running the Server Code Locally

1) Create the database
   - Create a local connection, and set the password to krisali1. The password can be modified; however, if the password is modified, it will need to be modified on the server code
   - The SQL code used to create our database is located in the SQL folder. In MySQL, use the create_schema code, then the other two create files to create the tables symptom_data and condition_data. Then use the remaining three files to populate the tables
2) Run the code locally
   - There may be libraries that need to be installed, such as: flask, flask_cors, json, infermedica_api, requests, and mysql.conector
   - Once those libraries are installed, run the file using the cmd command py app.py (in the directory where the file resides)
