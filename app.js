var express = require("express");
const fs = require('fs');
var session = require('express-session');
var bodyParser = require('body-parser');
var router = require('./router');
const cors = require('cors');
const createProxyMiddleware = require('http-proxy-middleware');

if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}

var app = express();
app.set("view engine", "ejs");

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/duAn")
  .then(() => console.log(">>>>>>>>>> DB Connected!!!!!!"))
  .catch((err) => console.log(">>>>>>>>> DB Error: ", err));

require('dotenv').config();
app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }));  
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());

const corsOptions = {
  origin: process.env.CORS_OPTIONS,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));

if (process.env.HTTP_PROXY_MIDDLEWARE) {
  const options = {
      target: process.env.HTTP_PROXY_MIDDLEWARE,
      changeOrigin: true,
      ws: true,
      pathRewrite: {
          '^/': ''
      }
  };
  const httpProxyMiddleware = createProxyMiddleware(options);
  app.use(httpProxyMiddleware);
}

router(app);

app.get('/test-cors', (req, res) => {
  res.json({ message: 'CORS is working!' });
});

const options = {
  swaggerDefinition: {
      info: {
          description: '',
          title: 'Du An',
          version: '1.0.0'
      },
      host: process.env.HOST + ':' + process.env.PORT,
      basePath: '/api',
      produces: [
          'application/json'
      ],
      schemes: ['http', 'https'],
      securityDefinitions: {
          JWT: {
              type: 'apiKey',
              in: 'header',
              name: 'x-access-token',
              description: 'Bearer + access_token'
          }
      }
  },
  basedir: __dirname,
  files: ['./app/**/*.js']
};
const expressSwagger = require('express-swagger-generator')(app);
expressSwagger(options);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});




app.listen(process.env.PORT || 4003 , () => {
  console.log('Server is running with url ' + process.env.HOST + ':' + process.env.PORT);
});

module.exports = app;
