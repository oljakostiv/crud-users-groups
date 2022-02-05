require('dotenv').config();
const express = require('express');
const expressFileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const sequelize = require('./db');
const {errorApiMiddleware} = require('./middlewares');

const PORT = process.env.PORT || 5000;

const staticDirName = 'static'

const directory = `./${staticDirName}`
if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory)
}

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, staticDirName)));
app.use(expressFileUpload({}));
app.use('/api', require('./routes'));
app.use(errorApiMiddleware);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        app.listen(PORT, () => {
            console.log(`Welcome! Port: ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
};

start();
