let Inline = Quill.import('blots/inline');

class Italic extends Inline {}
Italic.blotName = 'italic';
Italic.tagName = 'i';

module.exports = Italic;
