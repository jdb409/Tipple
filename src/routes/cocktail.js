const router = require('express').Router();
const Cocktail = require('../models/Cocktail');
const Ingredient = require('../models/Ingredient');

router.get('/', (req, res, next) => {
    Ingredient.findAll({
        where: {
            name: 'Gin'
        }
    })
        .then(gin => {
            console.log(gin.length);
            res.send(gin);
        })
})

module.exports = router;
