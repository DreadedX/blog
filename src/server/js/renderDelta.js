// import Promise from 'promise';
import jsdom from 'jsdom';
const quill = require.resolve('quill/dist/quill.core');
const mutationObserver = require.resolve('mutation-observer');

const scripts = [quill, mutationObserver];

import blots from 'shared/blots';

function render(delta) {
	return new Promise((resolve, reject) => {
		jsdom.env('<div id="editor"></div>', scripts, (err, window) => {
			if (err) {
				return reject(err);
			}

			window.document.getSelection = () => {
				return {
					getRangeAt: () => {}
				};
			};

			blots.register(window.Quill);

			let quill = new window.Quill('#editor');

			quill.setContents(delta);

			resolve(window.document.querySelector('.ql-editor').innerHTML);

			window.close();
		});
	});
}

module.exports = (delta) => {
	return render(JSON.parse(delta));
};
