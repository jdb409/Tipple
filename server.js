const express = require('express');
const app = express();
const path = require('path');
const db = require('./src/models/');


app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

db.sync({ force: true })
    .then(() => {
        db.seed()
            .then(() => {
                app.listen(3000, () => {
                })
            })
    });