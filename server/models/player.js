var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    username: { type: String, required: true },
    flags: { type: Number, default: -1 },
    bombs: { type: Number, default: -1 },
    winTime: { type: Date, default: -1 },
    isPlayer: { type: Boolean, default: true },
    isReady: { type: Boolean, default: false },
    socketId: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Player', schema);