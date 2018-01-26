import express from 'express';
import api from '../data/api';

const router = express.Router();

router.get('/manage/editor', (req, res, next) => {
	res.locals.toolbar = [
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
		res.render("blog/overview");
	});
});

// import data from '../generated.json';
//
// data.forEach((post) => {
// 	api.createBlogPost({input: post}).then((result) => {
// 		console.log(result);
// 	});
// });

module.exports = router;
