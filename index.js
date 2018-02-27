import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import sassMiddleware from 'node-sass-middleware';
import babelify from 'express-babelify-middleware';
import jwt from 'express-jwt';

import metaTags from './src/server/js/middleware/meta-tags';
import blog from './src/server/js/routes/blog';
import api from './src/server/js/routes/api';

const app = express();

app.set('trust proxy', 'loopback');

app.set('views', path.join(__dirname, 'src', 'server', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(sassMiddleware({
	src: path.join(__dirname, 'src', 'client', 'sass'),
	dest: path.join(__dirname, 'public', 'css'),
	debug: true,
	outputStyle: 'compressed',
	prefix: '/css'
}));

app.use(express.static(path.join(__dirname, 'public')));

// @todo We need to use RSA
app.use(jwt({
	secret: 'test',
	resultProperty: 'locals.user',
	credentialsRequired: false,
	getToken: (req) => {
		if (req.cookies.token) {
			return req.cookies.token;
		}
		return null;
	},
}));

app.use((err, req, res, next) => {
	if (err.name === "UnauthorizedError") {
		// Just show the logged out version of the page
		err = null;
		// Tell the client to remove the invalid cookie
		res.append('Set-Cookie', 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=-1;');
	}
	next(err);
});

const shared = ['materialize-css'];
app.use('/js/bundle.js', babelify(shared));

app.use('/js/quill.js', babelify(['quill/dist/quill.core']));
shared.push('quill/dist/quill.core');

app.use('/js/axios.js', babelify(['axios'], {external: shared}));
shared.push('axios');

app.use('/js/main.js', babelify(path.join(__dirname, 'src', 'client', 'js', 'main.js'), {external: shared}));
app.use('/js/login.js', babelify(path.join(__dirname, 'src', 'client', 'js', 'login.js'), {external: shared}));
app.use('/js/editor.js', babelify(path.join(__dirname, 'src', 'client', 'js', 'editor.js'), {external: shared}));

app.use((req, res, next) => {
	res.locals.originalUrl = req.originalUrl;
	next();
});

// @todo We really need to get all of this from a database
// Set the default tags for the site
app.use(metaTags({
	viewport: 'width=device-width, initial-scale=1.0',
	description: 'Dit is de persoonlijke website van Helma Koot',
	keyword: 'Helma, Koot, Office, Management, Blog', 
	author: 'Helma Koot',
	creator: '@HelmaKoot',
	locale: 'nl_NL'
}));

app.use('/blog', blog);
app.use('/api', api);

// Redirect users to the blog until we actually have a homepage
app.get('/', (req, res, next) => {
	res.redirect('/blog');
});

app.use((req, res, next) => {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: req.app.get('env') === 'development' ? err : {}
	})
});

module.exports = app;
