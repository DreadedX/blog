module.exports = (Quill) => {
	let Block = Quill.import('blots/block');

	class Blockquote extends Block {}
	Blockquote.blotName = 'blockquote';
	Blockquote.tagName = 'blockquote';

	return Blockquote;
};
