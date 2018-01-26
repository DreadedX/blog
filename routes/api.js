import express from 'express';
import GraphQLHTTP from 'express-graphql';
import schema from '../data/schema';
import api from '../data/api';

const router = express.Router();

router.get('/login', (req, res, next) => {
	console.log(req.originalUrl);
	res.locals.redirect_uri = req.query.redirect_uri || '/';
	if (res.locals.user) {
		return res.redirect(res.locals.redirect_uri);
	}
	res.render("login");
});

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
