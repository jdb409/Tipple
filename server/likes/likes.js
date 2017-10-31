const router = require('express').Router()
const Like = require('../models/Like');
const Cocktail = require('../models/Cocktail');
const Ingredient = require('../models/Ingredient');
const _ = require('underscore');

router.get('/recommendation/:userId', (req, res, next) => {

    let ingArr = [];
    let greatest;
    Like.findAll({
        where: {
            userId: req.params.userId
        }
    })
        .then(likes => {

            likes.forEach(like => {
                console.log(like.ingredientList);
                ingArr.push(like.ingredientList);
            })
            ingArr = _.flatten(ingArr);
            console.log('sadfdsa', ingArr)
            greatest = ingArr.reduce((memo, current) => {
                if (!memo[current]) {
                    memo[current] = 1;
                } else {
                    memo[current]++;
                }
                return memo;
            }, {})
            let mostLiked = {};
            let largest = 0;
            for (let key in greatest) {
                
                if (greatest[key] > largest) {
                
                    largest = greatest[key];
                    mostLiked = key;
                }
            }
            return Ingredient.findOne({
                where: {
                    name: mostLiked
                }
            }).then(ing => {
                return ing.getCocktails();
            }).then(drinks => {
                res.send(drinks);
            })
            
        })
})

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
