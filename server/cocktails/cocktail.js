const router = require('express').Router();
const Cocktail = require('../models/Cocktail');
const Ingredient = require('../models/Ingredient');

router.get('/', (req, res, next) => {
    Cocktail.findAll()
    .then(cocktails => {
        res.send(cocktails);
    })
})

//get individual cocktail
router.get('/:id', (req, res, next) => {
    Cocktail.findById(req.params.id)
    .then(cocktail => {
        res.send(cocktail);
    }).catch(next);
})


//search for all cocktails with selected ingredients
router.post('/findCocktail', (req, res, next) => {
    console.log('hello');
    console.log(req.body.ingredient);
    return Cocktail.findAll({
        where: {
            ingredientList: {
                $contained: req.body.ingredient
            }
        }
    }).then(cocktail => {
        // console.log(cocktail);
        res.send(cocktail);
    }).catch(next);
})

module.exports = router;