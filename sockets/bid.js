module.exports = (io) => {
    io.on('connection', (socket) => {
      socket.on('bid', async (data) => {
        const { itemId, userId, bidAmount } = data;
        // Handle the bid logic here and update the database
        // Broadcast the new bid to all connected clients
        io.emit('update', data);
      });
    });
  };
  