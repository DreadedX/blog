const settings = {
	name: 'italic',
	icon: 'format_italic',
	handler: 'toggleAttribute'
}

const register = (Quill) => {
	let Inline = Quill.import('blots/inline');

	class Italic extends Inline {}
	Italic.blotName = settings.name;
	Italic.tagName = 'em';

	Quill.register(Italic);
};

module.exports = {
	register: register,
	settings: settings
};
