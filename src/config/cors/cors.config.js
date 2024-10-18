const cors = require('cors');

const configureCors = (app) => {
  const corsOptions = {
    origin: process.env.CORS_OPTIONS || '*',  // Để mặc định là tất cả các nguồn
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Các method được phép
    credentials: true,  // Cho phép gửi cookie qua CORS
  };

  app.use(cors(corsOptions));
};

module.exports = configureCors;
