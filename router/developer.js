const express = require('express')
const router = express.Router()
const devController = require('../controllers/devControllers')
const dev= new devController()

router.post('/addcontact',(req,res)=> {
    dev.addContact(req,res)
})
module.exports = router