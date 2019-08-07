const jwt = require('jsonwebtoken')
const Developer = require('../model/developer')
const auth = async (req,res,next)=> {
    const token = req.header('Authorization');
    if (!token) {
        res.status(401).send({error:'Access Denied,no token provided'})
    }
    let decoded=jwt.verify(token,'oluwole')
    const _id = decoded._id
    try {
        const contact = await Developer.findOne({_id})
        req.user=contact
    } catch (error) {
        
    }
    l

}