const Bid = require('../models/bid');
const Item = require('../models/item');

exports.getBidsByItem = async (req, res) => {
  const bids = await Bid.findAll({ where: { item_id: req.params.itemId } });
  res.send(bids);
};

exports.placeBid = async (req, res) => {
  const { bid_amount } = req.body;
  const itemId = req.params.itemId;
  const userId = req.user.id;

  try {
    const item = await Item.findByPk(itemId);
    if (!item) {
      return res.status(404).send({ error: 'Item not found' });
    }
    if (bid_amount <= item.current_price) {
      return res.status(400).send({ error: 'Bid amount must be higher than current price' });
    }
    const bid = await Bid.create({ item_id: itemId, user_id: userId, bid_amount });
    item.current_price = bid_amount;
    await item.save();
    res.status(201).send(bid);
  } catch (error) {
    res.status(400).send(error);
  }
};
