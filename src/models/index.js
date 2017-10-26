const db = require('./conn');
const Cocktail = require('./Cocktail');
const Ingredient = require('./Ingredient');
const cocktails = require('./dataFormat')
const _ = require('underscore');

const Mix = db.define('mix', {
    quantity: db.Sequelize.STRING
})

Cocktail.belongsToMany(Ingredient, { through: Mix });
Ingredient.belongsToMany(Cocktail, { through: Mix });

db.seed = () => {
    const promiseCocktails = [];
    let ingredients = [];
    for (let d in cocktails) {
        ingredients.push(cocktails[d].ingredients);
    }
    ingredients = _.flatten(ingredients);
    ingredients = _.uniq(ingredients)
    console.log(ingredients.length);

    ingredients.forEach(ing => {
        Ingredient.create({ name: ing })
            .catch(console.log)
    });

    for (let drink in cocktails) {
        promiseCocktails.push(Cocktail.create({
            name: drink,
            instructions: cocktails[drink].instructions,
            photo: cocktails[drink].photo,
            ingredientList: cocktails[drink].ingredients
        }).then(cocktail => {
            const promises = [];
            cocktails[drink].ingredients.forEach((ingredient, index) => {
                promises.push(
                    Ingredient.findOne({ where: { name: ingredient } })
                        .then(ing => {
                            cocktail.addIngredient(ing, { through: { quantity: cocktails[drink].quantity[index + 1] } })
                        }).catch(() => {
                            console.log('esdafsdf');
                        })
                )
            })
            Promise.all(promises)
                .then(() => {

                }).catch(console.log)
        })
        )
    }

    return Promise.all(promiseCocktails)
        .then(() => {
            console.log('huzzah');
        }).catch(console.log)

}

module.exports = db;
