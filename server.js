
const express = require('express'); 
const connectDB = require('./config/database'); 
require('dotenv').config();


const app = express();


connectDB();


app.use(express.json());

const PORT = process.env.PORT 


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});