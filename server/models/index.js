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
        // console.log(cocktails[d].ingredients);
        // console.log(d);
        cocktails[d].justIng = [];
        cocktails[d].ingredients.forEach(arr => {

            if (arr.ingredient && arr.ingredient.length > 1) {
                // console.log(arr.ingredient.length);
                ingredients.push(arr.ingredient);
                cocktails[d].justIng.push(arr.ingredient);
            }
        })

    }


    ingredients = _.flatten(ingredients);
    ingredients = _.uniq(ingredients)

    // console.log('ingredient', ingredients);

    ingredients.forEach(ing => {
        // console.log('asdfds', ing);
        if (ing) {
            Ingredient.create({ name: ing })
                .catch(console.log)
        }
    });

    for (let drink in cocktails) {
        // console.log(cocktails[drink].ingredients);
        promiseCocktails.push(Cocktail.create({
            name: drink,
            instructions: cocktails[drink].instructions,
            photo: cocktails[drink].photo,
            ingredientList: cocktails[drink].justIng
        }).then(cocktail => {
            const promises = [];
            cocktails[drink].ingredients.forEach(ingredient => {
                // console.log('inside', ingredient)
                if (ingredient.ingredient) {
                    promises.push(

                        Ingredient.findOne({ where: { name: ingredient.ingredient } })
                            .then(ing => {

                                cocktail.addIngredient(ing, { through: { quantity: ingredient.quantity } })
                            }).catch(() => {
                                console.log('esdafsdf');
                            })
                    )
                }
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
