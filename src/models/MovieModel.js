const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')
const { Schema } = mongoose;  // Cần lấy `Schema` từ `mongoose`
const ObjectId = Schema.ObjectId;
const movie = new Schema({
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
<<<<<<< HEAD:src/models/MovieSticketsModel.js
movieSticketSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('movie_sticket', movieSticketSchema);
=======

module.exports = mongoose.model('movie', movie);
>>>>>>> dd9e8cc157128581512e9b2b7b875592b6bf3d74:src/models/MovieModel.js
