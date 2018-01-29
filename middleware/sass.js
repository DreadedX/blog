import path from 'path';
import sassMiddleware from 'node-sass-middleware';

let middleware = sassMiddleware({
	src: path.join(__dirname, '..', 'client', 'sass'),
	dest: path.join(__dirname, '..', 'public', 'css'),
	debug: true,
	outputStyle: 'compressed',
	prefix: '/css'
});

module.exports = middleware;
