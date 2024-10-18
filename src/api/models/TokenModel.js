const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const mongoosePaginate = require('mongoose-paginate-v2');
const schema = new mongoose.Schema({
    accessToken: {
        type: String,
        require: true
    },
    expireTime: {
        type: String,
        require: true
    }
}, { timestamps: true });

mongoose.set('returnOriginal', false);

schema.plugin(mongooseDelete, {
    deletedAt: true,
    indexFields: true,
    overrideMethods: true
});
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('token_managers', schema);
