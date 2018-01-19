let Inline = Quill.import('blots/inline');

class Bold extends Inline {}
Bold.blotName = 'bold';
Bold.tagName = 'b';

module.exports = Bold;
