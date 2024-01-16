const handleErrors = (error, req, res, next) => {
  console.log(`Error server side occur: ${error}`);
  res.status(500).render("shared/500"); //500 - indicates a server side error
};

module.exports = handleErrors;
