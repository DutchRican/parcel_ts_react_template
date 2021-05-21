const express = require('express');
const http = require('http');
const https = require('https');
const { readFileSync } = require('fs');
const path = require('path');
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

app.use('/', express.static(path.join(__dirname, '..', '..', 'dist')))

const port = Number(process.env.PORT || 8080);
const sslPort = Number(process.env.PORT || 4443);

const httpServer = http.createServer(app);
httpServer.listen(port, () => {
    console.log(`🚀 listening on port: ${port}`);
});

let httpsServer
try {
    httpsServer = https.createServer({
        key: readFileSync(path.join(__dirname, 'certs', 'server.key')),
        cert: readFileSync(path.join(__dirname, 'certs', 'server.cert'))
    }, app);
    httpsServer.listen(sslPort, () => {
        console.log(`🚀 listening on port: ${sslPort}`);
    });
    httpsServer.on('SIGINT', shutdown);
} catch (e){
    console.log('Could not start https server: ', e)
}

httpServer.on('SIGINT', shutdown);

function shutdown(server) {
    server.close(() => console.log('shutting down ..'));
}
