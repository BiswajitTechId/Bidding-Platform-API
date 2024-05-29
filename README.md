# Bidding Platform API

## Setup

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file with the following variables:

DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=yourpassword
DATABASE_NAME=bidding_platform
JWT_SECRET=your_jwt_secret

4. Run database migrations to set up the database schema.
5. Start the server using `npm start` or `npm run dev`.

## API Endpoints

### Users

- `POST /users/register`: Register a new user.
- `POST /users/login`: Authenticate a user and return a token.
- `GET /users/profile`: Get the profile of the logged-in user.

### Items

- `GET /items`: Retrieve all auction items (with pagination).
- `GET /items/:id`: Retrieve a single auction item by ID.
- `POST /items`: Create a new auction item. (Authenticated users, image upload)
- `PUT /items/:id`: Update an auction item by ID. (Authenticated users, only item owners or admins)
- `DELETE /items/:id`: Delete an auction item by ID. (Authenticated users, only item owners or admins)

### Bids

- `GET /items/:itemId/bids`: Retrieve all bids for a specific item.
- `POST /items/:itemId/bids`: Place a new bid on a specific item. (Authenticated users)

### Notifications

- `GET /notifications`: Retrieve notifications for the logged-in user.
- `POST /notifications/mark-read`: Mark notifications as read.

## WebSocket Events

### Bidding

- `connection`: Establish a new WebSocket connection.
- `bid`: Place a new bid on an item.
- `update`: Notify all connected clients about a new bid on an item.

### Notifications

- `notify`: Send notifications to users in real-time.

## Testing

Run tests using `npm test`.

## Additional Features

- Rate limiting middleware to prevent abuse of the API.
- ESLint for code quality.
- Logging for API requests and errors.
- Password reset feature.
- Docker for containerization.
