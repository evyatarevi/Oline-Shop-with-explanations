/*
since we'll have a couple of things to set up in session, I created 'config' folder.
It's not a must do, but something I'll do here to again keep the app.js file lean.
*/
const expressSession = require('express-session');
const mongoDbStore = require('connect-mongodb-session'); //mongoDbStore is function to create a new mongoDbStore. It help us to create object to store in mongoDB server.


const createSessionStore = () => {  
    const MongoDBStore = mongoDbStore(expressSession); //mongDbStore wants the session for which it will be created.

    const store = new MongoDBStore({ 
        uri: 'mongodb://localhost:27017', //uri to our database.
        databaseName: 'online-shop', //the databaseName. The same name I use in my 'database.js' file.
        collection: 'sessions' //define a collection in which our sessions will be stored.
    });
    //This will then give us the final store which we can use and attached to our session.
    return store;
}


//I wanna create a configuration for my session. And the configuration is more than just a store (that we did up).
const createSessionConfig = () => {
    /*
    because the express session package which we will use in 'app.js'
    wants an object with all the configuration settings
    that we can set for creating such a session,
    So here I'll return such a configuration object.
*/
    return {
        secret: 'super-secret',
        resave: false,
        saveUninitialized: false, //This ensures that we only saved a session data to the database if it really changed, and if some values were set.
        store: createSessionStore(),
        cookie: { //if we don't configure it, it will be cleared or the session will be invalidated whenever the user closes the browser.
            maxAge: 2 * 24 * 60 * 60 * 1000  // set in milliseconds. In this case, is set to two days.
        }
    }
}

module.exports = createSessionConfig;