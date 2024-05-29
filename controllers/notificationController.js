const Notification = require('../models/notification');

exports.getNotifications = async (req, res) => {
  const notifications = await Notification.findAll({ where: { user_id: req.user.id } });
  res.send(notifications);
};

exports.markAsRead = async (req, res) => {
  try {
    await Notification.update({ is_read: true }, { where: { user_id: req.user.id, is_read: false } });
    res.send({ message: 'Notifications marked as read' });
  } catch (error) {
    res.status(400).send(error);
  }
};
