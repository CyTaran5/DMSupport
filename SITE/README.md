# TODO APP
This is the code provided as an example for you to edit on your own and alter to adapt your apps needs.  It is a React.js application that uses the Chakra UI library for the frontend.  The backend is provided as an example of how to integrate your database to an application and has examples of all four CRUD operations.  As my database is local, this app will not run properly on your device but the axios database calls demonstrate how to adapt it to your own database.  However, the front end should still render, even if the buttons do not work.  In short, this code will:
- Demonstrate a sample backend using node.js
- Demonstrate how to use backend endpoints in the frontend code
- Demonstrate routing in a react.js application
- Demonstrate the use of Chakra UI so you can use the documentation to implement your own UI elements
- Demonstrate the use of React.js components (Navbar and ListItem)

---

## How to use this repo

Start by cloning this repository into an appropriate folder on your device and navigating to that folder.

### Backend

These instructions will set up the backend example for your project.  Once the server is up and running, you should be able to connect to the backend on http://localhost:8080 (or another port if you choose to change it) and test your project's endpoints once you code them.

**This required node.js to be installed on your device.  Installing this is just a google away but is different depending which machine you have.
MAKE SURE YOU HAVE AN UP TO DATE node.js! I am using version 18.4.0 so older versions of node.js may cause issues.  These typically show up in the form "module not found".**

1. Navigate into the backend folder: ```cd backend```
2. Install the dependencies: ```npm install```
3. If you want to run your backend on a port other than 8080, open the index.js file and edit the port number on the following line: 
``` javascript
//listen on port 8080, or change to desired port
app.listen(8080, () => {
  console.log("Server is running")
});
```
4. Run the server with nodemon (nodemon allows us to make live changes without restarting the backend): ```npm start```
5. Edit the following line to connect to your specific mysql database:
``` javascript
const db = mysql.createConnection({
    host: "127.0.0.1", //FIX ME: change to your database host address
    user: "root", //FIXME: change to your database username
    password: "root", //FIXME: change to your database username
    database: "Todo" //FIXME: change to the name of your database (don't confuse the name of the db with the name of your schema)
})
```
7. Edit index.js in this folder to create your endpoints for your application.  Once they are created, make sure the server is running and use a tool like "Postman" to make sure your endpoints are working and interacting with your database the way they should.


### Frontend
2. Run ```cd frontend``` to navigate to the frontend foler
3. Run ```npm install``` to install the correct dependencies for the react app
4. Run ```npm install axios``` to install axios, used to make our calls to the backend
5. Go to App.js and look for the innermost tag that says <Route/> and note how this is done.  If you want to add pages to your application, this is where to do it!
6. If you end up adding a route, make sure you add the corresponding page in the pages folder.  Format that page like my example Todos.jsx. Then back in App.js, make sure you import the file at the top.
7. Edit your page or reformat Todos.js depending on your routes to suit your apps needs.
8. Note:  I use components in this application.  These are self-made tags that are in their own folder than can be reused.  Feel free to make your own, or just keep everything in one file.  Edit the Navbar component to edit the navigation bar and menu items to suit your app!
9. Run ```npm start``` to start up the frontend and to run the app on http://localhost:3000
