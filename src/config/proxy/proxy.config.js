const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const configureProxy = (app) => {
  if (process.env.HTTP_PROXY_MIDDLEWARE) {
    const options = {
      target: process.env.HTTP_PROXY_MIDDLEWARE,
      changeOrigin: true,
      ws: true,
      pathRewrite: {
        '^/': '',
      },
    };
    const httpProxyMiddleware = createProxyMiddleware(options);
    app.use(httpProxyMiddleware);
  }
};

module.exports = configureProxy;
