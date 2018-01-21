import express from 'express';
import GraphQLHTTP from 'express-graphql';
import { MongoClient } from 'mongodb';

import schema from './data/schema'

const router = express.Router();

let db;
MongoClient.connect(process.env.MONGOURL, (err, client) => {
	if (err) {
		return console.log(err);
	}

	db = client.db('blog');
	// client.close();

	router.use('/', GraphQLHTTP({
		schema,
		rootValue: root,
		graphiql: true
	}));

});

class BlogPost {
	constructor(id, {title, content}) {
		this.id = id;
		this.title = title;
		this.content = content;
	}
};

var root = {
	getBlogPost: ({id}) => {
		return new BlogPost(id, {title: 'Test', content: 'Hello world!'});
	},
	createBlogPost: ({input}, request) => {
		db.collection('posts').save(input), (err, result) => {
			if (err) {
				return console.log(err);
			}

			console.log(result);
		}
		return new BlogPost(4, input);
	},
	updateBlogPost: ({id, input}) => {
		return new BlogPost(id, input);
	},
};

module.exports = router;
