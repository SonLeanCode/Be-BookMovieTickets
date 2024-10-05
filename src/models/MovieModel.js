const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')
const { Schema } = mongoose;  // Cần lấy `Schema` từ `mongoose`
const ObjectId = Schema.ObjectId;
const movieSticketSchema = new Schema({
    id:{type:ObjectId},
    image: {
        type: String,
        // Có thể thêm điều kiện bắt buộc
    },
    nameMovie: {
        type: String,

    },
    description: {
        type: String,
    },
    director: {
        type: String,
    },
    price: {
        type: String,
    },
    actor: {
        type: String,
    },
    producer: {
        type: String,
    },
    rating: {
        type: Number
    },
    duration:{
        type:Number
    },
    title:{
        type:String
    },
    release_date:{
        type:Date
    }
});

movieSticketSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('movie_sticket', movieSticketSchema);