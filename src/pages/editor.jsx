import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import './style/lobby.css';
import './../App.css';

const Editor = () => {
	return (
		<EditorContainer>
			<EditorTitle className='title'>Editor</EditorTitle>
		</EditorContainer>
	);
}


const EditorContainer = styled.div`	
	background: linear-gradient(to bottom right, #3399ff 0%, #ff00ff 100%);
	height: 100vh;
	width: 100vw;

	display: flex;
	justify-content: center;
	align-items: center;

`;

const EditorTitle = styled.h1`
	color: whitesmoke;
	/* flex-flow: ; */
`;

export default Editor;