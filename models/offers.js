const mongoose = require('mongoose');
const connection = require('./connection');
const Schema = mongoose.Schema;

const offerSchema = new Schema({
    connection: {type: Schema.Types.ObjectId, ref: 'Connection', required: [true, 'connection is required']},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: [true, 'user is required']},
    amount: {type: Number, required: [true, 'amount is required']},
    status: {type: String},
});

module.exports = mongoose.model('offer', offerSchema);