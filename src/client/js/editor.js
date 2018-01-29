import Quill from 'quill/dist/quill.core';
import Delta from 'quill-delta';
import axios from 'axios';

import Section from './blots/section';
import Bold from './blots/bold';
import Italic from './blots/italic';
import Underline from './blots/underline';
import Strike from './blots/strike';
import Blockquote from './blots/blockquote';
import Link from './blots/link';

Quill.register(Section(Quill));
Quill.register(Bold(Quill));
Quill.register(Italic(Quill));
Quill.register(Underline(Quill));
Quill.register(Strike(Quill));
Quill.register(Blockquote(Quill));
Quill.register(Link(Quill));

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

global.quill = quill;

document.querySelector('#save').onclick = () => {
	axios.post('/api', {
		query: `mutation($input: PostInput!) {
			post: createPost(input: $input) {
				id
				title
				content
			}
		}`,
		variables: {
			input: {
				title: title.value,
				delta: JSON.stringify(quill.getContents())
			}
		}
	}).then((result) => {
		console.log(result);
	}).catch((err) => {
		console.log(err);
	});
};
