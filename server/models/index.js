const db = require('./conn');
const Cocktail = require('./Cocktail');
const Ingredient = require('./Ingredient');
const cocktails = require('./dataFormat');
const User = require('./User');
const BarCart = require('./BarCart')
const _ = require('underscore');

const Mix = db.define('mix', {
    quantity: db.Sequelize.STRING
})

Cocktail.belongsToMany(Ingredient, { through: Mix });
Ingredient.belongsToMany(Cocktail, { through: Mix });

BarCart.belongsTo(User);
BarCart.hasMany(Ingredient);

db.seed = () => {
    const promiseCocktails = [];
    let ingredients = [];
    for (let d in cocktails) {
        cocktails[d].justIng = [];
        cocktails[d].ingredients.forEach(arr => {

            if (arr.ingredient && arr.ingredient.length > 1) {
                ingredients.push(arr.ingredient);
                cocktails[d].justIng.push(arr.ingredient);
            }
        })

    }

    //get unique ingredients
    ingredients = _.flatten(ingredients);
    ingredients = _.uniq(ingredients)

    //create ingredients
    ingredients.forEach(ing => {
        if (ing) {
            Ingredient.create({ name: ing })
                .catch(console.log)
        }
    });

    for (let drink in cocktails) {
        //create cocktails and associations
        promiseCocktails.push(Cocktail.create({
            name: drink,
            instructions: cocktails[drink].instructions,
            photo: cocktails[drink].photo,
            ingredientList: cocktails[drink].justIng
        }).then(cocktail => {
            const promises = [];
            cocktails[drink].ingredients.forEach(ingredient => {

                if (ingredient.ingredient) {
                    promises.push(

                        Ingredient.findOne({ where: { name: ingredient.ingredient } })
                            .then(ing => {

                                cocktail.addIngredient(ing, { through: { quantity: ingredient.quantity } })
                            }).catch(console.log)
                    )
                }
            })
            Promise.all(promises)
                .then(() => {

                }).catch(console.log)
        }).catch(console.log)
        )
    }

    return Promise.all(promiseCocktails)
        .then(() => {
            return User.create({ email: 'j@j.com', password: '123' })
        }).catch(console.log)

}
// db.sync({ force: true })
//     .then(() => {
//         db.seed();
//     })


module.exports = db;
