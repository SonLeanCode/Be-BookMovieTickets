const mongoose = require("mongoose")

const { Schema } = mongoose
const ObjectId = Schema.ObjectId

const ticketSchema = new Schema({
    id: { type: ObjectId },
    purchase_date: {
        type: Date
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    showtime_id: {
        type: Schema.Types.ObjectId,
        ref: 'show_time',
        require: true
    },
    seat_id: {
        type: Schema.Types.ObjectId,
        ref: 'seat',
        require: true
    }

})
module.exports = mongoose.models.ticket || mongoose.model('tickets', ticketSchema)