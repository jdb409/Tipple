const express = require('express');
const app = express();
const path = require('path');
const db = require('./server/models/');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));


app.use('/api/cocktails', require('./server/cocktails/cocktail'))
app.use('/api/ingredients', require('./server/ingredients/ingredients'))
app.use('/auth', require('./server/auth/auth'))

app.use((err, req, res, next) => {
    res.send(err);
})

// db.sync({ force: true })
//     .then(() => {
//         db.seed()
//             .then(() => {
app.listen(port, () => {
    console.log(`listening on ${port}`)
})
    //         })
    // });