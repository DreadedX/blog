const settings = {
	name: 'bold',
	icon: 'format_bold',
	handler: 'toggleAttribute'
}

const register = (Quill) => {
	let Inline = Quill.import('blots/inline');

	class Bold extends Inline {}
	Bold.blotName = settings.name;
	Bold.tagName = 'strong';

	Quill.register(Bold);
};

module.exports = {
	register: register,
	settings: settings
};
