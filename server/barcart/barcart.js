const router = require('express').Router();
const BarCart = require('../models/BarCart');
const Ingredient = require('../models/Ingredient');


router.get('/:userId', (req, res, next) => {

    BarCart.findAll({
        where: { userId: req.params.userId }
    })
        .then(barCart => {
            if (!barCart){
                res.send([]);
            }
            res.send(barCart)
        }).catch(next);
})

router.post('/:userId', (req, res, next) => {

    BarCart.findOne({ where: { userId: req.params.userId, liquor: req.body.ingredient } })
        .then(cart => {
            return cart ? cart :
                BarCart.create({
                    liquor: req.body.ingredient,
                    userId: req.params.userId
                })

        }).then(cart => {
            res.send(cart.liquor);
        })
        .catch(next);
});


router.delete('/:userId/:ingredient', (req, res, next) => {
    BarCart.destroy({
        where: {
            userId: req.params.userId,
            liquor: req.params.ingredient
        }
    }).then(() => {
        res.send(200);
    }).catch(next);
})
module.exports = router;
