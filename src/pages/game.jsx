import React, { useState, useEffect, useContext } from 'react';
import { useRef } from 'react';
import { FaPoop, FaTrophy } from 'react-icons/fa';
import { ShakeLittle } from 'reshake';
import randomColor from 'randomcolor';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import { UserContext } from '../context/userContext';

import './style/lobby.css';
import './../App.css';

const Game = () => {

	//? --- User ---
	const { user } = useContext(UserContext);
	useEffect(() => {
		console.log({ user })
		if (!user) {
			Swal.fire({
				title: 'You are not logged in!',
				text: 'Please login to access this page',
				icon: 'error',
				confirmButtonText: 'Ok'
			}).then((result) => {
				if (result.isConfirmed) {
					window.location.href = '/';
				}
			})
		}
	}, [ user ] )


	//? --- Game State ---
	const [game, setGame] = useState({
		title: 'Title',
		players: [
			{ playerId: 1, name: 'Player 1', score: 0, 		answers: [ ] },
			{ playerId: 2, name: 'Player 2', score: 0, 		answers: [ ] },
			{ playerId: 3, name: 'Player 3', score: 40, 	answers: [ { questionId: 1, answerId: 1 } ] },
			{ playerId: 4, name: 'Player 4', score: 0, 		answers: [ { questionId: 1, answerId: 2 } ] },
			{ playerId: 5, name: 'Player 5', score: 0, 		answers: [ { questionId: 1, answerId: 3 } ] },
			{ playerId: 6, name: 'Player 6', score: 420, 	answers: [ ] },
			{ playerId: 7, name: 'Player 7', score: 10, 	answers: [ ] },
			{ playerId: 8, name: 'Player 8', score: 0, 		answers: [ ] },
			{ playerId: 9, name: 'Player 9', score: 1337, 	answers: [ ] },
		],
		quizz: {
			author: { playerId: 6, name: 'Player 6', score: 420, answers: [ ] },
			questions: [
				{
					questionId: 1,
					question: 'What is the capital of France?',
					type: 'text',
					duration: 30,
					points: 10,
					answers: [
						{ answerId: 1, answer: 'Paris', 	correct: true },
						{ answerId: 2, answer: 'London', 	correct: false },
						{ answerId: 3, answer: 'Berlin', 	correct: false },
						{ answerId: 4, answer: 'Rome', 		correct: false },
					],
				},
				{
					questionId: 2,
					question: 'When did the Second World War end?',
					type: 'date',
					duration: 10,
					points: 10,
					answers: [
						{ answerId: 1, answer: '1945-05-08', 	correct: true },
						{ answerId: 2, answer: '1945-05-09', 	correct: false },
						{ answerId: 3, answer: '1945-05-10', 	correct: false },
						{ answerId: 4, answer: '1945-05-11', 	correct: false },
					],
				},
				{
					questionId: 3,
					question: 'Sort the following numbers from smallest to largest',
					type: 'sort',
					duration: 14,
					points: 10,
					answers: [
						{ answerId: 1, answer: '1', 	correct: true },
						{ answerId: 2, answer: '2', 	correct: true },
						{ answerId: 3, answer: '3', 	correct: true },
						{ answerId: 4, answer: '4', 	correct: true },
					],
				}
			]
		},

	});
	useEffect(() => {
		const sortedPlayers = game.players.sort((a, b) => b.score - a.score);
		if (game.players !== sortedPlayers) setGame({ ...game, players: sortedPlayers });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ game.players ])



	//? --- Current Question ---
	const [currentQuestion, setCurrentQuestion] = useState(0);
	useEffect(() => {
		setTimer({ ...timer, time: game.quizz.questions[currentQuestion].duration, current: 0 });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ currentQuestion ])



	//? --- Timer ---
	const [ timer, setTimer ] = useState({ time: 50, current: 20, playing: false });
	const timerRef = useRef(null)
	useEffect(() => {
		clearInterval(timerRef.current)

		if (timer.playing) {
			if (timer.time - timer.current <= 0) {
				setTimer({ ...timer, playing: false, current: timer.time })

				Swal.fire({
					title: 'Time\'s up!',
					icon: 'info',
					confirmButtonText: 'Next question',
				})
				.then(res => {
					if (res.isConfirmed) setCurrentQuestion(currentQuestion + 1);
				})
			}

			timerRef.current = setInterval(() => {				
				setTimer({ ...timer, current: timer.current + 1 });
			}, 1000);
		}
		return () => clearInterval(timerRef.current);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ timer ])


	const pickAnswer = async (answer) => {

		const showResult = false

		if (timer.time - timer.current === 0) {
			return Swal.fire({
				title: 'Time\'s up',
				icon: 'error',
				color: '#dc3545',
				confirmButtonText: 'Ok',
			})
		}
	
		const choice = await Swal.fire({
			title: 'T\'es sur?',
			icon: 'question',
		
			color: '#716add',
	
			confirmButtonText: 'Yes bro',
			confirmButtonColor: '#198754',
	
			cancelButtonText: 'No bro',
			cancelButtonColor: '#dc3545',
	
			background: './assets/img/swalBg.jpg',
	
			
			showCancelButton: true,
			reverseButtons: true,		
		})
	
		if (choice.isConfirmed) {
	
			showResult
				? 
				Swal.fire({
					title: answer.correct ? 'Bien vu' : 'Cheh',
					icon: answer.correct ? 'success' : 'error',
		
					showConfirmButton: false,
		
					color: '#716add',
				})
				:
				Swal.fire({
					title: 'Réponse enregistrée',
	
					icon: 'success',
					showConfirmButton: false,
				})
	
		}
	}

	return (
		<>
			<GameContainer >
				<GameTitle className='title'> { game.quizz.questions[currentQuestion].question } </GameTitle>


				<PlayersContainer>
				{
					game.players.map( (player, index) => {
						const isFirst 	= index === 0;
						const isLast 	= index === game.players.length - 1

						return (
								<Player key={ index } hasAnswered={ player.answers.findIndex(a => a.questionId === game.quizz.questions[currentQuestion].questionId) !== -1 }>
									{ isFirst ? <Trophy /> 	: <></> 	} 
									{ isLast  ? <Poop /> 	: <></> 	}

									<PlayerName> { player.name } </PlayerName>
									<PlayerScore> { player.score } </PlayerScore>

							</Player>
						)
					})
				}
				</PlayersContainer>

				<QuestionsContainer>
					<button onClick={ () => { setTimer({ ...timer, playing: !timer.playing }) }}> 					
						{ timer.playing ? 'Pause' : 'Play' } 	
					</button>

					<button onClick={ () => { setTimer({ ...timer, current: timer.time - 5, playing: false }) }}> 	
						Reset 									
					</button>


					<TimerText timer={ timer }> { timer.time - timer.current } </TimerText>
					<TimerContainer 
						active={ timer.playing && timer.time - timer.current <= 10 } fixed={ true } 
						duration={ 420 } 
						h={12}
						v={5}
						r={0}
						int={10}
						max={100}
						timer={ timer }
						>
						<TimerBar time={ timer.time } current={ timer.current } />
					</TimerContainer>

					<QuestionContainer>
						{/* <QuestionTitle> { game.quizz.questions[currentQuestion].question } </QuestionTitle> */}
						<QuestionAnswers>
							{
								game.quizz.questions[currentQuestion].answers.map( (answer, index) => {
									return (
										<Answer 
										key={ index }
										onMouseEnter={ updateBorder } onClick={ () => pickAnswer(answer) } >
											<AnswerText> { answer.answer } </AnswerText>
										</Answer>
									)
								})
							}
						</QuestionAnswers>
					</QuestionContainer>

				</QuestionsContainer>

			</GameContainer>
		</>
	);
}

const updateBorder = ($event) => {
	$event.target.style.borderColor = randomColor();
}



const GameContainer = styled.div`
	background: linear-gradient(to bottom right, #3399ff 0%, #ff00ff 100%);
	height: 100vh;
	width: 100vw;
`;

const GameTitle = styled.h1`
	/* color: white;

	text-align: center;
	font-size: 4.20em;

	width: 100%;

	padding: 50px;

	overflow: hidden; */
`;

const PlayersContainer = styled.div`
	/* border: 4px solid ; */
	border-radius: 20px;	

	display: flex;
	flex-direction: column;
	justify-content: space-between;

	flex-direction: column;
	flex-wrap: wrap;
	

	position: absolute;

	top: 20px;
	right: 20px;

	width: auto;
	max-width: 42%;
	
	padding: 10px;
`;

const Trophy = styled(FaTrophy)`
	margin-right: 5px;
	color: gold;
`;

const Poop = styled(FaPoop)`
	margin-right: 5px;
	color: brown;
`;


const Player = styled.div`
	background: linear-gradient(to bottom right, #80dfff 0%, #cc99ff 100%);
	border-radius: 20px;

	box-shadow: ${ props => props.hasAnswered ? '0px 0px 5px 4px #16df00' : '0px 0px 0px 0px #000000' };

	padding: 10px;
	margin: 5px;

	display: flex;
	flex-direction: row;

	justify-content: space-between;
	align-items: center;

	
	user-select: none;
	
	transition-duration: 0.2s;

	:hover {
		transform: scale(1.03);
		box-shadow: ${ props => props.hasAnswered ? '0px 0px 10px 6px #16df00' : '0px 0px 0px 0px #000000' };

	}

	/* select the first child */
	&:first-child {
		border: 4px solid gold;
	}

	&:nth-child(2) {
		border: 4px solid whitesmoke;
	}

	&:nth-child(3) {
		border: 4px solid #cd7f32;
	}

	&:last-child {
		border: 4px solid brown;
	}
`;

const PlayerName = styled.h2`
	color: white;
	font-size: 1.20em;
	margin-right: 15px;
`;

const PlayerScore = styled.h2`
	color: white;
	font-size: 1.20em;
`;

const QuestionsContainer = styled.div`
	/* border: 4px solid; */
	border-radius: 20px;

	position: absolute;
	top: 60%;
	left: 50%;
	transform: translate(-50%, -50%);

	height: 69%;
	width: 69%;

`;

const TimerContainer = styled(ShakeLittle)`
	border: ${ (props) => props.timer.time - props.timer.current <= 10 ? "3px solid red": "2px solid white" };
	border-radius: inherit;

	overflow: hidden;

	transition: 0.5s;

	width: 100%;
	height: 50px;
`;

const TimerBar = styled.div`
	background: linear-gradient(to left, #99ff99 0%, #ffff00 100%);
	height: inherit;

	transition-duration: 1s;

	width: ${ props => (props.current / props.time) * 100 }%;
`;

const TimerText = styled.h2`
	color: ${ props => props.timer.time - props.timer.current <= 10 ? "red": "whitesmoke" };
	font-size: 2em;

	transition-duration: 0.2s;

	z-index: 69;

	user-select: none;
	
	text-align: center;

	padding-top: 10px ;
`;

const QuestionContainer = styled.div`
	border-radius: inherit;

	padding: 42px;
	margin-top: 20px;
`;

const QuestionAnswers = styled.div`
	/* border: 1px solid red; */

	display: flex;
	flex-direction: row;
	justify-content: space-around;

`;

const Answer = styled(ShakeLittle)`
	background: linear-gradient(to bottom right, #80dfff 0%, #cc99ff 100%);

	padding: 10px;
	margin: 5px;

	border-radius: 20px;
	transition-duration: 0.1s;

	width: 42%;
	height: 100px;

	display: flex;
	justify-content: center;
	align-items: center;

	user-select: none;
	cursor: pointer;

	:hover {
		transform: scale(1.03);
		box-shadow: 0px 0px 10px 0px #8cc0de;
		border: 3px solid;
	}
`;

const AnswerText = styled.h2`
	color: white;
	font-size: 1.20em;

	text-align: center;

	margin-right: 15px;
`;



export default Game;