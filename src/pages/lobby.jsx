import React, { useState, useEffect } from 'react';
import { FaCrown, FaRegCopy, FaRegEye, FaRegEyeSlash, FaSkull } from 'react-icons/fa';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const Lobby = () => {

	const [ lobby, setLobby ] = useState({
		code: 'A4C2A0B',
		showCode: true,
		players: [
			{ playerId: 1, host: false, name: 'Player 1', score: 0, answers: [ ] },
			{ playerId: 2, host: false, name: 'Player 2', score: 0, answers: [ ] },
			{ playerId: 3, host: false, name: 'Player 3', score: 40, answers: [ ] },
			{ playerId: 4, host: false, name: 'Player 4', score: 0, answers: [ ] },
			{ playerId: 5, host: false, name: 'Player 5', score: 0, answers: [ ] },
			{ playerId: 6, host: true, 	name: 'Player 6', score: 420, answers: [ ] },
			{ playerId: 7, host: false, name: 'Player 7', score: 10, answers: [ ] },
			{ playerId: 8, host: false, name: 'Player 8', score: 0, answers: [ ] },
			{ playerId: 9, host: false, name: 'Player 9', score: 1337, answers: [ ] },
		]
	});

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

	return (
		<>
			<LobbyContainer>
				<LobbyTitle>Game Lobby</LobbyTitle>

				<LobbyInfos>

					<CodeContainer>
						{/* <CodeTitle>Game Code</CodeTitle> */}
						<CodeToggler onClick={ () => setLobby({ ...lobby, showCode: !lobby.showCode }) }>
							{ lobby.showCode ? <FaRegEye /> : <FaRegEyeSlash /> }
						</CodeToggler>

						<Code> { lobby.showCode ? lobby.code.trim() : lobby.code.split('').map(l => "*").join('') } </Code>

						<CodeCopy>
							<FaRegCopy onClick={ () => copyCode() } />  
						</CodeCopy>

					</CodeContainer>

					<PlayersContainer>
						{lobby.players.map(player => (
							<Player player={ player } key={player.playerId}>

								<PlayerInfos>
									<PlayerPictureContainer>
										<PlayerPicture src={ require("../assets/img/defaultProfilePicture.png") } alt="logo" />
									</PlayerPictureContainer>

									{
										player.host 
										? <PlayerHost />
										: <> </>
									}

									<PlayerName >{player.name}</PlayerName>
								</PlayerInfos>



								<PLayerActions>
									<PlayerAction disabled={ player.host } onClick={ () => kickPlayer(player.playerId)} theme="red"> 		<FaSkull /> 	</PlayerAction>
									<PlayerAction disabled={ player.host } onClick={ () => promotePlayer(player.playerId)} theme="green"> 	<FaCrown /> 	</PlayerAction>
								</PLayerActions>
							</Player>
						))}

					</PlayersContainer>

				</LobbyInfos>


			</LobbyContainer>
		</>
	);
}


const LobbyContainer = styled.div`
	background: linear-gradient(to bottom right, #3399ff 0%, #ff00ff 100%);
	height: 100vh;
	width: 100vw;

	display: flex;
	flex-direction: column;

	justify-content: center;
	align-items: center;
`;

const LobbyTitle = styled.h1`
	color: white;
	text-align: center;
	font-size: 4.20em;

	width: 100%;
`;

const LobbyInfos = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	
`;

const CodeContainer = styled.div`
	border-radius: 20px;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.42);


	background: rgba(255, 255, 255, 0.55);

	padding: 30px;
	margin: 20px;


	display: flex;
	justify-content: space-around;
	align-content: space-around;

	width: 42%;
`;

const CodeToggler = styled.h1`
	/* color: white; */
	/* text-align: center; */
	/* font-size: 2.20em; */

	user-select: none;
	
	width: 100%;
`;

const CodeCopy = styled.h1`
	/* color: white; */
	/* text-align: center; */
	/* font-size: 2.20em; */

	user-select: none;

	width: 100%;
`;

const Code = styled.h1`
	color: white;
	text-align: center;
	font-size: 2.1em;

	letter-spacing: 42px;

	width: 100%;
`;

const PlayersContainer = styled.div`
	/* border: 1px solid; */
	border-radius: 20px;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.42);


	background: rgba(255, 255, 255, 0.55);
	padding: 30px;


	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-evenly;
	align-content: space-evenly;

	max-width: 69%;

	/* position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%); */


`;

const Player = styled.div`

	/* border: 1px solid; */
	border-radius: 10px;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

	background: whitesmoke;

	margin: 10px;
	padding: 20px;

	min-height: 120px;
	min-width: 340px;

	text-align: center;

	transition-duration: 0.2s;

	:hover {
		box-shadow: 0 0 5px 0 rgba(11, 227, 108, 0.678);
		/* transform: scale(1.01); */
	}
`;

const PlayerInfos = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	
	margin-bottom: 20px ;
	
`;

const PlayerHost = styled(FaCrown)`
	color: #ffcc00;
	font-size: 2.5em;
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


const PlayerName = styled.h1`
	font-size: 1.3em;
`;

const PLayerActions = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;

	align-self: flex-end;
`;

const PlayerAction = styled.button`
	background: ${props => props.theme === "green" ? "#40b336": "#ec2c4c" };
	
	border-radius: 10px;
	border: 0px;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

	color: whitesmoke;


	width: 100px;
	
	padding: 10px;

	cursor: pointer;

	transition-duration: 0.2s; ;

	:disabled {
		background: ${props => props.theme === "green" ? "#40b33669": "#ec2c4c69" };
		cursor: not-allowed;
	}

	:hover {
		transform: scale(1.03);
	}
`;

export default Lobby;