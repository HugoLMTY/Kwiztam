const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const GameSchema = new Schema({
	_id: ObjectId,

	title: 		{ type: String, 	required: true },
	players: 	[{ type: ObjectId, 	ref: 'User' }],

	socketId: 	{ type: String },

	quizz: 		{ type: ObjectId, 	ref: 'Quizz' },

});

module.exports = mongoose.model('Game', GameSchema);