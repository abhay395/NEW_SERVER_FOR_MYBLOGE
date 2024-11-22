const express = require('express')
const { SendMeassage } = require('../controller/Contact.controller')

const router = express.Router()

router.get('/sendMessage',SendMeassage)

exports.router = router