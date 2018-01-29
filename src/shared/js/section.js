module.exports = (Quill) => {
	let Block = Quill.import('blots/block');

	class Section extends Block {}
	Section.blotName = 'section';
	Section.tagName = 'h5';

	return Section;
};
