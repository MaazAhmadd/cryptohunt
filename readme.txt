// instructions for mysql //

please enter your database credentials in env variables and run mysql queries from cryptohunt.sql file in your database

{
    DB_HOST,
    DB_USERNAME,
    DB_PASSWORD,
    DB_DATABASE
}
if you are using heroku then you can easily set them in app's setting then config var

// instructions for npm //
1. open and extract the provided zip file
   OR clone repo from github:
   "git clone https://github.com/MaazAhmadd/cryptohunt.git" 
2. open terminal in the main folder and type "npm i"
***
 before you make a production build you have to update api_url in config.json file for that you go to client/src folder and "nano config.json" and type url in the place like this :
{ 
 "API_URL" : "https://you_app_url.com/api" 
}  
 ***

3. run "npm run build" in client folder
4. add env variable for jwt key. variable name is JWT_PRIVATE
5. lastly run "npm start" in the main folder
 

To make a user admin please go to mysql terminal and run this command:
USE cryptohunt;
UPDATE users set role="admin" WHERE email="yourEmail@gmail.com";

    


