const router = require('express').Router()
const Like = require('../models/Like');
const Cocktail = require('../models/Cocktail');

router.post('/:userId', (req, res, next) => {
    Cocktail.findById(req.body.cocktailId)
        .then(cocktail => {
            return Like.create({
                ingredientList: cocktail.ingredientList,
                cocktailId: req.body.cocktailId,
                userId: req.params.userId
            })
                .then(() => {
                    res.sendStatus(200);
                })
        })
})

module.exports = router
