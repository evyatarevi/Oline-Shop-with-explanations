/*I want to use a feature built into express, which allows me to set up a variable on my response
that I can then access in all my views so that we don't have to pass the token
into all our views manually.
*/

const addCsrfToken = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken(); // 'locals' allows us to set variables that are exposed to all views automatically. 'csrfToken' is own key value pairs, not reserved word.
    //req.csrfToken() - this generates a valid token. This method is available thanks to the CSRF middleware package. This token is then saved in res.locals and locals is available in all my views later on.
    //I think we don't import 'csurf' package to use in csrfToken() because the middleware 'csrf()' in app.js populate this function automatically in req.
    next(); //That's a function which when executed, forwards the request to the next middleware in line.
}

module.exports = addCsrfToken;