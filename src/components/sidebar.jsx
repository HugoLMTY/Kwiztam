import { 
	FaBars,
	FaDumpster,
	FaGamepad,
	FaHome,
	FaPencilAlt,
	FaSignInAlt,
	FaSignOutAlt,
	FaStickerMule,
} from 'react-icons/fa';
import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { useEffect } from 'react';

const SideBar = () => {

	const [ sidebar, setSidebar ] = useState({ state: false });

	const { user, setUser } = useContext(UserContext)
	useEffect(() => {
		// console.log({ user })
	}, [ user ])
	

	const toggleSidebar = () => {
		setSidebar({ state: !sidebar.state });
	}

	const pages = [
		{
			name: 'Home',
			path: '/',
			icon: <FaHome />,
			needAuth: false,
		},
		{
			name: 'Lobby',
			path: '/lobby',
			icon: <FaDumpster />,
			needAuth: true,
		},
		{
			name: 'Editor',
			path: '/editor',
			icon: <FaPencilAlt />,
			needAuth: true,
		},
		{
			name: 'Game',
			path: '/game',
			icon: <FaGamepad />,
			needAuth: true,
		}
	]

	const login = () => {
		setUser({
			id: 1,
			name: 'John Doe',
			avatar: './assets/img/defaultProfilePicture.png'
		})
	}

	const logout = () => {
		setUser(null)
	}

	return (
		<SideBarContainer style={ { width: sidebar.state ? '15%' : '5%', zIndex: 420} }>

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
							<SideBarLink to={page.path} key={index} state={ sidebar.state } display={ (page.needAuth && !user) ? 'none' : 'flex' } >
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

				{ 
				user 
					? <SignOut onClick={ () => logout() }/>
					: <SignIn onClick={ () => login() }/>
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
	text-decoration: none;

	display: ${ props => props.display };
	flex-direction: row;
	justify-content: center;
	align-content: center;
	
	transition-duration: 0.1s;

	:hover {
		color: lightblue;

		cursor: pointer;
		transform: ${props => props.state ? 'scale(1.1)' : 'scale(1.69)'};
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

const SignIn = styled(FaSignInAlt)`
	cursor: pointer;

	transition-duration: 0.1s;
	:hover {
		color: lightblue;

		cursor: pointer;
		transform: ${props => props.state ? 'scale(1.1)' : 'scale(1.69)'};
	}
`;

const SignOut = styled(FaSignOutAlt)`
	cursor: pointer;

	transition-duration: 0.1s;
	:hover {
		color: red;

		cursor: pointer;
		transform: ${props => props.state ? 'scale(1.1)' : 'scale(1.69)'};
	}
`;


export default SideBar;