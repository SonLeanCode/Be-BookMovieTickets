const mongoose = require('mongoose');
const { Schema } = mongoose;  // Cần lấy `Schema` từ `mongoose`

const movieSticketSchema = new Schema({
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
    }
});

module.exports = mongoose.model('movie_sticket', movieSticketSchema);