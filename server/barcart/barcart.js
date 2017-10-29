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
    Ingredient.findById(req.body.ingredientId)
        .then(ingredient => {
            return BarCart.create()
                .then(cart => {
                    cart.userId = req.params.id;
                    cart.addIngredient(ingredient);
                    return cart.save();
                }).catch(next);
        })
        .then(ingredient => {
            res.send(ingredient);
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
