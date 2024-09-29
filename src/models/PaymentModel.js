const mongoose = require('mongoose')
const { Schema } = mongoose
const ObjectId = Schema.ObjectId;

const paymentSchema = new Schema({
    id: { type: ObjectId },
    payment_method: {
        type: Number
    },
    total_amount: {
        type: Number
    },
    payment_date: {
        type: Date
    },
    voucher_id: { type: Schema.Types.ObjectId, ref: 'voucher', require: true },
    ticket_id: { type: Schema.Types.ObjectId, ref:'ticket',require:true }
})
module.exports = mongoose.models.payment || mongoose.model('payment',paymentSchema)