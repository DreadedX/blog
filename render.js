// import Promise from 'promise';
import jsdom from 'jsdom';
const quill = require.resolve('quill/dist/quill.core');
const mutationObserver = require.resolve('mutation-observer');

const scripts = [quill, mutationObserver];

import Section from './client/js/blots/section';
import Bold from './client/js/blots/bold';
import Italic from './client/js/blots/italic';
import Underline from './client/js/blots/underline';
import Strike from './client/js/blots/strike';
import Blockquote from './client/js/blots/blockquote';
import Link from './client/js/blots/link';

// const blots = [Bold, Italic, Underline, Strike, Blockquote, Link];
const blots = [Section, Bold, Italic, Underline, Strike, Blockquote];

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

			var Block = window.Quill.import('blots/block');
			Block.tagName = 'p';
			window.Quill.register(Block, true);

			blots.forEach((blot) => {
				window.Quill.register(blot(window.Quill));
			});

			let quill = new window.Quill('#editor');

			quill.setContents(delta);

			resolve(window.document.querySelector('.ql-editor').innerHTML);

			window.close();
		});
	});
}

module.exports = render;
