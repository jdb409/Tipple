const db = require('./conn');
const Sequelize = db.Sequelize;

const Cocktail = db.define('cocktail', {
    name: {
        type: Sequelize.STRING,
    },
    instruction: {
        type: Sequelize.STRING
    },
    photo: {
        type: Sequelize.STRING
    }
})

module.exports = Cocktail;

