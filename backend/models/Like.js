const express = require('express');
const router = express.Router();
const Like = require('../models/Like');

router.get('/', async (req, res) => {
    try {
        const likes = await Like.find();
        res.json(likes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
