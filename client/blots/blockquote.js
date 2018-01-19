let Block = Quill.import('blots/block');

class Blockquote extends Block {}
Blockquote.blotName = 'blockquote';
Blockquote.tagName = 'blockquote';

module.exports = Blockquote;
