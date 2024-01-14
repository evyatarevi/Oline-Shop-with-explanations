const bcrypt = require('bcrypt');  //good practice to have a built in or third-party package imports first, and then your own imports thereafter.
const db = require('../data/database'); //get access to the connected database.


//Classes allow us to define blueprints for objects that we wanna create in the future.
class User{
    constructor(email, password, fullname, street, postal, city){ //which is a method that will be called automatically whenever you create an instance based on that class with the new keyword. By adding these optional values at the end of this parameter list here, I make them optional. The omitted parameters will simply receive a default value of undefined. 'Undefined' say 'there is no value'.
        this.email = email,  //this keyword refers to the to-be-created object.
        this.password = password,
        this.name = fullname,
        this.address = {
            street: street,
            postalCode: postal,
            city: city
        }
    }

    async signup(){  //we turn sign up into an async function. Therefore to sign up method itself will all the return a promise.
        const hashedPassword = await bcrypt.hash(this.password, 12); //The second parameter value is  the number of salting rounds, which basically just controls how strong the hashing algorithm is.
        await db.getDb().collection('users').insertOne({   //Collections are basically like tables in a MySQL or in SQL database in general, but they have no fixed schema. They have no fixed data types. Collections of documents. They are more flexible.
            //I think I can write 'this' alone without specifying the properties like: 'insertOne(this);'
            email: this.email,
            password: hashedPassword,
            name: this.name,
            address: this.address
        }); 
    }
}

module.exports = User;
