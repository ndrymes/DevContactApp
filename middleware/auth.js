const jwt = require('jsonwebtoken')
const Developer = require('../model/developer')
const auth = async (req,res,next)=> {
    const token = req.header('Authorization');
    if (!token || (token!==req.header('Authorization'))) {
        return res.status(401).send({error:'Access Denied,no token provided or incorrect'})
    }
    
    
    try {
        let decoded=jwt.verify(token,process.env.ACCESS_KEY)
    console.log(decoded);
    
    if(!decoded){
        throw new Error()
    }
    const _id = decoded._id
        const contact = await Developer.findOne({_id})
        req.user=contact
        next()
    } catch (error) {
        res.status(500).send({
            error:"internal Server Error",
            code:500
        })
    }

}
module.exports = auth;