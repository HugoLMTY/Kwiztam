const express = require('express');
const app = express();

const mongoose = require('mongoose');
const cors = require('cors');

const tools = require('./services/toolsService');

const User = require('./models/userModel');
const Game = require('./models/gameModel');
const Quizz = require('./models/quizzModel');

const bodyParser = require('body-parser');

const PORT = 3001
const isProd = false

app.use(bodyParser.json());


const corsOption = {
    origin: ['http://localhost:3000'],
};
app.use(cors(corsOption));
app.use(cors())

const dbName = 'kwiztam';
const dbPath = `mongodb://dev:dev@cluster0-shard-00-00.nz5xy.mongodb.net:27017,cluster0-shard-00-01.nz5xy.mongodb.net:27017,cluster0-shard-00-02.nz5xy.mongodb.net:27017/${dbName}?ssl=true&replicaSet=atlas-22r9rt-shard-0&authSource=admin&retryWrites=true&w=majority`

const connectDb = () => {
	return mongoose
		.connect(dbPath, { 
			useNewUrlParser: true, 
			useUnifiedTopology: true 
		})
		.then(_ => {
			tools.log(`Connected to MongoDB`, { id: isProd ? 'PROD' : 'DEV', decolor: isProd ? 'blue' : 'green', size: 8, boldeco: true, blank: 3, deco: '﴾﴿', hideOrigin: true })
		})
		.catch(err => {
			tools.log(`Error connecting to MongoDB, retrying in ${nextRetry / 1000}s`, { id: isProd ? 'PROD' : 'DEV', decolor: isProd ? 'red' : 'red', size: 8, err  })
			setTimeout(() => { connectDb(); (nextRetry) *= 2 }, nextRetry)
		})
}
let nextRetry = 2000

connectDb()

app.use('', (req, res, next) => {
	// console.log('req received', req.url)
	next()
})

app.get('/', (req, res) => {
	tools.log('Query', { id: 'GET', preset: 'home'  })
})

app.get('/room/:roomId', (req, res) => {
	tools.log('Query', { id: `GET Room (${req.params.roomId})`, preset: 'room'  })

	Game.findById(req.params.roomId, (err, game) => {
		if (err) {
			tools.log('Error', { id: `GET Room (${req.params.roomId})`, preset: 'room', err })
			res.status(500).send(err)
		} else {
			tools.log('Success', { id: `GET Room (${req.params.roomId})`, preset: 'room' })
			res.status(200).send(game)
		}
	})

})

app.post('/auth/register/checkAvailibility', async (req, res) => {
	tools.log('Query', { id: 'POST Register'  })

	try {
		if (!req.body.username) return res.status(400).send({ message: 'Username is required' })

		const user = await User.find({ username: req.body.username })
		const available = user.length === 0
	
		return res.status(200).send({ available })	
	} catch (err) {
		tools.log('', { err })
		res.status(500).send(err)
	}
})

app.post('/auth/register', async (req, res) => {
	tools.log('Query', { id: 'POST User', preset: 'home' })

	try {

		const {
			username,
			password
		} = req.body
		
		const user = new User({
			username,
			password,
		})

		await user.save()

		return res.status(200).send(user)

	} catch(err) {
		tools.log('', { err })
		res.status(500).send(err)
	}
})

app.post('/auth/login', async (req, res) => {
	tools.log('Query', { id: `POST Login - ${ req.body.username }`, preset: 'home' })

	try {

		const {
			username,
			password
		} = req.body
		
		const user = await User.findOne({ username })
		if (!user) return res.status(404).send('User not found')

		// TODO - Add bcrypt
		if (user.password !== password) return res.status(401).send('Wrong password')

		return res.status(200).send(user)

	} catch(err) {
		tools.log('', { err })
		res.status(500).send(err)
	}
})

app.get('/user/:userId', async (req, res) => {
	tools.log('Query', { id: `GET User (${req.params.userId})`, preset: 'user' })

	try {
		const { userId } = req.params
		const user = await User.findById(userId)

		if (!user) {
			tools.log('Error', { id: `GET User (${req.params.userId})`, preset: 'user', err: 'User not found' })
			return res.status(404).send('User not found')
		}

		return res.status(200).send(user)
		
	} catch(err) {
		tools.log('', { id: `GET User (${req.params.userId})`, preset: 'user', err })
		return res.status(500).send(err)
	}
})

app.post('/quizz/create', async (req, res) => {
	tools.log('Query', { id: 'POST Quizz', preset: 'home' })

	try {
		const { title, userId } = req.body

		const user = await User.findById(userId)
		if (!user) return res.status(404).send('User not found')

		const newQuizz = new Quizz({
			title,
			userId,
		})
		user.quizzs.push(newQuizz)

		await user.save()
		await newQuizz.save()

		return res.status(200).send(newQuizz)

	} catch(err) {
		tools.log('Error', { id: 'POST Quizz', preset: 'home', err })
		return res.status(500).send(err)
	}
})

app.post('/quizz/questions/:quizzId', async (req, res) => {
	tools.log('Query', { id: `POST Quizz Questions (${req.params.quizzId})`, preset: 'quizz' })

	try {
		const { quizzId } = req.params
		const { action, datas, questionId } = req.body

		const quizz = await Quizz.findById(quizzId)
		if (!quizz) return res.status(404).send('Quizz not found')
		
		if (action === 'remove') 
			quizz.questions = quizz.questions.filter(question => question._id != questionId)
		
		if (action === 'add')
			quizz.questions.push(datas)

			
	} catch(err) {
		tools.log('Error', { id: `POST Quizz Questions (${req.params.quizzId})`, preset: 'quizz', err })
		return res.status(500).send(err)
	}
})

app.get('/quizz/:quizzId', async (req, res) => {
	tools.log('Query', { id: `GET Quizz (${req.params.quizzId})`, preset: 'quizz' })

	try {
		const { quizzId } = req.params
		const quizz = await Quizz.findById(quizzId)
		if (!quizz) return res.status(404).send('Quizz not found')

		return res.status(200).send(quizz)

	} catch(err) {
		tools.log('Error', { id: `GET Quizz (${req.params.quizzId})`, preset: 'quizz', err })
		return res.status(500).send(err)
	}

})

app.listen(PORT, () => {
	tools.log('Server is running', { id: PORT });
})