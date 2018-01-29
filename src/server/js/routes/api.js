import express from 'express';
import GraphQLHTTP from 'express-graphql';
import { buildSchema } from 'graphql';
import fs from 'fs';
import path from 'path';
import api from '../api';

const router = express.Router();

router.get('/login', (req, res, next) => {
	console.log(req.originalUrl);
	res.locals.redirect_uri = req.query.redirect_uri || '/';
	if (res.locals.user) {
		return res.redirect(res.locals.redirect_uri);
	}
	res.render("login");
});

let schema = buildSchema(fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'));

router.use('/', GraphQLHTTP({
	schema,
	rootValue: api,
	graphiql: true,
	formatError: (error) => ({
		message: error.message,
		state: error.originalError && error.originalError.state,
		locations: error.locations,
		path: error.path
	})
}));

module.exports = router;
