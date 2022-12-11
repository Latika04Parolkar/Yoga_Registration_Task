const express = require('express');
const cors = require('cors');
const env = require('dotenv');
env.config();
require('./config/db');
require('./models/customer');
require('./models/payment');

const addCustomer = require("./routes/addCustomer")
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(addCustomer)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`listening on : ${PORT}`));