const expressSwagger = require('express-swagger-generator');

const swaggerConfig = (app) => {
  const options = {
    swaggerDefinition: {
      info: {
        description: '',
        title: 'Du An',
        version: '1.0.0',
      },
      host: process.env.HOST + ':' + process.env.PORT,
      basePath: '/api',
      produces: ['application/json'],
      schemes: ['http', 'https'],
      securityDefinitions: {
        JWT: {
          type: 'apiKey',
          in: 'header',
          name: 'x-access-token',
          description: 'Bearer + access_token',
        },
      },
    },
    basedir: __dirname,
    files: ['./app/**/*.js'], // Adjust the path to your actual structure
  };
  
  expressSwagger(app)(options);
};

module.exports = swaggerConfig;