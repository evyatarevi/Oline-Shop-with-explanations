const express = require('express');
const csrf = require('csurf');
const path = require('path');
const expressSession = require('express-session');

const createSessionConfig = require('./config/session');
const db = require('./data/database');
const addCsrfTokenMiddleware = require('./middleware/csrf-token');
const errorHandlerMiddleware = require('./middleware/error-handler');
const checkAuthStatusMiddleware = require('./middleware/check-auth');
const authRoutes = require('./routes/auth.routes');
const baseRoutes = require('./routes/base.routes');
const productsRoutes = require('./routes/products.routes');



const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public')); //express.static is built in middleware.
app.use(express.urlencoded({extended: false})); //handling data, that's coming in attached to requests, and specifically we're handling data that's coming in because of forms being submitted. {extended: false} set this to false, to only support a regular form submission.

const sessionConfig = createSessionConfig();
//before we use the csrfMiddleware, because csrfMiddleware needs a session.
app.use(expressSession(sessionConfig)); //we can call expressSession as a function to get such a sessionMiddleware, which will do all the session management for us. And to this expressSession function execution, I pass my session configuration.


app.use(csrf()); /*do csrf before a request reaches the routes. it's executed function (when the initial app run), which returns the actual middleware that will be registered. Now we will have that CSRF protection and that simply means that all incoming requests, which are not Get requests, now needs to have a CSRF token attached.
                This function check any post requests and if don't have a valid CSRF token will be denied. Therefore, we need to ensure that we add such a token to all the forms we have on our page. and to do this conveniently, I will add my own custom middleware (addCsrfTokenMiddleware) and use in 'locals' there.*/
app.use(addCsrfTokenMiddleware); //It's important that we do this after registering the CSRF package middleware, because this middleware gives us CSRF token method, which I am using in my own middleware (req.csrfToken()).
/*
we have two middleware that deal with CSRF token:
1. The third-party 'csurf' - help us generate the token (that I add to my views using 'req.csrfToken()') + checks incoming tokens for validity (for POST request).
2. Our middleware - distributes generated tokens to all routes and views.
*/
app.use(checkAuthStatusMiddleware);


app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);


//express call this function whenever we have an error in one of the other middlewares or route handler functions and we're not able to recover from it.
app.use(errorHandlerMiddleware);
/*
Express will execute errorHandlerMiddleware automatically
if some error occurs in any other middleware. But unfortunately,
Express ignores errors that are occurring inside of asynchronous
operations. Therefore, we have to handle this manually, with help
of try catch. Try catch allows us to implement our own error handling,
in case this operation or some nested(!) operation in there goes wrong.
*/



db.connectToDatabase() //any function decorated with async will automatically always yield a promise.
.then(()=>{
    app.listen(3000);})
.catch(()=> {
    console.log('Failed to connect to the database!');
    console.log(error);
});



/*
process of token:
1. Get request - csrf doesn't check. addCsrfToken() generate token (using csurf package).
2. We added token to signup/login view page (to be available in the page) and response it.
3. Form submitted in Post request - we attach token to request (it possible because of section 2).
4. csrf check if he has token (there is) and if has, it froward to the next middleware.
*/

/*
Sessions are pieces of data stored on the server,
which are connected to users with help of cookies.
And if a user has a valid cookie with a valid session ID,
that points to one of the sessions stored on the server
and that session then says that this user is authenticated,
then this user can be granted extra access
to extra resources.

Sessions can be stored anywhere
in memory, which is not ideal though,
in files or in databases.
And I want to store my sessions
in the existing mongodb database I already have,
and 'connect-mongodb-session' package will help us with that.
*/