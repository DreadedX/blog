const settings = {
	name: "link",
	icon: "insert_link",
	handler: "insertLink"
}

const register = (Quill) => {
	let Inline = Quill.import('blots/inline');

	class Link extends Inline {
		static create(value) {
			let node = super.create();
			node.setAttribute('href', value);
			node.setAttribute('target', '_blank');

			return node;
		}

		static formats(domNode) {
			return domNode.getAttribute('href');
		}

		format(name, value) {
			if (name !== this.statics.blotName || !value) return super.format(name, value);
			this.domNode.setAttribute('href', value);
		}
	}
	Link.blotName = settings.name;
	Link.tagName = 'a';

	Quill.register(Link);
};

module.exports = {
	register: register,
	settings: settings
};
