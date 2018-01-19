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

const quill = new Quill("#editor");
const fab = document.querySelector('#fab');

let toolbar = [];

class ToolbarItem {
	constructor(name, icon_name, handler) {
		let icon = document.createElement('i');
		icon.className = "material-icons";
		icon.textContent = icon_name;
		icon.id = name;

		let link = document.createElement('a');

		let button = document.createElement('li');
		button.className = 'waves-effect waves-light tooltipped';
		button.onclick = () => handler(name, quill.getFormat()[name]);

		link.appendChild(icon);
		button.appendChild(link);
		fab.querySelector('ul').appendChild(button);

		toolbar.push(name);
	}
}

const toggleAttribute = (name, value) => quill.format(name, !value, Quill.sources.USER);
const temp = (name) => console.log(name);

new ToolbarItem('bold', 'format_bold', toggleAttribute);
new ToolbarItem('italic', 'format_italic', toggleAttribute);
new ToolbarItem('underline', 'format_underline', toggleAttribute);
new ToolbarItem('strike', 'format_strikethrough', toggleAttribute);
new ToolbarItem('blockquote', 'format_quote', toggleAttribute);

new ToolbarItem('link', 'insert_link', (name, value) => {
	// @todo Make this more elegant
	quill.format(name, prompt('Link'));
});

new ToolbarItem('image', 'insert_photo', temp);
new ToolbarItem('video', 'movie', temp);


fab.onmousedown = event => event.preventDefault();

M.FloatingActionButton.init(fab, {
	direction: 'top', hoverEnabled: false, toolbarEnabled: true
}).open();

M.Sidenav.init(document.querySelector('.sidenav'));

quill.on('editor-change', () => {
	console.log(quill.getContents());
	let formats = quill.getFormat();
	toolbar.forEach((item) => {
		document.querySelector(`#${item}`).className = 'material-icons deep-orange-text text-darken-4';
	});
	for(let item in formats) {
		document.querySelector(`#${item}`).className = 'material-icons';
	}
});

quill.focus();
