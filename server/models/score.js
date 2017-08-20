var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    difficulty: { type: Number, required: true },
    username: { type: String, required: true },
    timeTaken: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Score', schema);