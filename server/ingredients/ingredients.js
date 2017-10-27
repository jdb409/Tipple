const router = require('express').Router();
const Cocktail = require('../models/Cocktail');
const Ingredient = require('../models/Ingredient');

router.get('/:liquor', (req, res, next) => {
    Ingredient.findOne({
        where: {
            name: req.params.liquor
        }

    }).then(liquor => {
        console.log(liquor);
        return liquor.getCocktails();

    }).then(drinks => {
        res.send(drinks);
    })
        .catch(next);
})

module.exports = router;
