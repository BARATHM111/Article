const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const articles = require('./routes/articles');
const users = require('./routes/users');
const likes = require('./routes/likes');
const views = require('./routes/views');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://barathm111:JecbS8qUdp7s5Qzp@cluster0.ki5yp65.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

// Routes
app.use('/articles', articles);
app.use('/users', users);
app.use('/likes', likes);
app.use('/views', views);

// Handle root route (optional)
app.get('/', (req, res) => {
    res.send('Welcome to the Article System API');
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
