/*get the request object,
because we'll need that to access the session,
then the user that we created with all the data
that belongs to that user,
and finally, action that should be executed
once the session was updated. */
const createUserSession = (req, user, action) => {
    req.session.uid = user._id.toString();
    /*'req.session' - This is a property that's made available by  the express session package. 'uid' - my choice. '_id' - is the ID format used by MongoDB. Internally in the database, every document gets this _id field as a unique identifier. 
     And since this user which I expect here is the user coming from the database, it will have to _id field, and I'm converting this to a string because by default, the MongoDB ID is this special object ID thing. I'm simply storing a straightforward string  for the given user ID in my session.*/
   req.save(action); //The save method is coming from the express session package, and that package will execute save when we call this here, and then it will execute action once saving the updated session data to the database is done.
}

const destroyUserAuthSession = (req) => {
    req.session.uid = null;
    req.session.isAuth = false;
}

module.exports = {
    createUserSession: createUserSession,
    destroyUserAuthSession: destroyUserAuthSession
}