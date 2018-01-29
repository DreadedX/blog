const settings = {
	name: 'strike',
	icon: 'format_strikethrough',
	handler: 'toggleAttribute'
}

const register = (Quill) => {
	let Inline = Quill.import('blots/inline');

	class Strike extends Inline {}
	Strike.blotName = settings.name;
	Strike.tagName = 'strike';

	Quill.register(Strike);
};

module.exports = {
	register: register,
	settings: settings
};
