import { MongoClient, ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import ValidationError from 'server/ValidationError';

import renderDelta from 'server/renderDelta';

import striptags from 'striptags';
import ellipsize from 'ellipsize';

const saltRounds = 10;
// @todo This needs to be replaced with a private key
const secret = 'test';

class UserData {
	constructor({_id, username, email, avatar}) {
		this.id = _id;
		this.username = username;
		this.email = email;
		this.avatar = avatar;
	}

	generateToken() {
		this.token = jwt.sign({id: this.id, name: this.username}, secret);
	}
}

class Post {
	constructor({_id, title, delta, content, preview, image}) {
		this.id = _id;
		this.title = title;
		this.delta = delta;
		this.content = content;
		this.preview = preview;
		this.image = image;
	}
};

// @todo We need to close the client after usage
const getCollection = (name) => {
	return MongoClient.connect(process.env.MONGOURL).then( (client) => {
		return client.db('blog').collection(name);
	});
};

const api = {
	getPosts: () => {
		return getCollection('posts').then((col) => {
			return col.find({});
		}).then((result) => {
			return result.toArray();
		}).then((result) => {
			return result.map((post) => {
				return new Post(post);
			});
		}).catch((err) => {
			console.log(err);
		});
	},
	getPost: ({id}) => {
		return getCollection('posts').then((col) => {
			return col.findOne({_id: ObjectId(id)})
		}).then((result) => {
			if (result) {
				return new Post(result);
			}
			return null;
		}).catch((err) => {
			console.log(err);
		});
	},
	createPost: ({input}) => {
		return renderDelta(input.delta).then((result) => {
			input.content = result;
			input.preview = ellipsize(striptags(result), 200);
			return getCollection('posts');
		}).then((col) => {
			return col.insertOne(input);
		}).then((result) => {
			return new Post(result.ops[0]);
		}).catch((err) => {
			console.log(err);
		});
	},
	// Make sure we only update the provided fields
	updatePost: ({id, input}) => {
		return renderDelta(input.delta).then((result) => {
			input.content = result;
			input.preview = ellipsize(striptags(result), 200);
			return getCollection('posts');
		}).then((col) => {
			return col.findOneAndUpdate({_id: ObjectId(id)}, input, {
				returnOriginal: false
			});
		}).then((result) => {
			return new Post(result.value);
		}).catch((err) => {
			console.log(err);
		});
	},
	// @todo we want to make sure we can really only call this from our own domain, other sites will have to use our login form
	loginUser: ({input}) => {
		let errors = [];

		if (validator.isEmpty(input.username)) {
			errors.push({key: 'username', message: 'No username provided.'});
		} else if (!validator.isAscii(input.username)) {
			errors.push({key: 'username', message: 'Username can only contain ASCII characters.'});
		}

		if (validator.isEmpty(input.password)) {
			errors.push({key: 'password', message: 'No password provided.'});
		} else if (!validator.isAscii(input.password)) {
			errors.push({key: 'username', message: 'Password can only contain ASCII characters.'});
		} else if (!validator.isLength(input.password, {min: 0, max: 72})) {
			errors.push({key: 'password', message: 'The password exceeds the length of 72 characters.'});
		}

		if (errors.length) {
			throw new ValidationError(errors);
		}

		return getCollection('users').then((col) => {
			return col.findOne({username: input.username})
		}).then((user) => {
			if (user) {
				return bcrypt.compare(input.password, user.hash).then((res) => {
					if (res) {
						let userData = new UserData(user);
						userData.generateToken();
						return userData;
					} else {
						return null
					}
				});
			}
			return null;
		}).catch((err) => {
			console.log(err);
		});
	},
	createUser: ({input}) => {
		let errors = [];

		if (validator.isEmpty(input.username)) {
			errors.push({key: 'username', message: 'No username provided.'});
		} else if (!validator.isAscii(input.username)) {
			errors.push({key: 'username', message: 'Username can only contain ASCII characters.'});
		}

		if (validator.isEmpty(input.password)) {
			errors.push({key: 'password', message: 'No password provided.'});
		} else if (!validator.isAscii(input.password)) {
			errors.push({key: 'username', message: 'Password can only contain ASCII characters.'});
		} else if (!validator.isLength(input.password, {min: 0, max: 72})) {
			errors.push({key: 'password', message: 'The password exceeds the length of 72 characters.'});
		}

		if (!validator.isEmail(input.email)) {
			errors.push({key: 'email', message: 'No valid email provided.'});
		}

		if (errors.length) {
			throw new ValidationError(errors);
		}

		// @todo Make sure we check if no user with the name and/or user does not already exists
		return bcrypt.hash(input.password, saltRounds).then((hash) => {
			input.hash = hash;
			delete input.password;

			return getCollection('users');
		}).then((col) => {
			return col.insertOne(input);
		}).then( (result) => {
			let userData = new UserData(result.ops[0]);
			userData.generateToken();
			return userData;
		}).catch((err) => {
			console.log(err);
		});
	}
};

module.exports = api;
