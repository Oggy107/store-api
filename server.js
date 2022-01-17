const express = require('express');
const config = require('./config');
require('dotenv').config();

const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = config.server.port;

app.use([notFound, errorHandler]);

app.listen(PORT, () => {
    console.log('[SERVER]: running at http://localhost:' + PORT);
})