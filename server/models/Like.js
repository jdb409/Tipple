const db = require('./conn');
const Sequelize = db.Sequelize;

const Like = db.define('like', {
    ingredientList: {
        type: Sequelize.STRING
    }
})

module.exports = Like;

