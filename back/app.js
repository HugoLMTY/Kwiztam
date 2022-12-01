const express = require('express');
const app = express();

const tools = require('./services/toolsService');

const PORT = 3001

app.listen(PORT, () => {
	tools.log('Server is running', { id: PORT });
})