const mongoose = require('mongoose')
const numberType = {
  type: Number,
  required: true,
};
const stringType = {
  type: String,
  required: true,
};
const booking =  new mongoose.Schema({
    guest_name: stringType,
    ph_number: numberType,
    no_of_guests: numberType,
    start_date: stringType,
    end_date: stringType,
    amount: numberType,
    paid_amount: numberType,
    status: {
        type: stringType,
        enum: ['wait', 'confirm']
    }
})

const bookingSchema = mongoose.model("bookingModel", booking);
module.exports = bookingSchema;