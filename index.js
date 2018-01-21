import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import lessMiddleware from 'less-middleware';
import babelify from 'express-babelify-middleware';

import blog from './routes/blog';
import api from './routes/api';

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.set(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'client', 'less'), {
	dest: path.join(__dirname, 'public'),
	preprocess: {
		path: (pathName, req) => {
			return pathName.replace(path.sep + 'css' + path.sep, path.sep);
		}
	},
	debug: true
}));
app.use(express.static(path.join(__dirname, 'public')));

const shared = ['materialize-css'];
app.use('/js/bundle.js', babelify(shared));

app.use('/js/quill.js', babelify([{'quill/dist/quill.core': {expose: 'quill'} }]));
shared.push('quill');

app.use('/js', babelify(__dirname + '/client/js', {external: shared}));

app.use('/blog', blog);
app.use('/api', api);

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
