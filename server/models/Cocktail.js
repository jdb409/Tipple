const db = require('./conn');
const Sequelize = db.Sequelize;
const _ = require('underscore');

const Cocktail = db.define('cocktail', {
    name: {
        type: Sequelize.STRING,
    },
    instructions: {
        type: Sequelize.TEXT
    },
    photo: {
        type: Sequelize.STRING
    },
    ingredientList: {
        type: Sequelize.ARRAY(Sequelize.STRING)
    }
})

Cocktail.findMatch = function (barCart) {
    return Cocktail.findAll({
    }).then(cocktails => {
        let diff = [], matches = {};
        matches.exact = [];
        matches.oneOff = [];
        matches.twoOff = [];
        cocktails.forEach((cocktail, index) => {
            const ingArr = [];
            return cocktail.getIngredients({ attributes: ['name'] })
                .then(ing => {
                    ing.forEach(ingredient => {
                        ingArr.push(ingredient.name)
                    })
                    diff = _.difference(ingArr, barCart);
                    if (!diff.length) {
                        matches.exact.push(cocktail);

                    } else if (diff.length === 1) {
                        matches.oneOff.push(cocktail);
                    } else if (diff.length === 2) {
                        matches.twoOff.push(cocktail);
                    }

                    return matches;
                }).then(matches => {
                    if (index === cocktails.length - 1) {
                        return matches
                    } else {
                        return;
                    }

                })
        })

    })
}

module.exports = Cocktail;

