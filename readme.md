---------Welcome to TSApp installation guide ------------
1. Please update your MySQL database connection parameters in config/database.js file
2. The Node HTTP server is configured to listen on port # 3000
3. The complete backup of the database dump is available in files/tsapp_db.sql. Please import to bootstrap/ initialize the backend, before you start playing with the App.
4. Please clone the git repo from https://github.com/srinivasnangunuri/tsapp.git . The package.json should help with installing node dependencies and the node server setup on your machine
5. server.js in the entry point for our TSApp i.e. issue 'node server.js' to start the server .http://localhost:3000 in your browser should land you on the home page i.e. public/index.html. the server will then listen indefinitely for any GET/POST requests  
