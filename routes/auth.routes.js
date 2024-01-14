const express = require('express');
const authControllers = require('../controllers/auth.controllers');


const router = express.Router();



router.get('/signup', authControllers.getSignup);
router.post('/signup', authControllers.signup); //basically whenever you create data on the server, whenever you manipulate data on the server, you wanna use a post request instead of a get request.
//It's okay to have two routes with the same path, as long as they have different HTTP methods they handle.
router.get('/login', authControllers.getLogin);



module.exports = router;