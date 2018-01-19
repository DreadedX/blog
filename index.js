import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import babelify from 'express-babelify-middleware';

import blog from './routes/blog';

let app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.set(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/js', babelify(__dirname + '/client'));

app.use('/blog', blog);

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
