import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideBar from './components/sidebar';

import Home from './pages/home';
import Lobby from './pages/lobby';
import Game from './pages/game';
import Editor from './pages/editor';
import Profile from './pages/profile';

import { UserContext } from './context/userContext';

import './App.css'
import { useState } from 'react';

const App = () => {

	const [ user, setUser ] = useState(null);

	return (
		<>
			<UserContext.Provider value={ { user, setUser } }>

				<Router>
				<SideBar />

					<Routes>

						<Route path="/" element={<Home />} />
						<Route path="/lobby" element={<Lobby />} />
						<Route path="/game" element={<Game />} />
						<Route path="/editor" element={<Editor />} />
						<Route path="/profile" element={<Profile />} />

					</Routes>
				</Router>

			</UserContext.Provider>
		</>
	);
}

export default App;