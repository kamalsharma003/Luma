const express = require('express')
const isAuthenticated = require('../middlewares/auth.middleware')
const  {sendMessage, getMessage} = require('../controllers/message.controller')


const router = express.Router()

router.post('/send/:receiverId', isAuthenticated, sendMessage)
router.get('/get-messages/:otherParticipantId', isAuthenticated,getMessage ) 



module.exports = router