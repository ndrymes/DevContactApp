const express = require('express')
const router = express.Router()
const devController = require('../controllers/devControllers')
const dev= new devController()
const auth = require('../middleware/auth')

router.post('/addcontact',(req,res)=> {
    dev.addContact(req,res)
})
router.get('/all', (req,res)=> {
    dev.readContact(req,res)
})
router.get('/title', (req,res)=> {
    dev.readContactByCategories(req,res)
})
module.exports = router