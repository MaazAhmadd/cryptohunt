
-> First setup your database. Create a db by the name 'cryptohunt'. you can use any other name too.
-> Then run all the queries from 'cryptohunt.sql' file
-> Then you need to enter your api address in the 'config.json' file. For that just enter the your domain's address or your VPS's address and append it with '/api'.
-> Then you need to make a production build. Everything is already set just run this command in client folder: 'npm run build'
you can do this on your pc and push the code to github along with the 'build' folder and then clone the repo into your hosting, this way you won't have to install node_modules for frontend on your hosting machine.
-> Then you need to add environment variables for your database and jwt key. which are as follows:
    {
        DB_HOST,
        DB_USERNAME,
        DB_PASSWORD,
        DB_DATABASE,
        JWT_PRIVATE_KEY
    }

-> If you are hosting on heroku, set these variables in app's settings>>config vars
otherwise set them manually in the terminal.
