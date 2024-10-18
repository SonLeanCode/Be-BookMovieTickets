const mongoose = require('mongoose');
const { Schema } = mongoose;  // Cần lấy `Schema` từ `mongoose`
const ObjectId = Schema.ObjectId;

const voucherModel =  new Schema({
    id:{type:ObjectId},
    code:{
        type:String
    },
    discount_percent:{
        type:Number
    },
    valid_from:{
         type:Date
    },
    max_usage:{
        type:Number
    },
    current_usage:{
        type:Number
    },
    status:{
        type:Boolean
    }
})
module.exports =  mongoose.models.voucher || mongoose.model('voucher',voucherModel)