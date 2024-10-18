const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');
require('dotenv').config();

const connectDB = require('./src/config/database/db.config');
const swaggerConfig = require('./src/config/swagger/swagger');
const configureCors = require('./src/config/cors/cors.config');
const configureProxy = require('./src/config/proxy/proxy.config');

const app = express();
app.set('view engine', 'ejs');

// Kết nối DB
connectDB();

// Use express
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());

// Cấu hình CORS
configureCors(app);

// Cấu hình Proxy
configureProxy(app);

// Định nghĩa route
router(app);

// Swagger
swaggerConfig(app);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Khởi động server
const PORT = process.env.PORT || 4003;
app.listen(PORT, () => {
  console.log(`Server is running at ${process.env.HOST}:${PORT}`);
});

module.exports = app;
