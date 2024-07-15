const Notification = require('../models/Notification');

async function createNotification(user, article, io) {
  const notification = new Notification({
    user: user._id,
    article: article._id,
    message: `Your article "${article.title}" has received a new like!`
  });
  await notification.save();
  
  // Emit the notification to the user via WebSocket
  io.emit('newNotification', notification);
}

module.exports = {
  createNotification
};