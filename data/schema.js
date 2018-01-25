import { graphql, buildSchema } from 'graphql';

var schema = buildSchema(`
	input BlogPostInput {
		title: String
		content: String
	}

	type BlogPost {
		id: String!
		title: String
		content: String
		image: String
	}

	type Query {
		getBlogPost(id: String!): BlogPost
		getBlogPosts: [BlogPost]
	}

	type Mutation {
		createBlogPost(input: BlogPostInput!): BlogPost
		updateBlogPost(id: String!, input: BlogPostInput!): BlogPost
	}
`);


module.exports = schema;
