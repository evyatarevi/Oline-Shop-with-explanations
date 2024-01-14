const User = require("../models/user.model");

const getSignup = (req, res) => {
  console.log("////");
  res.render("customer/auth/signup"); //render a template, which means it takes the template, parses it with the EJS language and replaces all the dynamic parts with text. And then once the HTML code is finished, which doesn't have any dynamic segments in it anymore, this HTML code is sent to the visitor in the response.
};

const signup = async (req, res) => {
  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body,
    req.body.street,
    req.body.postal,
    req.body.city
   );
   await user.signup();  //signUp method returns a promise because it's an async method.
   
   res.redirect('/login');  //For controller functions that are triggered upon incoming post requests, it is pretty standard to redirect instead of rendering a template as a response, because if you would render a template, if the user presses the refresh button of the browser, you get this pop-up wherever you wanna send post data again. Now with a redirect, you instead redirect and you wanna do that after handling the submitted data successfully.
};

const getLogin = (req, res) => {
    res.render('customer/auth/login');
};

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
};
