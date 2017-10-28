const router = require('express').Router();
const Cocktail = require('../models/Cocktail');
const Ingredient = require('../models/Ingredient');


router.get('/', (req, res, next) => {
    Ingredient.findAll()
        .then(ingredients => {
            res.send(ingredients);
        }).catch(next);
})

router.get('/:id', (req, res, next) => {
    Ingredient.findById(req.params.id)
        .then(liquor => {
            return liquor.getCocktails();

        }).then(drinks => {
            res.send(drinks);
        }).catch(next);
})



module.exports = router;
