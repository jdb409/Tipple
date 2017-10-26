const db = require('./conn');
const Cocktail = require('./Cocktail');
const Ingredient = require('./Ingredient');

const Mix = db.define('mix', {
    quantity: db.Sequelize.STRING
})

Ingredient.belongsToMany(Cocktail, { through: Mix });
Cocktail.belongsToMany(Ingredient, { through: Mix });

const seed = () => {
    const manhattan = Cocktail.create({ name: 'Manhattan' });
    const boulvardier = Cocktail.create({ name: 'Boulvardier' });
    const goldRush = Cocktail.create({ name: 'Gold Rush' });
    const whiskeySour = Cocktail.create({ name: 'Whiskey Sour' });
    const negroni = Cocktail.create({ name: 'Negroni' });

    const whiskey = Ingredient.create({ name: 'Whiskey' });
    const lemon = Ingredient.create({ name: 'Lemon Juice' });
    const sweetVermouth = Ingredient.create({ name: 'Sweet Vermouth' });
    const angostura = Ingredient.create({ name: 'Angostura' });
    const campari = Ingredient.create({ name: 'Campari' });
    const gin = Ingredient.create({ name: 'Gin' });
    const simpleSyryp = Ingredient.create({ name: 'Simple Syrup' });
    const eggWhite = Ingredient.create({ name: 'Egg White' });

    return Promise.all([manhattan, boulvardier, goldRush, whiskeySour, negroni, whiskey, sweetVermouth,
        angostura, campari, gin, lemon, simpleSyryp, eggWhite])
        .then(([manhattan, boulvardier, goldRush,
            whiskeySour, negroni, whiskey, sweetVermouth,
            angostura, campari, gin, lemon, simpleSyryp, eggWhite]) => {

            // manhattan.setIngredients([whiskey, sweetVermouth, angostura]);
            manhattan.addIngredient(whiskey, { through: { quantity: '2 oz' } });
            boulvardier.setIngredients([whiskey, sweetVermouth, campari]);
            goldRush.setIngredients([whiskey, simpleSyryp, lemon]);
            whiskeySour.setIngredients([whiskey, simpleSyryp, lemon, eggWhite]);
            negroni.setIngredients([gin, campari, sweetVermouth])

        }).catch(console.log)

}


db.sync({ force: true })
    .then(() => {
        console.log('db synced');
        return seed()
            .then(() => {
                console.log('db seeded');
            })

    });

db.sync({ force: true })

module.exports = db;
