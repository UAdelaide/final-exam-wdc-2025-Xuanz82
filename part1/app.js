const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// Routes
const dogRoutes = require('./routes/dogRoutes');
const walkrequestRoutes = require('./routes/walkrequestRoutes');
const walkerRoutes = require('./routes/walkerRoutes');

app.use('/api/dogs', dogRoutes);
app.use('/api/walkrequests', walkrequestRoutes);
app.use('/api/walkers', walkerRoutes);

// Export the app instead of listening here
module.exports = app;