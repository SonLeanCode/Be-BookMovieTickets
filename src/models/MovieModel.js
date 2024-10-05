const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')
const { Schema } = mongoose;  // Cần lấy `Schema` từ `mongoose`
const ObjectId = Schema.ObjectId;
const movieSticketSchema = new Schema({
    id:{type:ObjectId},
    image: {
        type: String,
        require:true
    },
    nameMovie: {
        type: String,
        require:true

    },
    description: {
        type: String,
    },
    director: {
        type: String,
    },
    price: {
        type: String,
        require:true
    },
    actor: {
        type: String,
        require:true
    },
    producer: {
        type: String,
        require:true
    },
    rating: {
        type: Number,
        require:true
    },
    duration:{
        type:Number
    },
    title:{
        type:String,
        require:true
    },
    release_date:{
        type:Date
    }
});
movieSticketSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('movie_sticket', movieSticketSchema);

