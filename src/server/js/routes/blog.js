import express from 'express';

import api from 'server/api';
import { toolbar } from 'shared/blots';

const router = express.Router();

router.get('/manage/editor/:id?', (req, res, next) => {
	res.locals.post_id = req.params.id;
	res.locals.toolbar = toolbar;
	res.metatags({title: 'Editor'});
	res.render("blog/editor");
});

router.get('/', (req, res, next) => {
	res.metatags({title: 'Blog'});
	api.getPosts().then((posts) => {
		res.locals.posts = posts.slice(0, 4);
		res.render("blog/overview");
	});
});

router.get('/post/:id', (req, res, next) => {
	api.getPost({id: req.params.id}).then((post) => {
		res.metatags({title: post.title, description: post.preview});

		if (post.image) {
			res.metatags({image: post.image});
		}

		res.locals.post = post
		res.render("blog/post");
	});
});

module.exports = router;
