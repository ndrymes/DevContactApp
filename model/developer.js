const mongoose = require('mongoose');
const validator = require('validator')

const DevSchema =new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:6
    },
    name:{
        type:String,
        required:true,
        minlength:4,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate(value) {
           if (!validator.isEmail(value)) {
               throw new Error('not a valid email')
           }
        }},
        cellphone: {
        type:Number,
        required:true,
        minlength:11,
        trim:true,
        }
})
const Developer = mongoose.model('Developer',DevSchema)
module.exports = Developer;