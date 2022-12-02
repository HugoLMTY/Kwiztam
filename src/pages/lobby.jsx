import React, { useState, useEffect } from 'react';
import { FaCrown, FaRegCopy, FaRegEye, FaRegEyeSlash, FaSkull, FaThumbsUp } from 'react-icons/fa';
import { ShakeLittle } from 'reshake';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import randomColor from 'randomcolor';

import './style/lobby.css';
import './../App.css';

import { useContext } from 'react';
import { UserContext } from '../context/userContext';

const Lobby = () => {

	const { user } = useContext(UserContext)

	const [ lobby, setLobby ] = useState({
		code: 'A4C2A0B',
		showCode: true,
		players: [
			{ playerId: 1, ready: true, 	name: 'Player 1', score: 0, answers: [ ] },
			{ playerId: 2, ready: false, 	name: 'Player 2', score: 0, answers: [ ] },
			{ playerId: 3, ready: false, 	name: 'Player 3', score: 40, answers: [ ] },
			{ playerId: 4, ready: false, 	name: 'Player 4', score: 0, answers: [ ] },
			{ playerId: 5, ready: true, 	name: 'Player 5', score: 0, answers: [ ] },
			{ playerId: 6, ready: false, 	name: 'Player 6', score: 420, answers: [ ], host: true },
			{ playerId: 7, ready: false, 	name: 'Player 7', score: 10, answers: [ ] },
			{ playerId: 8, ready: true, 	name: 'Player 8', score: 0, answers: [ ] },
			{ playerId: 9, ready: false, 	name: 'Player 9', score: 1337, answers: [ ] },
		]
	});

	const userIsHost = user?.playerId === lobby.players.find(player => player.host).playerId

	const copyCode = () => {
		navigator.clipboard.writeText(lobby.code)
		Swal.fire({
			title: 'Copied!',
			text: "The game code has been copied to your clipboard.",
			icon: 'success',
			confirmButtonColor: '#3085d6',
			confirmButtonText: 'Ok'
		})
	}

	

	const kickPlayer = async (playerId) => {
		const choice = await Swal.fire({
			title: 'Kick player',
			text: "You won't be able to revert this!",
			icon: 'error',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, kick him!'
		})
		if (!choice.isConfirmed) return;
		
		const newPlayers = lobby.players.filter(player => player.playerId !== playerId);
		setLobby({ ...lobby, players: newPlayers });
	}

	const promotePlayer = async (playerId) => {
		const choice = await Swal.fire({
			title: 'Promote player',
			text: "You won't be able to revert this!",
			icon: 'success',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, promote him!'
		})
		if (!choice.isConfirmed) return;

		
		const newPlayers = lobby.players.map(player => {
			console.log({ id: player.playerId, playerId });
			return { 
				...player,
				host: player.playerId === playerId
			}
		})
		setLobby({ ...lobby, players: newPlayers });
	}

	console.log({ user });

	return (
		<>
			<LobbyContainer>
				<LobbyTitle className='title'>Game Lobby</LobbyTitle>

				<CodeContainer className='container'>
					code
					{/* <CodeToggler onClick={ () => setLobby({ ...lobby, showCode: !lobby.showCode }) }>
						{ lobby.showCode ? <FaRegEye /> : <FaRegEyeSlash /> }
					</CodeToggler>

					<Code> { lobby.showCode ? lobby.code.trim() : lobby.code.split('').map(l => "*").join('') } </Code>

					<CodeCopy>
						<FaRegCopy onClick={ () => copyCode() } />  
					</CodeCopy> */}

				</CodeContainer>

				<LobbyInfos>


					<PlayersContainer className='container'>
						{lobby.players.map(player => (
							<Player player={ player }  key={player.playerId}>

									{
										userIsHost && player.playerId !== user?.playerId
											?
											<PLayerActions>
												<PlayerAction disabled={ player.host } onClick={ () => kickPlayer(player.playerId)} theme="red"> 		<FaSkull /> 	</PlayerAction>
												<PlayerAction disabled={ player.host } onClick={ () => promotePlayer(player.playerId)} theme="green"> 	<FaCrown /> 	</PlayerAction>
											</PLayerActions>
											: <> </>
									}

									<PlayerPictureContainer>
										<PlayerPicture src={ require("../assets/img/defaultProfilePicture.png") } alt="logo" />
									</PlayerPictureContainer>

									<PlayerInfos>

										<PlayerName >{player.name}</PlayerName>

										<PlayerState>
											{
												player.host
												? <PlayerReady > <PlayerHost />	</PlayerReady>
												: <> </>
											}

											{
												player.ready || true
												? <PlayerReady fixed={true} r={10} > <FaThumbsUp /> </PlayerReady>
												: <> </>
											}

										</PlayerState>
									</PlayerInfos>
							</Player>							
						))}

					</PlayersContainer>

					<GameSettings className='container'>

						settings
						{/* <StartAction>
							<StartGameText>Start Game</StartGameText>
						</StartAction> */}

					</GameSettings>

				</LobbyInfos>


			</LobbyContainer>
		</>
	);
}


const LobbyContainer = styled.div`
	/* border: 1px solid green; */

	background: linear-gradient(to bottom right, #3399ff 0%, #ff00ff 100%);
	height: 100vh;
	width: 100vw;

	display: flex;
	flex-direction: column;

	justify-content: center;
	align-items: center;
`;

const LobbyTitle = styled.h1`
`;

const LobbyInfos = styled.div`
	/* border: 1px solid red; */

	display: flex;

	flex-direction: row;
	flex-wrap: wrap;

	justify-content: center;
	align-content: center;

	width: 69%;
	/* width: height%; */
`;

const CodeContainer = styled.div`
	/* flex-grow: 5; */
	max-width: 42%;
`;

const PlayersContainer = styled.div`
	width: 65%;
	min-height: 50vh;

	display: flex;
	flex-direction: row;
	flex-wrap: wrap;

	justify-content: space-evenly;
	align-content: space-evenly;
`;

const GameSettings = styled.div`
	width: 30%;
	min-height: 50vh;
`;

const CodeToggler = styled.h1`
	user-select: none;
	cursor: pointer;
	
	width: 100%;
`;

const CodeCopy = styled.h1`
	user-select: none;
	cursor: pointer;

	width: 100%;
`;

const Code = styled.h1`
	color: white;
	text-align: center;
	font-size: 2.1em;

	letter-spacing: 42px;

	width: 100%;
`;

const Player = styled.div`
	border-radius: 10px;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

	background: whitesmoke;

	margin: 10px;
	padding: 20px;

	display: flex;
	flex-direction: row;
	flex-wrap: wrap;

	text-align: center;

	transition-duration: 0.2s;

	:hover {
		box-shadow: 0 0 5px 0 rgba(11, 227, 108, 0.678);

		> * > h2 {
			transform: scale(105%);
		}
	}
`;

const PlayerInfos = styled.div`
	/* border-inline: 1px solid red; */
	display: flex;

	flex-direction: column;
	
	margin-bottom: 20px;
`;

const PlayerState = styled.div`
	display: flex;
	flex-direction: row;

	justify-content: space-evenly;
	align-content: center;

	/* min-width: ; */
`;

const PlayerHost = styled(FaCrown)`
	color: #ffcc00;
`;

const PlayerReady = styled(ShakeLittle)`
	color: #00cc00;
`;


const PlayerPictureContainer = styled.div`
	/* border: 1px solid red; */
	border-radius: 50%;

	box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.12);

	margin-right: 20px;

	width: 60px;
	height: 60px;

	overflow: hidden;

	display: flex;
	justify-content: center;
	align-items: center;
`;

const PlayerPicture = styled.img`
	width: 150%;
	
`;


const PlayerName = styled.h2`
	font-size: 1.3em;

	transition-duration: 0.1s;
	
`;

const PLayerActions = styled.div`
	/* border: 1px solid red; */

	display: flex;
	flex-direction: row;
	justify-content: space-evenly;

	position: fixed;

	align-self: flex-end;
	
	opacity: 0.3;
	
	transition-duration: 0.3s;
	
	:hover {
		opacity: 0.8;
		margin-bottom: 5px;
		color: gold;
	}
`;

const PlayerAction = styled.button`
	background: ${props => props.theme === "green" ? "#40b336": "#ec2c4c" };
	border-radius: 50%;
	border: 0px;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

	margin: 2px;

	
	cursor: pointer;
	
	color: whitesmoke;
	
	transition-duration: 0.1s;

	:hover {
		color: gold;
		transform: scale(108%);
	}

	/* :disabled {
		background: ${props => props.theme === "green" ? "#40b33669": "#ec2c4c69" };
		cursor: not-allowed; */
	/* } */

`;

const StartAction = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	background: #40b336 !important;
	
	border-radius: 10px;
	border: 0px;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

	margin-top: 20px;
	padding: 20px;

	width: 42%;

	border: none;
	background: none;
`;

const StartGameText = styled.h1`
	color: whitesmoke;
`;

export default Lobby;