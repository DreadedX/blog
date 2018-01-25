import { MongoClient, ObjectId } from 'mongodb';

class BlogPost {
	constructor({_id, title, content, image}) {
		this.id = _id;
		this.title = title;
		this.content = content;
		this.image = image;
	}
};

const getCollection = () => {
	return MongoClient.connect(process.env.MONGOURL).then( (client) => {
		return client.db('blog').collection('posts');
	});
};

const api = {
	getBlogPosts: () => {
		return getCollection().then((col) => {
			return col.find({});
		}).then((result) => {
			return result.toArray();
		}).then((array) => {
			return array.map((post) => {
				return new BlogPost(post);
			});
		});
	},
	getBlogPost: ({id}) => {
		return getCollection().then((col) => {
			return col.findOne({_id: ObjectId(id)})
		}).then((result) => {
			return new BlogPost(result);
		});
	},
	createBlogPost: ({input}) => {
		return getCollection().then((col) => {
			return col.insertOne(input);
		}).then( (result) => {
			return new BlogPost(result.ops[0]);
		});
	},
	updateBlogPost: ({id, input}) => {
		return getCollection().then((col) => {
			return col.findOneAndUpdate({_id: ObjectId(id)}, input, {
				returnOriginal: false
			});
		}).then((result) => {
			return new BlogPost(result.value);
		});
	},
};

module.exports = api;
