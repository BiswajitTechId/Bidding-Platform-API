const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const itemRoutes = require('./routes/item');
const bidRoutes = require('./routes/bid');
const notificationRoutes = require('./routes/notification');
const db = require('./models');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

require('./sockets/bid')(io);

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Bidding Platform API');
});

app.use('/users', userRoutes);
app.use('/items', itemRoutes);
app.use('/items', bidRoutes);
app.use('/notifications', notificationRoutes);

const port = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
