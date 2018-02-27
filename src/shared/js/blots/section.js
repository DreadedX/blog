const settings = {
	name: 'section',
	icon: 'title',
	handler: 'toggleAttribute'
}

const register = (Quill) => {
	let Block = Quill.import('blots/block');

	class Section extends Block {}
	Section.blotName = settings.name;
	Section.tagName = 'h5';

	Quill.register(Section);
}

module.exports = {
	register: register,
	settings: settings
};
