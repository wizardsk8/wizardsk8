# Little Hoopers - Technical Documentation

## System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Website │    │  React Mobile   │    │   Admin Panel   │
│                 │    │      App        │    │   (Future)      │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────▼───────────┐
                    │     Express.js API      │
                    │   (Node.js Backend)     │
                    └─────────────┬───────────┘
                                  │
                    ┌─────────────▼───────────┐
                    │   PostgreSQL Database   │
                    │    (All Data Storage)   │
                    └─────────────────────────┘
```

## Database Schema Details

### Users Table
```sql
CREATE TABLE "User" (
  userid SERIAL PRIMARY KEY,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  role VARCHAR(20) NOT NULL
);
```

### Players Table
```sql
CREATE TABLE "Player" (
  playerid SERIAL PRIMARY KEY,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  birthdate DATE NOT NULL,
  gender CHAR(1) NOT NULL,
  parentid INTEGER REFERENCES "User"(userid),
  level VARCHAR(20) NOT NULL
);
```

### Coaches Table
```sql
CREATE TABLE "Coach" (
  coachid SERIAL PRIMARY KEY,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(15) NOT NULL,
  certification VARCHAR(100),
  experienceyears INTEGER
);
```

### Training Sessions Table
```sql
CREATE TABLE "TrainingSession" (
  sessionid SERIAL PRIMARY KEY,
  sessionname VARCHAR(100) NOT NULL,
  level VARCHAR(20) NOT NULL,
  coachid INTEGER REFERENCES "Coach"(coachid),
  date DATE NOT NULL,
  time TIME NOT NULL,
  duration INTEGER NOT NULL,
  location VARCHAR(100) NOT NULL
);
```

### Registrations Table
```sql
CREATE TABLE "Registration" (
  registrationid SERIAL PRIMARY KEY,
  sessionid INTEGER REFERENCES "TrainingSession"(sessionid),
  playerid INTEGER REFERENCES "Player"(playerid),
  dateregistered DATE NOT NULL
);
```

### Feedback Table
```sql
CREATE TABLE "Feedback" (
  feedbackid SERIAL PRIMARY KEY,
  sessionid INTEGER REFERENCES "TrainingSession"(sessionid),
  playerid INTEGER REFERENCES "Player"(playerid),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comments TEXT,
  dateprovided DATE NOT NULL
);
```

### Franchises Table
```sql
CREATE TABLE "Franchise" (
  franchiseid SERIAL PRIMARY KEY,
  franchisename VARCHAR(100) NOT NULL,
  location VARCHAR(100) NOT NULL,
  contactperson VARCHAR(100) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  email VARCHAR(100) NOT NULL
);
```

### Facilities Table
```sql
CREATE TABLE "Facility" (
  facilityid SERIAL PRIMARY KEY,
  facilityname VARCHAR(100) NOT NULL,
  address VARCHAR(200) NOT NULL,
  capacity INTEGER NOT NULL,
  franchiseid INTEGER REFERENCES "Franchise"(franchiseid)
);
```

### Equipment Table
```sql
CREATE TABLE "Equipment" (
  equipmentid SERIAL PRIMARY KEY,
  equipmentname VARCHAR(100) NOT NULL,
  quantity INTEGER NOT NULL,
  condition VARCHAR(50) NOT NULL,
  facilityid INTEGER REFERENCES "Facility"(facilityid)
);
```

## API Documentation

### Base URL
```
https://3001-ind3nsipohmaeezrlo3hd-137c0c1b.manusvm.computer/api
```

### Authentication
Currently, the API is open for development. In production, implement JWT tokens:
```javascript
headers: {
  'Authorization': 'Bearer <jwt_token>',
  'Content-Type': 'application/json'
}
```

### User Management

#### Get All Users
```http
GET /api/users
```

#### Get User by ID
```http
GET /api/users/:id
```

#### Create User
```http
POST /api/users
Content-Type: application/json

{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "role": "parent"
}
```

#### Update User
```http
PUT /api/users/:id
Content-Type: application/json

{
  "firstname": "John",
  "lastname": "Smith",
  "email": "johnsmith@example.com"
}
```

#### Delete User
```http
DELETE /api/users/:id
```

### Player Management

#### Get All Players
```http
GET /api/players
```

#### Create Player
```http
POST /api/players
Content-Type: application/json

{
  "firstname": "Alex",
  "lastname": "Johnson",
  "birthdate": "2015-03-15",
  "gender": "M",
  "parentid": 1,
  "level": "Young Shooters"
}
```

### Coach Management

#### Get All Coaches
```http
GET /api/coaches
```

#### Create Coach
```http
POST /api/coaches
Content-Type: application/json

{
  "firstname": "Mike",
  "lastname": "Johnson",
  "email": "mike@littlehoopers.com",
  "phone": "555-123-4567",
  "certification": "USA Basketball Certified",
  "experienceyears": 8
}
```

### Training Session Management

#### Get All Sessions
```http
GET /api/trainingSessions
```

#### Create Session
```http
POST /api/trainingSessions
Content-Type: application/json

{
  "sessionname": "Young Shooters Training",
  "level": "Young Shooters",
  "coachid": 1,
  "date": "2024-07-10",
  "time": "16:00:00",
  "duration": 60,
  "location": "Court A"
}
```

### Registration Management

#### Get All Registrations
```http
GET /api/registrations
```

#### Register Player for Session
```http
POST /api/registrations
Content-Type: application/json

{
  "sessionid": 1,
  "playerid": 1,
  "dateregistered": "2024-07-08"
}
```

### Feedback Management

#### Get All Feedback
```http
GET /api/feedbacks
```

#### Submit Feedback
```http
POST /api/feedbacks
Content-Type: application/json

{
  "sessionid": 1,
  "playerid": 1,
  "rating": 5,
  "comments": "Great session! Alex improved a lot.",
  "dateprovided": "2024-07-08"
}
```

## Environment Configuration

### Backend (.env file)
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=little_hoopers
DB_USER=postgres
DB_PASSWORD=Kelito12
PORT=3001
NODE_ENV=production
```

### Database Connection
```javascript
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false
  }
);
```

## Deployment Instructions

### Backend Deployment
1. Ensure PostgreSQL is running
2. Install dependencies: `npm install`
3. Set environment variables
4. Start server: `npm start`
5. Verify health: `curl /api/health`

### Frontend Deployment
1. Build React app: `npm run build`
2. Deploy dist folder to static hosting
3. Configure environment variables for API URL

### Database Setup
1. Install PostgreSQL
2. Create database: `CREATE DATABASE little_hoopers;`
3. Run migrations: `npm run migrate` (if using migrations)
4. Seed initial data: `npm run seed` (if using seeders)

## Error Handling

### API Error Responses
```json
{
  "error": "Error message",
  "status": 400,
  "timestamp": "2024-07-08T16:00:00Z"
}
```

### Common HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

## Security Considerations

### Production Checklist
- [ ] Implement JWT authentication
- [ ] Add rate limiting
- [ ] Enable HTTPS only
- [ ] Validate all inputs
- [ ] Sanitize database queries
- [ ] Add request logging
- [ ] Implement CSRF protection
- [ ] Add API versioning

### CORS Configuration
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

## Performance Optimization

### Database Indexing
```sql
CREATE INDEX idx_player_parentid ON "Player"(parentid);
CREATE INDEX idx_session_coachid ON "TrainingSession"(coachid);
CREATE INDEX idx_registration_sessionid ON "Registration"(sessionid);
CREATE INDEX idx_registration_playerid ON "Registration"(playerid);
```

### API Caching
Implement Redis for session caching:
```javascript
const redis = require('redis');
const client = redis.createClient();

// Cache frequently accessed data
app.get('/api/coaches', async (req, res) => {
  const cached = await client.get('coaches');
  if (cached) {
    return res.json(JSON.parse(cached));
  }
  // Fetch from database and cache
});
```

## Monitoring and Logging

### Health Check Endpoint
```javascript
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});
```

### Request Logging
```javascript
const morgan = require('morgan');
app.use(morgan('combined'));
```

## Testing

### API Testing with curl
```bash
# Test health endpoint
curl https://3001-ind3nsipohmaeezrlo3hd-137c0c1b.manusvm.computer/api/health

# Test user creation
curl -X POST \
  https://3001-ind3nsipohmaeezrlo3hd-137c0c1b.manusvm.computer/api/users \
  -H 'Content-Type: application/json' \
  -d '{"firstname":"Test","lastname":"User","email":"test@example.com","password":"password","role":"parent"}'
```

### Frontend Testing
1. Open website: https://wbjmmoyi.manus.space
2. Test navigation and responsiveness
3. Open mobile app: https://fdhzlpmk.manus.space
4. Test mobile interface and touch interactions

This technical documentation provides all the necessary information for developers to understand, maintain, and extend the Little Hoopers system.

