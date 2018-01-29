import express from 'express';
import ellipsize from 'ellipsize';

import api from '../api';

const router = express.Router();

router.get('/manage/editor', (req, res, next) => {
	res.locals.toolbar = [
		{name: 'section', icon_name: 'title', handler: 'toggleAttribute'},
		{name: 'bold', icon_name: 'format_bold', handler: 'toggleAttribute'},
		{name: 'italic', icon_name: 'format_italic', handler: 'toggleAttribute'},
		{name: 'underline', icon_name: 'format_underline', handler: 'toggleAttribute'},
		{name: 'strike', icon_name: 'format_strikethrough', handler: 'toggleAttribute'},
		{name: 'blockquote', icon_name: 'format_quote', handler: 'toggleAttribute'},

		{name: 'link', icon_name: 'insert_link', handler: 'temp'},
		{name: 'photo', icon_name: 'insert_photo', handler: 'temp'},
		{name: 'video', icon_name: 'movie', handler: 'temp'},
	];
	res.metatags({title: 'Editor'});
	res.render("blog/editor");
});

router.get('/', (req, res, next) => {
	res.metatags({title: 'Blog'});
	api.getPosts().then((posts) => {
		res.locals.posts = posts.slice(0, 4);
		res.locals.posts.forEach((post) => {
			post.content = ellipsize(post.content, 200);
		});
		res.render("blog/overview");
	});
});

router.get('/post/:id', (req, res, next) => {
	api.getPost({id: req.params.id}).then((post) => {
		res.metatags({title: post.title, description: post.content});

		if (post.image) {
			res.metatags({image: post.image});
		}

		res.locals.post = post
		res.render("blog/post");
	});
});

module.exports = router;
