module.exports = (Quill) => {
	let Inline = Quill.import('blots/inline');

	class Underline extends Inline {}
	Underline.blotName = 'underline';
	Underline.tagName = 'u';

	return Underline;
};
