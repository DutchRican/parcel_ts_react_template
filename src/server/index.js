const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(createProxyMiddleware('/api', {
    target: 'http://localhost:3000'
}));

// app.use(express.static('dist'));
app.use('/', express.static('dist'))

const port = Number(process.env.PORT || 8080);
app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});