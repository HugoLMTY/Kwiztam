import React, { useState, useEffect } from 'react';
import { Shake } from 'reshake';
import styled from 'styled-components';

const Home = () => {
	return (
		<HomeContainer>
			<TamzContainer>
				<Boomz
					active={true}
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
					<img height={ 700 } src={ require("../assets/img/boom.png") } alt="logo" />
					
					<Title> Kwiz'Tam </Title>

				</Boomz>
			</TamzContainer>
		</HomeContainer>
	);
}

const HomeContainer = styled.div`	
	background: linear-gradient(to bottom right, #3399ff 0%, #ff00ff 100%);
	height: 100vh;
	width: 100vw;

	display: flex;
	justify-content: center;
	align-items: center;

`;

const TamzContainer = styled.div`
	overflow: hidden;

`;

const Boomz = styled(Shake)`
	border: solid 1px red;
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

export default Home;