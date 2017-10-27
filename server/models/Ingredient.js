const db = require('./conn');
const Sequelize = db.Sequelize;

const Ingredient = db.define('ingredient', {
    name: {
        type: Sequelize.STRING
    }
});

module.exports = Ingredient;