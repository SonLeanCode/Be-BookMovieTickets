const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')
const { Schema } = mongoose;  // Cần lấy `Schema` từ `mongoose`
const ObjectId = Schema.ObjectId;
const movie = new Schema({
    id:{type:ObjectId},
    image: {
        type: String,
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
movie.plugin(mongoosePaginate);
module.exports = mongoose.model('movie_sticket', movie);
