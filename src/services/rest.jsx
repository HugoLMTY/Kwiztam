import axios from 'axios';
import React from 'react';
import Swal from 'sweetalert2';

const baseURL = 'http://localhost:3001/';

const api = 'api/';

const auth = 'auth/';
const user = 'user/';

const login = async (username, password) => {
	if (!username || !password) return false

	const route = `${auth}login`;

	return await buildQuery({ method: 'POST', route, data: { username, password } });
};

const register = async (username, password) => {
	if (!username || !password) return false

	const route = `${auth}register`;

	return await buildQuery({ method: 'POST', route, data: { username, password } })
};

const checkAvailability = async (username) => {
	if (!username) return false

	const route = `${auth}register/checkAvailibility`;

	return await buildQuery({ method: 'POST', route, data: { username } })
};

const buildQuery = async (params) => {
	const logRes = true

	try {	
		const {
			method,
			route,
			data
		} = params;
	
		const path = `${baseURL}${route}`;
		
		const config = {
			method,
			url: path,
			data,
			headers: {
				'Content-Type': 'application/json',
			}
		};
			
		const res = await axios(config).catch((err) => { console.log(err) });
		
		logRes && console.log({ res })

		return res.data

	} catch(err) {
		console.error(err);
		return err
	}
};

export default {
	login,
	register,
	checkAvailability,
};
