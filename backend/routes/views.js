const express = require('express');
const router = express.Router();
const View = require('../models/View');

router.get('/', async (req, res) => {
    try {
        const views = await View.find();
        res.json(views);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
