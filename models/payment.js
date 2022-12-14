const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const Payment = sequelize.define("payment", {
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true,
    },
    month : {
        type : Sequelize.INTEGER,
        allowNull : false,
    },
    amount : {
        type : Sequelize.INTEGER,
        allowNull : false
    },
})

sequelize.sync().then( (result) => {
    console.log("Table Payment Created!");
}).catch( (err) => {
    console.log("Error in creating table", err);
})

module.exports = Payment;