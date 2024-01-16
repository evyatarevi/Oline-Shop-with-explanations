
/*
I want to check if that request is coming from a user that
is actually logged in.
we want to look into the incoming request session to extract
information from it and see whether it's coming from an authenticated user.
*/
const checkAuthStatus = (req, res, next) => {
    const uid = req.session.uid;
/*
remember, when we
do call create user session or
after checking for email and password correctness,
then thanks to the function we wrote (createUserSession()).
We will add a UID field two to session,
and that will be stored on the server in that session data,
in our case, in the database.
*/

    if(!uid){ //means the user did not log in before.
        return next(); //important is that we call next so that the request can still travel on because not being authenticated does not mean that we want to crash the app.
    }

    res.locals.uid = uid; //we can use this information in our views or our other route handlers and middleware functions.
    res.locals.isAuth = true;
    next();
}

module.exports = checkAuthStatus;