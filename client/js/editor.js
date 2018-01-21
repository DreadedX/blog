import Quill from 'quill';
// This is imported by the page
// import M from 'materialize-css'

import Bold from './blots/bold';
import Italic from './blots/italic';
import Underline from './blots/underline';
import Strike from './blots/strike';
import Blockquote from './blots/blockquote';
import Link from './blots/link';

Quill.register(Bold);
Quill.register(Italic);
Quill.register(Underline);
Quill.register(Strike);
Quill.register(Blockquote);
Quill.register(Link);

// let Block = Quill.import('blots/block');
// Block.tagName = 'div';
// Block.className = 'flow-text'
// Quill.register(Block);

const quill = new Quill('#editor');
const toolbar = document.querySelector('#toolbar');
const fab = document.querySelector('#fab');
const title = document.querySelector('#title');
const date = document.querySelector('#date');
const time = document.querySelector('#time');
const cardTitle = document.querySelector('.card-title');
const cardDate = document.querySelector('#card-date');
const cardTime = document.querySelector('#card-time');

const placeholderTitle = cardTitle.textContent;

const handler = {};
handler.toggleAttribute = (name, value) => quill.format(name, !value, Quill.sources.USER);
handler.temp = (name) => console.log(name);

document.querySelectorAll('.toolbar-item').forEach((toolbarItem) => {
	toolbarItem.onclick = () => {
		let name = toolbarItem.dataset.name;
		handler[toolbarItem.dataset.handler](name, quill.getFormat()[name]);
	}
});

title.oninput = () => {
	if (title.value) {
		cardTitle.textContent = title.value;
	} else {
		cardTitle.textContent = placeholderTitle;
	}
}

M.Datepicker.init(date, {
	format: 'dddd, mmmm dd, yyyy',
	firstDay: 1,
	showDaysInNextAndPreviousMonths: true,
	onClose: () => {
		console.log(M.Datepicker.getInstance(date));
		let value = M.Datepicker.getInstance(date).toString();
		if (value) {
			cardDate.textContent = value;
		} else {
			// @todo Show current date
			cardDate.textContent = 'Zaterdag, 20 januari, 2018';
		}
	}
});

M.Timepicker.init(time, {
	twelveHour: false
});

time.onchange = () => {
	console.log('test');
	let value = time.value;
	if (value) {
		cardTime.textContent = value;
	} else {
		// @todo Show current time
		cardTime.textContent = '18:30';
	}
};

fab.onmousedown = event => event.preventDefault();

quill.on('editor-change', (event, range, oldRange, source) => {
	if (range) {
		let formats = quill.getFormat();

		document.querySelectorAll('.toolbar-item').forEach((item) => {
			item.className = 'toolbar-item';
			if (!formats[item.dataset.name]) {
				item.className += ' blue-text text-darken-4';
			}
		});
	}
});

M.FloatingActionButton.init(fab, {
	toolbarEnabled: true
}).open();

quill.focus();
