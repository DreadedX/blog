import express from 'express';
import GraphQLHTTP from 'express-graphql';
import schema from '../data/schema';
import api from '../data/api';

const router = express.Router();

router.use('/', GraphQLHTTP({
	schema,
	rootValue: api,
	graphiql: true
}));

module.exports = router;
