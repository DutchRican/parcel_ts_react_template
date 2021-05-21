const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const helmet = require('helmet');

const app = express();

app.use(helmet({
    contentSecurityPolicy: false
}));

app.use('/api', createProxyMiddleware(
    {
        target: 'http://www.example.org',
        changeOrigin: true
    }
));

app.use('/', express.static('dist'))

const port = Number(process.env.PORT || 8080);
app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});