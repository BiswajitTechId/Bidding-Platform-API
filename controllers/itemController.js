const Item = require('../models/item');

exports.getAllItems = async (req, res) => {
  const items = await Item.findAll();
  res.send(items);
};

exports.getItemById = async (req, res) => {
  const item = await Item.findByPk(req.params.id);
  if (!item) {
    return res.status(404).send({ error: 'Item not found' });
  }
  res.send(item);
};

exports.createItem = async (req, res) => {
  const { name, description, starting_price, end_time } = req.body;
  try {
    const item = await Item.create({ name, description, starting_price, end_time });
    res.status(201).send(item);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateItem = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'description', 'starting_price', 'end_time'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) {
      return res.status(404).send({ error: 'Item not found' });
    }
    updates.forEach(update => item[update] = req.body[update]);
    await item.save();
    res.send(item);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) {
      return res.status(404).send({ error: 'Item not found' });
    }
    await item.destroy();
    res.send(item);
  } catch (error) {
    res.status(400).send(error);
  }
};
