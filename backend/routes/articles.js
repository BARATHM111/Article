const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const Like = require('../models/Like');
const View = require('../models/View');
const cacheService = require('../services/cacheService');
const notificationService = require('../services/notificationService');

// Middleware to track views
router.use('/:id', async (req, res, next) => {
    try {
        const articleId = req.params.id;
        const userId = req.body.userId; // Assuming userId is available in req.body.userId

        if (userId) {
            await View.create({ userId, articleId });
        }

        cacheService.incrementArticleViews(articleId);
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all articles
router.get('/', async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get an article by ID
router.get('/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.json(article);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new article
router.post('/', async (req, res) => {
    const article = new Article({
        title: req.body.title,
        author: req.body.author,
        body: req.body.body
    });

    try {
        const newArticle = await article.save();
        res.status(201).json(newArticle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Like an article
router.post('/:id/like', async (req, res) => {
    const articleId = req.params.id;
    const userId = req.body.userId; // Assuming userId is available in req.body.userId

    try {
        const like = new Like({ userId, articleId });
        await like.save();

        const article = await Article.findByIdAndUpdate(articleId, { $inc: { likes: 1 } }, { new: true });

        cacheService.incrementArticleLikes(articleId);

        // Send notification
        await notificationService.sendNotification(article.author, articleId, `Your article "${article.title}" was liked by a user.`);

        res.json(article);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
