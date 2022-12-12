const Sequelize = require('sequelize');
const env = require('dotenv');
env.config();

const sequelize = new Sequelize(process.env.DB_URI, {
    pool: {
        max: process.env.POOL_MAX,
        min: process.env.POOL_MIN,
        idle: process.env.POOL_IDLE
      }
});

async () => {
    try {
        await sequelize.authenticate();
        console.log("Database Connected!");
    } catch (error) {
        console.log("Couldn't Connect to server!");
        return "Server Error";
    }
};



module.exports = sequelize;