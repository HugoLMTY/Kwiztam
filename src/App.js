import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SideBar from './components/sidebar';

import Home from './pages/home';
import Lobby from './pages/lobby';
import Game from './pages/game';
import Editor from './pages/editor';
import Profile from './pages/profile';

import './App.css'

const App = () => {
	return (
		<>
			{/* <h1>App</h1> */}

			<BrowserRouter>
			<SideBar />

				<Routes>

					<Route path="/" element={<Home />} />
					<Route path="/lobby" element={<Lobby />} />
					<Route path="/game" element={<Game />} />
					<Route path="/editor" element={<Editor />} />
					<Route path="/profile" element={<Profile />} />

				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;