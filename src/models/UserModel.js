const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const validators = require('validator');
const {CHECKTEXT} = require('../constants/validationContants') 


const  userSchema =  new Schema({
    id:{type:ObjectId},
    useremail:{
        type:String,
        required:[true,'Email required'],
        unique:true,
        trim:true,
        minLength:3,
        maxLength:50,
       validate:{
        validator:function(v){
            return validators.isEmail(v)
        },
          message: 'Please enter a valid email'
       }
    },
    password:{
        type:String,
        required: true,
        trim: true
    },
    role: {
        type: Number,
        default: 0
    },
    setting:{
        language:{
            type:String,
            default: 'en',
            enum:['en','vi']
        }
    },
    lastname:{
        type:String,
        required: [true, 'Lastname is required'],
        validate:CHECKTEXT
    },
    firstname:{
        type:String,
        required:[true,'Firstname is required'],
        validate:CHECKTEXT
    }

})
module.exports = mongoose.models.user || mongoose.model("user",userSchema)