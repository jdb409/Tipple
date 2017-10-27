const router = require('express').Router();
const Cocktail = require('../models/Cocktail');
const Ingredient = require('../models/Ingredient');

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


router.get('/:name', (req, res, next) => {
    Cocktail.findOne({
        where: {
            name: req.params.name
        }
    }).then(cocktail => {
        return cocktail.getIngredients()
            .then(ing => {
                res.send({ cocktail, ing })
            }).catch(next);
    }).catch(next);
})




module.exports = router;