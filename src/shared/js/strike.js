module.exports = (Quill) => {
	let Inline = Quill.import('blots/inline');

	class Strike extends Inline {}
	Strike.blotName = 'strike';
	Strike.tagName = 'strike';

	return Strike;
};
