const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const authUtil = require('../util/authentication');


const getSignup = (req, res) => {
  console.log("////");
  res.render("customer/auth/signup"); //render a template, which means it takes the template, parses it with the EJS language and replaces all the dynamic parts with text. And then once the HTML code is finished, which doesn't have any dynamic segments in it anymore, this HTML code is sent to the visitor in the response.
};

const signup = async (req, res, next) => {
  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
   );

   try{
     await user.signup();  //signUp method returns a promise because it's an async method.
   } catch(error){
      next(error); //when we execute next with that error, the default error handling middleware will become active.
      return;
   }
   /*
Express ignores errors that are occurring inside of asynchronous operations.
Therefore, we have to handle this manually, with help of try catch. Try catch allows us to 
implement our own error handling, and it allows us to try some operation to then catch a 
potential error, which we receive as a parameter value here, in case this operation
or some nested(!) operation in there goes wrong.
   */
   
   res.redirect('/login');  //For controller functions that are triggered upon incoming post requests, it is pretty standard to redirect instead of rendering a template as a response, because if you would render a template, if the user presses the refresh button of the browser, you get this pop-up wherever you wanna send post data again. Now with a redirect, you instead redirect and you wanna do that after handling the submitted data successfully.
};

const getLogin = (req, res) => {
    res.render('customer/auth/login');
};

const login = async (req, res, next) => {
  const user = new User(req.body.email, req.body.password); //since email and password come first in the constructor, we can call the constructor with just these two values and omit the rest which therefor will be set to undefined.
  
  let existingUser;
  try {
    existingUser = await user.getUserWithSameEmail(); //'getUserWithSameEmail()' returns a promise which I then await here. 'existingUser' - variable or constant is only available inside of the block of curly braces in which it is defined. In this case, inside of try. Because that we create let 'existingUser' variable outer of the block to use forward in 'if(!existingUser)'.
  } catch (error) {
    return next(error);
  }

  if(!existingUser){
    return res.redirect('/login');
  }

  
  const passwordIsCorrect = await user.comparePassword(existingUser.password); //comparing the password, actually shouldn't fail here, Because that we don't need try catch.
    /*my way:
    const passwordMatch = await bcrypt.compare(user.password, existingUser.password); */
  
  if(!passwordIsCorrect){
    return res.redirect('/login');
  }

  //once a user logged in successfully, I will simply redirect to the starting page, but I only wanna do that once the session data was saved:
  authUtil.createUserSession(req, existingUser, () => { //'req' - forward our request object, 'action' - function which should be executed once the session was saved.
    res.redirect('/');
  })
}

const logout = (req, res) => {
    authUtil.destroyUserAuthSession(req);
    res.redirect('/');
}
module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
  login: login,
  logout: logout
};
