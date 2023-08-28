Trial Project by Rodwell Matchon for Ingenuity requirement.

This project is divided into two folders: client and server.

"client" folder is the frontend side using ReactJS.
"server" folder is the backend side using NodeJS.

Kindly access the directory of each folder and run this command in the terminal "npm install" to install the modules needed 
for each application since node modules are not included in pushing the files in the Github repository.

To run the server, go to the directory of the server folder and run the command "node index" or "nodemon index" if nodemon npm is already installed globally.
To run the client, go to the directory of the client folder and run the command "npm start".

This project is using an Odoo module and can be accessed in this link: https://for-trial-project.odoo.com
and is also using an npm called "odoo-xmlrpc" to communicate with the Odoo module/application.
This npm can be accessed in this link: https://www.npmjs.com/package/odoo-xmlrpc

Credentials can be found in the "index.js" file in the server folder.
This Odoo application is only a trial version and will expire in 12 days from the current time: 4:28A.M of August 29, 2023.
Data can be found in the Trial Application/Module in the said application.


There are two types of users: Admin and Basic users.
In the login page, you can create an account and you can choose if it can be an Admin or a Basic user.
Basic users can create, view, edit, and delete their own recipes.
Admin users can do the same thing but can also view, edit, and delete ALL recipes in the database through accessing the Admin Dashboard.
Data are not really deleted but only changed its status from "Active" to "Inactive" to avoid data deletion completely 
but these "deleted" data can't be seen in the UI.

Sample users:
Admin accounts:
1.) email - matchon.rodwell@gmail.com
    password - 12345
2.) email - zuko123@gmail.com
    password - firenation

Basic accounts:
1.) email - avataraang@gmail.com
    password - airnomad
2.) email - korratan@gmail.com
    password - 123
