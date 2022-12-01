const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const QuizzSchema = new Schema({
	id: ObjectId,

	title: 		{ type: String, 	required: true },
	userId: 	{ type: ObjectId, 	required: true },

	questions: [
		{
			question: 		{ 	type: String, 	required: true },
			answers: 		[
				{ 
					text: 		{ type: String, 	required: true, default: false },
					isCorrect: 	{ type: Boolean, 	required: true, default: false },
				}
			],
			type: 			{ 	type: String, 	required: true },
			correctAnswer: 	{ 	type: Number 		},
			points: 		{ 	type: Number 		},
			duration: 		{ 	type: Number 		},
		}
	],

}, { timestamps: true });

module.exports = mongoose.model('Quizz', QuizzSchema);