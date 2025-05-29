const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Connect DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', require('./routes/submissionRoutes'));

// Root Route
app.get('/', (req, res) => {
    res.send('Learning Portal Backend is running.');
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
