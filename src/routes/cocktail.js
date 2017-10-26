// const router = require('express').Router();
// const Cocktail = require('../db/Cocktail');
// const Ingredient = require('../db/Ingredient');

// router.get('/', (req, res, next) => {
//     Ingredient.findOne({
//         where: {
//             name: 'Whiskey'
//         }
//     })
//         .then(campari => {
//             return campari.getCocktails({ include: [{ all: true }] })
//                 .then(cocktails => {
//                     res.send(cocktails[2]);
//                 })
//         }).catch(console.log)
// })

// module.exports = router;
