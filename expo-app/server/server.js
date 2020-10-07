const next = require('next');
const { createSecureServer } = require('http2');
const { readFileSync } = require('fs');

const port = parseInt(process.env.PORT, 10) || 3000;
const hostname = process.env.HOST || 'localhost';
const dev = process.env.NODE_ENV !== 'production';

// Init the Next app:
const app = next({ dev, conf: { compress: false } });

// Create the secure HTTPS server:
// Don't forget to create the keys for your development
const server = createSecureServer({
	key: readFileSync('./ssl/localhost.key'),
	cert: readFileSync('./ssl/localhost.crt'),
	ca: readFileSync('./ssl/ca.pem'),
});

app.prepare().then(() => {
	server.on('error', (err) => console.error(err));

	// Process the various routes based on `req`
	// `/`      -> Render index.js
	// `/about` -> Render about.js
	server.on('request', (req, res) => {
		switch (req.url) {
			case '/about':
				return app.render(req, res, '/about', req.query);
			default:
				return app.render(req, res, '/', req.query);
		}
	});

	server.listen(port, hostname);

	console.log(`Listening at https://localhost:${port}`);
});
