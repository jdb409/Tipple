const router = require('express').Router();
const Cocktail = require('../models/Cocktail');
const Ingredient = require('../models/Ingredient');

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
