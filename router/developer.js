const express = require('express')
const router = express.Router()
const devController = require('../controllers/devControllers')
const dev= new devController()
const auth = require('../middleware/auth')

router.post('/addcontact',(req,res)=> {
    dev.addContact(req,res)
})

router.get('/all',(req,res)=> {
    dev.readContact(req,res)
})

router.get('/title', (req,res)=> {
    dev.readContactByCategories(req,res)
})

router.patch('/update/:id',auth,(req,res)=>{
    dev.updateDevContacts(req,res)
})

router.delete('/delete/:id',auth,(req,res)=>{
 dev.deleteOneContact(req,res)
})

module.exports = router