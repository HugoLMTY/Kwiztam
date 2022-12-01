const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
	id: ObjectId,

	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },

	quizzs: 			[{ 	type: ObjectId, ref: 'Quizz', 	default: [] 	}],
	
	previousGames: 		[{ 	type: ObjectId, ref: 'Game', 	default: [] 	}],
	currentGame: 		{ 	type: ObjectId, ref: 'Game'		},

}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);