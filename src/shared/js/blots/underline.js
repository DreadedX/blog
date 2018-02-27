const settings = {
	name: 'underline',
	icon: 'format_underline',
	handler: 'toggleAttribute'
}

const register = (Quill) => {
	let Inline = Quill.import('blots/inline');

	class Underline extends Inline {}
	Underline.blotName = 'underline';
	Underline.tagName = 'u';

	Quill.register(Underline);
};

module.exports = {
	register: register,
	settings: settings
};
