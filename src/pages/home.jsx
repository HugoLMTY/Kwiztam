import React from 'react';
import { NavLink } from 'react-router-dom';
import { Shake, ShakeLittle } from 'reshake';
import styled from 'styled-components';

const Home = () => {
	const animate = true
	return (
		<HomeContainer>
			<TamzContainer>
				<Boomz
					active={animate}
					h={0}
					v={0}
					r={45}
					dur={1000}
					int={69}
					max={100}
					fixed={true}
					fixedStop={false}
					freez={false}
				>
					<img height={ 690 } src={ require("../assets/img/boom.png") } alt="logo" />					
					
					<Title> Kwiz'Tam </Title>

				</Boomz>
			</TamzContainer>


			<ButtonsContainer>
				{/* <Button
				active={animate}
				h={5}
				v={5}
				r={18}
				dur={300}
				int={52.4}
				max={91}
				fixed={true}
				fixedStop={true}
				freez={false}
				> 	
					<Link to="/lobby">
						Créer une partie 
					</Link>
				</Button> */}
				<Button active={animate} fixedStop={true}> 	
					<Link to="/lobby">
						Créer une partie 
					</Link>
				</Button>
				
				<Button active={animate} fixedStop={true}>  
					<Link to="/game">
						Rejoindre une partie
					</Link>
				</Button>
				
				{/* <Button
				active={animate}
				h={5}
				v={5}
				r={18}
				dur={300}
				int={52.4}
				max={91}
				fixed={true}
				fixedStop={true}
				freez={false}
				>  
					<Link to="/game">
						Rejoindre une partie
					</Link>
				</Button> */}
			</ButtonsContainer>
		</HomeContainer>
	);
}

const HomeContainer = styled.div`	
	background: linear-gradient(to bottom right, #3399ff 0%, #ff00ff 100%);
	height: 100vh;
	width: 100vw;

	user-select: none;

	overflow: hidden visible;

	display: flex;
	justify-content: center;
	align-items: center;

`;

const TamzContainer = styled.div`
	overflow: hidden visible;
	overflow-y: hidden;
`;

const ButtonsContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Boomz = styled(Shake)`
	/* border: solid 1px red; */
	font-size: 100px;
	color: white;
`;

const Title = styled.h1`
	font-size: 142px;
	color: white;

	position: relative;
	top: -420px;
	left: 240px;
	z-index: 419;
`;

const Button = styled(ShakeLittle)`
	background: #80DFFF;

	font-size: 42px;

	border: none;
	border-radius: 10px;
	
	padding: 10px 20px;
	margin: 10px;
	
	cursor: pointer;

	transition-duration: 01s;

	:hover {

		/* select Link child */
		& > * {
			color: black;
		}
	}

`;

const Link = styled(NavLink)`
	color: white;
	text-decoration: none;
`;

export default Home;