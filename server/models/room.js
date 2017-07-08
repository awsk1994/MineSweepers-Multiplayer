var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    difficulty: { type: Number, required: true },
    peopleInIt: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Room', schema);