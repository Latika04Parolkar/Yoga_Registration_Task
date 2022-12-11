const Sequelize = require('sequelize');
const env = require('dotenv');
env.config();

const sequelize = new Sequelize(process.env.DB_URI);

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