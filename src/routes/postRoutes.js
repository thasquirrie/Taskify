const express = require('express');
const { fetchPosts } = require('../controllers/postController');
const router = express.Router();

router.get('/', fetchPosts);

module.exports = router;
