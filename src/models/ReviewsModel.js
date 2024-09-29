const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;
const reviewSchema = new Schema({
    id: { type: ObjectId },
    conntent: {
        type: String,
        required: true
    },
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'user', // Reference to the User collection
        required: true
    },
    movie_id:{
        type: Schema.Types.ObjectId,
        ref:'movie_sticket',
        required: true
    }
})
module.exports =  mongoose.models.review || mongoose.model('review',reviewSchema)