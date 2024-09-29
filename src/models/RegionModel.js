const mongoose = require("mongoose")
const { Schema } = mongoose
const ObjectId = Schema.ObjectId

const regionSchema = new Schema({
    id: {
        type: ObjectId
    },
    name: {
        type: String
    },
    cinema_id: {
        type: Schema.Types.ObjectId,
        ref: 'cinema',
        require: true
    }
})
module.exports = mongoose.models.regiom || mongoose.model('region', regionSchema)