#!/usr/bin/env python3
"""
Simple HTTP server with CORS support for local development
Run: python server.py
"""

import http.server
import socketserver
import urllib.request
import urllib.parse
import json
from urllib.error import URLError

PORT = 3000

class CORSRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        if self.path == '/':
            self.path = '/BYFORCE-2026.html'
        super().do_GET()

    def do_POST(self):
        # Proxy API requests
        if self.path.startswith('/api/'):
            api_path = self.path.replace('/api/', '')
            url = f'https://rxid.co.uk/{api_path}'
            
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            
            try:
                req = urllib.request.Request(url, data=post_data, headers={
                    'Content-Type': 'application/json'
                })
                with urllib.request.urlopen(req) as response:
                    self.send_response(200)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    self.wfile.write(response.read())
            except URLError as e:
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': str(e)}).encode())
        else:
            super().do_GET()

if __name__ == "__main__":
    with socketserver.TCPServer(("", PORT), CORSRequestHandler) as httpd:
        print(f"\n🚀 Development server running at http://localhost:{PORT}")
        print(f"📁 Serving files from: {__file__}")
        print(f"\n💡 Open your browser and go to: http://localhost:{PORT}\n")
        httpd.serve_forever()

