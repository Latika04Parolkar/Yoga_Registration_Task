const Sequelize = require('sequelize');
const env = require('dotenv');
env.config();

const sequelize = new Sequelize("yoga", "root", "", {
    dialect: "mysql",
    host: "localhost",
}, {
    pool: {
        max: process.env.POOL_MAX,
        min: process.env.POOL_MIN,
        acquire: process.env.POOL_ACQUIRE,
        idle: process.env.POOL_IDLE
    }
});


(async () => {
    try {
        await sequelize.authenticate();
        console.log("Database Connected!");
    } catch (error) {
        console.log("Couldn't Connect to server!");
        return "Server Error";
    }
})();



module.exports = sequelize;