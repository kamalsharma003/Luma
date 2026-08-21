const express = require("express");
const {register, login, getProfile, logout, getOtherUsers} = require("../controllers/user.controller");
const isAuthenticated = require('../middlewares/auth.middleware')

const router = express.Router();

router.post("/register", register);
router.post('/login', login)
router.post('/logout', logout)
router.get('/get-profile', isAuthenticated, getProfile)
router.get('/get-other-users', isAuthenticated, getOtherUsers)

module.exports = router;
