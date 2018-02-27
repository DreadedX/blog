const settings = {
	name: 'blockquote',
	icon: 'format_quote',
	handler: 'toggleAttribute'
}

const register = (Quill) => {
	let Block = Quill.import('blots/block');

	class Blockquote extends Block {}
	Blockquote.blotName = settings.name;
	Blockquote.tagName = 'blockquote';

	Quill.register(Blockquote);
};

module.exports = {
	register: register,
	settings: settings
};
