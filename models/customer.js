const Sequelize = require("sequelize");
const sequelize = require("../config/db");
const Payment = require("./payment");

const CustomerDetails = sequelize.define("customerDetails", {
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true,
    },
    fullName : {
        type : Sequelize.STRING,
    },
    mobileNo : {
        type : Sequelize.STRING,
        unique : true,
        validate: {
            is : /^[789]\d{9}$/
        }
    },
    email : {
        type : Sequelize.STRING,
        allowNull : true,
        validate : {
            isEmail: true
        }
    },
    DOB : {
        type : Sequelize.DATEONLY,
    },
    batch : {
        type : Sequelize.STRING
    }
})

CustomerDetails.hasMany(Payment);

sequelize.sync().then( (result) => {
    console.log("Table Customer Created!");
}).catch( (err) => {
    console.log("Error in creating table", err);
})

module.exports = CustomerDetails;