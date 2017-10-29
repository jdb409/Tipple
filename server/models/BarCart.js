const db = require('./conn');
const Sequelize = db.Sequelize;

const BarCart = db.define('barcart', {
    liquor: {
        type: Sequelize.STRING
    }
})

module.exports = BarCart;

