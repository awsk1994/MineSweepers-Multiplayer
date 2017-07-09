var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    difficulty: { type: Number, required: true },
    people_in_it: { type: Number, required: true },
    room_name: {type:String, required: true},
    created_by: {type: String, required: true},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Room', schema);