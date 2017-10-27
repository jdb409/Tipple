const db = require('./conn');
const Sequelize = db.Sequelize;

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

module.exports = Cocktail;

