/*
We can actually use sessions as a solution for this as well,
and not just use sessions for authentication,
but also for temporarily storing data like that user input
and error data.
it's called 'flashing' because it will only be there
for the next request response cycle.
*/
const getSessionData = (req) => {
  const sessionData = req.session.flashData;
  req.session.flashData = null; //After I retrieved the data in line two, I want to set flashed data to null to clear that data.
  return sessionData; //We do not need to use the save() function as it is not important here.
}
const flashDataToSession = (req, data, action) => {
  /*
I need the request object because I need that to access the
session.
I need the data that should be flashed,
and I want to get an action,
a function that should be executed after the data was stored
on the session,
because I will explicitly call the save method on the
session and ensure that we then only perform a certain
actual, like redirecting after the session data was saved
successfully.
  */
  req.session.flashData = data;
  req.session.save(action);
}


module.exports = {
  getSessionData: getSessionData,
  flashDataToSession: flashDataToSession
};
