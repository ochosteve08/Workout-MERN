const express = require('express');
const{
  registerUser,
  userLogin,
} = require('../controllers/user.controller');

const userRoutes = express.Router();


userRoutes.post('/register', registerUser);
userRoutes.post('/login', userLogin);


module.exports = userRoutes;