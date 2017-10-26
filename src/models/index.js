const db = require('./conn');
const Cocktail = require('./Cocktail');
const Ingredient = require('./Ingredient');
const cocktails = require('./dataFormat')

const Mix = db.define('mix', {
    quantity: db.Sequelize.STRING
})

Cocktail.belongsToMany(Ingredient, { through: Mix });
Ingredient.belongsToMany(Cocktail, { through: Mix });

db.seed = () => {
    const promiseCocktails = [];
    for (let drink in cocktails) {
        promiseCocktails.push(Cocktail.create({
            name: drink,
            instructions: cocktails[drink].instructions,
            photo: cocktails[drink].photo
        }).then(cocktail => {
            const promises = [];
            cocktails[drink].ingredients.forEach((ingredient, index) => {
                promises.push(
                    Ingredient.create({ name: ingredient })
                        .then(ingredient => {
                            cocktail.addIngredient(ingredient, { through: { quantity: cocktails[drink].quantity[index + 1] } })
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
    .then(()=> {
        console.log('huzzah');
    })
}

module.exports = db;
