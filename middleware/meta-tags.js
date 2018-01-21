const process = (res, tags) => {
	if (!res.locals.metatags) {
		res.locals.metatags = {};
		res.locals.metatags['twitter:card'] = 'summary';
	}

	for (let name in tags) {
		switch (name) {
			case 'title':
				res.locals.title = tags[name];
				res.locals.metatags['og:title'] = tags[name];
				res.locals.metatags['twitter:title'] = tags[name];
				break;

			case 'description':
				res.locals.metatags['description'] = tags[name];
				res.locals.metatags['og:description'] = tags[name];
				res.locals.metatags['twitter:description'] = tags[name];
				break;

			case 'creator':
				res.locals.metatags['twitter:creator'] = tags[name];

			default:
				res.locals.metatags[name] = tags[name];

		}
	}
}

module.exports = (baseTags) => {
	return (req, res, next) => {
		res.metatags = (tags) => {
			process(res, tags);
		};

		res.metatags(baseTags);

		next();
	};
};