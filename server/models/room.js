var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
=== Room State ===
-1: error
0: default
1: init
2: waiting
3: running
4: gameoverForAll
*/

var schema = new Schema({
    room_name: {type:String, required: true},
    difficulty: { type: Number, required: true },
    capacity: { type: Number, default: 0 },
    state: { type: Number, default: 0 },
    gameStartTime: { type:Date, default: 0 },
    readyCount: { type: Number, default: 0 },
    players: [{type: Schema.Types.ObjectId, ref: 'Player'}],
    created_by: {type: String, required: true},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Room', schema);