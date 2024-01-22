const isEmpty = (value) => {
  return !value || value.trim() === "";
};

const userCredentialsAreValid = (email, password) => {
  return email && email.includes("@") && password && password.trim() >= 6;
};

const emailIsConfirm = (email, confirmEmail) => {
    return email !== confirmEmail;
}

const validationSignup = (email, confirmEmail, password, name, street, postal, city) => {
  return (
    emailIsConfirm(email, confirmEmail) &&
    userCredentialsAreValid(email, password) &&
    !isEmpty(name) &&
    !isEmpty(street) &&
    !isEmpty(postal) &&
    !isEmpty(city)
  );
};

module.exports = validationSignup;

/*
Why is it important to valid on the server side as well:
1. Those who know dev tools can change the requirements (we also do validation on the client 
    side to enable a better user experience, which will immediately pop up a message).
    This is also how you can attack.
2. There are also a certain checks,
    which we can't run on the front end. For example,
    checking if a email address already exists,
*/
