import express from 'express';
import metaTags from '../middleware/meta-tags';
import api from '../data/api';

const router = express.Router();

// @todo We really need to get all of this from a database
// Set the default tags for the site
router.use(metaTags({
	viewport: 'width=device-width, initial-scale=1.0',
	description: 'Dit is de persoonlijke website van Helma Koot',
	keyword: 'Helma, Koot, Office, Management, Blog', 
	author: 'Helma Koot',
	creator: '@Dreaded_X'
}));

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
	api.getBlogPosts().then((posts) => {
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
