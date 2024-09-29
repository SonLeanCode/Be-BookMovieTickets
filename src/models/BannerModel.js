const mongoose = require('mongoose')
const { Schema } = mongoose;  // Cần lấy `Schema` từ `mongoose`
const ObjectId = Schema.ObjectId;

const bannerSchema =  new Schema({
    id:{type:ObjectId},
    image:{type:String},
    movie_id:{ type: Schema.Types.ObjectId,
        ref:'movie_sticket',
        required:true
    }
})
module.exports = mongoose.models.banner || mongoose.model('banner',bannerSchema)