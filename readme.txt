** follow these instructions if you want to deploy on linux **
    
// instructions for mysql //
 
1. install mysql on you machine using following commands:
   "
   wget http://repo.mysql.com/mysql-apt-config_0.8.9-1_all.deb
   sudo dpkg -i mysql-apt-config_0.8.9-1_all.deb

   sudo apt-get update
   sudo apt-get install mysql-server
   "
2. open your terminal/cmd/bash and type "mysql -u root -p" and enter the password for root user
3. run the following mysql queries and please read comments: 
   "
    CREATE DATABASE cryptohunt;
    CREATE USER 'cryptohunt'@'localhost' IDENTIFIED WITH mysql_native_password BY 'cryptohunt';
    --user is cryptohunt as well as password is cryptohunt ***note that do not forget to use mysql_native_password because nodejs only supports it***;
    GRANT ALL PRIVILEGES ON *.* TO 'cryptohunt'@'localhost'; 
    USE cryptohunt;
    --now you're in cryptohunt database now go to the app folder and open the file cryptohunt.sql and copy all the code into the mysql command line and run it.
    
    "
   then exit mysql by type 'exit' 

4. if you have your own database credentials please enter them in db_config.js file


#install node
   curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -

sudo apt update
sudo apt install nodejs


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
4. lastly run "npm start" in the main folder
 

To make a user admin please go to mysql terminal and run this command:
USE cryptohunt;
UPDATE users set role="admin" WHERE email="yourEmail@gmail.com";

    




