const mongoose = require('mongoose');

// Assuming you have a MongoDB connection established elsewhere in your app

// Create a schema for the cached article
const CachedArticleSchema = new mongoose.Schema({
  articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now, expires: 3600 } // TTL index for expiration after 1 hour
});

const CachedArticle = mongoose.model('CachedArticle', CachedArticleSchema);

async function cacheArticle(article) {
  await CachedArticle.findOneAndUpdate(
    { articleId: article._id },
    { likes: article.likes, views: article.views },
    { upsert: true, new: true }
  );
}

async function getCachedArticle(articleId) {
  const cachedArticle = await CachedArticle.findOne({ articleId });
  return cachedArticle ? { likes: cachedArticle.likes, views: cachedArticle.views } : null;
}

async function incrementLikes(articleId) {
  await CachedArticle.findOneAndUpdate(
    { articleId },
    { $inc: { likes: 1 } },
    { upsert: true }
  );
}

async function incrementViews(articleId) {
  await CachedArticle.findOneAndUpdate(
    { articleId },
    { $inc: { views: 1 } },
    { upsert: true }
  );
}

module.exports = {
  cacheArticle,
  getCachedArticle,
  incrementLikes,
  incrementViews
};