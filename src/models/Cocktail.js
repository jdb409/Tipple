const db = require('./conn');
const Sequelize = db.Sequelize;

const Cocktail = db.define('cocktail', {
    name: {
        type: Sequelize.STRING,
    },
    instructions: {
        type: Sequelize.STRING
    },
    photo: {
        type: Sequelize.STRING
    }
})

module.exports = Cocktail;

