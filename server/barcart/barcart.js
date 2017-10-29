const router = require('express').Router();
const BarCart = require('../models/BarCart');
const Ingredient = require('../models/Ingredient');


router.get('/', (req, res, next) => {
    BarCart.findAll({
        where: { userId: req.params.userId }
    })
        .then(barCart => {
            res.send(barCart)
        }).catch(next);
})

router.post('/:userId', (req, res, next) => {
    console.log('sdfdsafd', req.params.userId, req.body.ingredientId)
    return Ingredient.findById(req.body.ingredientId)
        .then(ingredient => {
            BarCart.create()
                .then(cart => {
                    cart.userId = req.params.userId;
                    cart.addIngredient(ingredient);
                    cart.save()
                    return ingredient;
                }).then(ingredient => {
                    console.log('ingredient', ingredient);
                    res.send(ingredient.name);
                })

        }).catch(next);
})

router.delete('/:itemId', (req, res, next) => {
    BarCart.destroy({
        where: {
            id: req.params.itemId
        }
    }).then(() => {
        res.send(200);
    }).catch(next);
})
module.exports = router;
