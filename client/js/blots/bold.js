module.exports = (Quill) => {
	let Inline = Quill.import('blots/inline');

	class Bold extends Inline {}
	Bold.blotName = 'bold';
	Bold.tagName = 'strong';

	return Bold;
};
