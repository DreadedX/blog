import Quill from 'quill/dist/quill.core';
import Delta from 'quill-delta';
import axios from 'axios';

import { register } from 'shared/blots';

register(Quill);

const quill = new Quill('#editor');
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
handler.insertLink = (name, value) => {
	value = prompt("URL");
	quill.format(name, value, Quill.sources.USER);
};
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

let postId = document.querySelector('#editor').dataset.post_id;

if (postId) {
	axios.post('/api', {
		query: `query($id: String!) {
			post: getPost(id: $id) {
				title
				delta
			}
		}`,
		variables: {
			id: postId
		}
	}).then((response) => {
		let post = response.data.data.post;
		quill.setContents(JSON.parse(post.delta));
		title.value = post.title;
		title.oninput();
	});
}

document.querySelector('#save').onclick = () => {
	let request = {};
	if (postId) {
		request.query = `mutation($id: String!, $input: PostInput!) {
			post: updatePost(id: $id, input: $input) {
				id
			}
		}`;
	} else {
		request.query = `mutation($input: PostInput!) {
			post: createPost(input: $input) {
				id
			}
		}`;
	}

	request.variables = {
		input: {
			title: title.value,
			delta: JSON.stringify(quill.getContents())
		},
		id: postId
	};

	axios.post('/api', request).then((response) => {
		if (response.data.data.post) {
			let post = response.data.data.post;
			if (!postId) {
				history.pushState(post.id, 'Editor', `/blog/manage/editor/${post.id}`);
			}
			postId = post.id;
			console.log(post);
		} else {
			throw response;
		}
	}).catch((err) => {
		console.log(err);
	});
};
