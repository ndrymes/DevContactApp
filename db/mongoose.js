const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017/Devcontact'
mongoose.connect(url,{useNewUrlParser:true,useCreateIndex:true})
module.exports= mongoose
