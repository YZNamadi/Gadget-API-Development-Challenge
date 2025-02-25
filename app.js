const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());


const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);


const gadgetRoutes = require('./routes/gadgetRoutes');
app.use('/gadgets', gadgetRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
