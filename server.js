const express = require('express');
const config = require('./config');

const app = express();
const PORT = config.server.port;

app.listen(PORT, () => {
    console.log('[SERVER]: running at http://localhost:' + PORT);
})