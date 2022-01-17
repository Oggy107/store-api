const express = require('express');
const config = require('./config');
const connectDB = require('./db/connectDB');
require('dotenv').config();

const productsRouter = require('./routes/api-v1/products');

const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = config.server.port;
const MONGO_URI = process.env.MONGO_URI;


const main = async () => {
    try {
        await connectDB(MONGO_URI);
        console.log('[SERVER]: connected to db successfully');

        app.use([productsRouter, notFound, errorHandler]);

        app.listen(PORT, () => {
            console.log('[SERVER]: running at http://localhost:' + PORT);
        });
    } catch (error) {
        console.error('[ERROR]: ', error);
        process.exitCode = 1;
    }
}

if (require.main == module)
    main();
