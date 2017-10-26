const express = require('express');
const app = express();
const path = require('path');
const db = require('./src/models/');
const port = process.env.PORT || 3000;

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

app.use('/api/cocktails', require('./src/routes/cocktail'))

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