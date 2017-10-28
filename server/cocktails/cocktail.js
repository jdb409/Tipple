const router = require('express').Router();
const Cocktail = require('../models/Cocktail');
const Ingredient = require('../models/Ingredient');
const _ = require('underscore');

router.get('/', (req, res, next) => {
    Cocktail.findAll()
        .then(cocktails => {
            res.send(cocktails);
        })
})

//get individual cocktail
router.get('/:id', (req, res, next) => {
    Cocktail.findById(req.params.id, { include: [{ all: true }] })
        .then(cocktail => {
            console.log(cocktail);
            res.send(cocktail);
        }).catch(next);
})


// //search for all cocktails with selected ingredients
// router.post('/findCocktails', (req, res, next) => {

//     console.log('inventory', req.body.ingredients);
//     return Cocktail.findAll({
//         where: {
//             ingredientList: {
//                 $contained: req.body.ingredients
//             }
//         }
//     }).then(cocktail => {
//         // console.log(cocktail);
//         res.send(cocktail);
//     }).catch(next);
// })

router.post('/findCocktails', (req, res, next) => {
    console.log('inventory', req.body.ingredients);
    return Cocktail.findAll({
    }).then(cocktails => {
        let diff = [];
        let matches = {};
        matches.exact = [];
        matches.oneOff = [];
        matches.twoOff = [];
        cocktails.forEach((cocktail, index) => {
            const ingArr = [];
            return cocktail.getIngredients({ attributes: ['name'] })
                .then(ing => {
                    ing.forEach(ingredient => {
                        ingArr.push(ingredient.name)
                    })
                    diff = _.difference(ingArr, req.body.ingredients);
                    if (!diff.length) {
                        matches.exact.push(cocktail);
                        console.log(cocktail.name)
                    } else if (diff.length === 1) {
                        matches.oneOff.push(cocktail);
                    } else if (diff.length === 2) {
                        matches.twoOff.push(cocktail);
                    }

                    return matches;
                }).then(matches => {
                    if (index === cocktails.length - 1) {
                        console.log('oneOff', matches.oneOff.length);
                        console.log('two', matches.twoOff.length);
                        res.send(matches);
                    }

                })
        })

    }).catch(next);
})
module.exports = router;