const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: String,
    author: String,
    body: String,
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 }
});

module.exports = mongoose.model('Article', articleSchema);
