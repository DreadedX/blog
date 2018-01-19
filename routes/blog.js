import express from 'express'
let router = express.Router();

router.get('/editor', (req, res, next) => {
	res.render("blog/editor");
});

module.exports = router;
