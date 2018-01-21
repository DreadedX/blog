import { graphql, buildSchema } from 'graphql';

var schema = buildSchema(`
	input BlogPostInput {
		title: String
		content: String
	}

	type BlogPost {
		id: Int!
		title: String
		content: String
	}

	type Query {
		getBlogPost(id: Int!): BlogPost
	}

	type Mutation {
		createBlogPost(input: BlogPostInput!): BlogPost
		updateBlogPost(id: Int!, input: BlogPostInput!): BlogPost
	}
`);


module.exports = schema;
