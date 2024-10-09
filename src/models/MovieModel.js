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
    name: {
        type: String,
        require:true
    },
    description: {
        type: String,
    },
    price: {
        type: String,
        require:true
    },
    director: {
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
    release_date:{
        type:Date
    }   
});
movieSticketSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('movie_stickets', movieSticketSchema);

