const mongoose = require("mongoose");
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;

const movieGenreSchema = new Schema({
    movie_id: {
        type: ObjectId,
        ref: 'movie',
        required: true
    },
    genre_id: {
        type: ObjectId,
        ref: 'genre',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

movieGenreSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

module.exports = mongoose.models.movie_genre || mongoose.model('movie_genres', movieGenreSchema);
