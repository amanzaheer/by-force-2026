// Simple local development server with CORS proxy
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
};

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    // CORS headers for all responses
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Proxy API requests to rxid.co.uk
    if (req.url.startsWith('/api/')) {
        const apiPath = req.url.replace('/api/', '');
        console.log(`[PROXY] ${req.method} ${apiPath}`);

        const options = {
            hostname: 'rxid.co.uk',
            port: 443,
            path: '/' + apiPath,
            method: req.method,
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0'
            }
        };

        if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                console.log(`[PROXY] Request body: ${body}`);
                options.headers['Content-Length'] = Buffer.byteLength(body);

                const proxyReq = require('https').request(options, (proxyRes) => {
                    let responseData = '';
                    proxyRes.on('data', (chunk) => {
                        responseData += chunk;
                    });
                    proxyRes.on('end', () => {
                        console.log(`[PROXY] Response status: ${proxyRes.statusCode}`);
                        console.log(`[PROXY] Response: ${responseData.substring(0, 200)}`);
                        res.writeHead(proxyRes.statusCode, {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                            'Access-Control-Allow-Headers': 'Content-Type',
                            'Content-Type': proxyRes.headers['content-type'] || 'application/json'
                        });
                        res.end(responseData);
                    });
                });

                proxyReq.on('error', (e) => {
                    console.error(`[PROXY] Error: ${e.message}`);
                    res.writeHead(500, {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    });
                    res.end(JSON.stringify({ error: e.message, status: 'error' }));
                });

                if (body) {
                    proxyReq.write(body);
                }
                proxyReq.end();
            });
        } else {
            const proxyReq = require('https').request(options, (proxyRes) => {
                let responseData = '';
                proxyRes.on('data', (chunk) => {
                    responseData += chunk;
                });
                proxyRes.on('end', () => {
                    res.writeHead(proxyRes.statusCode, {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': proxyRes.headers['content-type'] || 'application/json'
                    });
                    res.end(responseData);
                });
            });
            proxyReq.on('error', (e) => {
                console.error(`[PROXY] Error: ${e.message}`);
                res.writeHead(500, {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify({ error: e.message, status: 'error' }));
            });
            proxyReq.end();
        }
        return;
    }

    // Serve static files
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './BYFORCE-2026.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - File Not Found</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`, 'utf-8');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`\n🚀 Development server running at http://localhost:${PORT}`);
    console.log(`📁 Serving files from: ${__dirname}`);
    console.log(`\n💡 Open your browser and go to: http://localhost:${PORT}\n`);
});

