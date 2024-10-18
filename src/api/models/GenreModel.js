const mongoose = require("mongoose");
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;

const genreSchema = new Schema({
    id: {
        type: ObjectId
    },
    name: {
        type: String,
        required: true,
        unique: true  
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

// Cập nhật `updated_at` mỗi khi có thay đổi
genreSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

module.exports = mongoose.models.genre || mongoose.model('genres', genreSchema);
