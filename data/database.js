const mongodb = require('mongodb');  //MongoDB package will give us a lot of utility methods that make working with a database easier.


const MongoClient = mongodb.MongoClient; //I guess I didn't run a function or create anything here, but I created a variable that will refer to the class.

let database;

const connectToDatabase = async () => {
    const client = await MongoClient.connect('mongodb://localhost:2701'); //Connect to the server(!) .Call the 'connect' static method on it, so we don't need to instantiate MongoClient. Connect returns a promise. What we'll get back is a client object which has internal information about the established connection.
    database = client.db('online-shop'); //we can call on this client object to connect to a certain database(!). If it doesn't exist, it will be created.
}

const getDb = () => {
    if(!database){
        throw new Error('You must connect first!!!');
    }

    return database;
}

module.exports = {
    connectToDatabase: connectToDatabase,
    getDb: getDb
}
