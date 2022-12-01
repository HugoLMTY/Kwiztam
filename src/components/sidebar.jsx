import { 
	FaBars,
	FaDumpster,
	FaGamepad,
	FaHome,
	FaPencilAlt,
	FaStickerMule,
} from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const SideBar = ({children}) => {

	const [ sidebar, setSidebar ] = useState({ state: false });


	const toggleSidebar = () => {
		setSidebar({ state: !sidebar.state });
	}

	const pages = [
		{
			name: 'Home',
			path: '/',
			icon: <FaHome />
		},
		{
			name: 'Lobby',
			path: '/lobby',
			icon: <FaDumpster />
		},
		{
			name: 'Editor',
			path: '/editor',
			icon: <FaPencilAlt />
		},
		{
			name: 'Game',
			path: '/game',
			icon: <FaGamepad />
		}
	]

	return (
		<SideBarContainer style={ { width: sidebar.state ? '27%' : '5%', zIndex: 420} }>

			<SideBarHeader>
				{
					sidebar.state 
					?
					<SideBarTitle> 
						<FaStickerMule /> KwizTam 
					</SideBarTitle>
					: <> </>
				}

				<SideBarToggle onClick={ () => toggleSidebar() }>
					<FaBars />
				</SideBarToggle>

			</SideBarHeader>


			<SideBarMenu>

				{
					pages.map((page, index) => {
						return (
							<SideBarLink to={page.path} key={index} state={ sidebar.state }>
								<Icon> {page.icon} </Icon>
								{
									sidebar.state
									? <MenuItemText> {page.name} </MenuItemText>
									: <> </>
								}
							</SideBarLink>
						)
					})
				}

			</SideBarMenu>

		</SideBarContainer>
	);
}


const SideBarContainer = styled.div`
	background-color: #1a1a1a;
	color: #fff;

	position: absolute;
	top: 0;
	left: 0;

	/* width: 27%; */
	height: 100vh;


	user-select: none;
`;

const SideBarHeader = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: space-between;


	width: 100%;
	height: 10%;

	margin: 10px;
	margin-top: 30px;
`;

const SideBarTitle = styled.h1`
	font-size: 2rem;
`;

const SideBarToggle = styled.div`
	font-size: 1.5rem;

	transition-duration: 0.1s;
	:hover {
		cursor: pointer;
		transform: scale(1.1);
	}
`;

const SideBarMenu = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const SideBarLink = styled(NavLink)`
	margin: 15px;
	padding: 20px;

	color: whitesmoke;
	
	transition-duration: 0.1s;
	:hover {
		color: lightblue;

		cursor: pointer;
		transform: ${state => state ? 'scale(1.1)' : 'scale(2)'};
	}
`;

const MenuItemText = styled.p`
	font-size: 1.5rem;
	display: inline-block;
	vertical-align: middle;
	
`;


const Icon = styled.div`
	padding: 5px;
	display: inline-block;
	vertical-align: middle;

	transition-duration: 0.1s;
`;

export default SideBar;