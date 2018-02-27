import section from './blots/section';
import bold from './blots/bold';
import italic from './blots/italic';
import underline from './blots/underline';
import strike from './blots/strike';
import blockquote from './blots/blockquote';
import link from './blots/link';

const blots = [section, bold, italic, underline, strike, blockquote, link];

module.exports.register = (Quill) => {
	blots.forEach((blot) => {
		blot.register(Quill);
	});
};

let toolbar = [];
blots.forEach((blot) => {
	toolbar.push(blot.settings);
});

module.exports.toolbar = toolbar;

	// {name: 'section', icon_name: 'title', handler: 'toggleAttribute'},
	// {name: 'bold', icon_name: 'format_bold', handler: 'toggleAttribute'},
	// {name: 'italic', icon_name: 'format_italic', handler: 'toggleAttribute'},
	// {name: 'underline', icon_name: 'format_underline', handler: 'toggleAttribute'},
	// {name: 'strike', icon_name: 'format_strikethrough', handler: 'toggleAttribute'},
	// {name: 'blockquote', icon_name: 'format_quote', handler: 'toggleAttribute'},
    //
	// {name: 'link', icon_name: 'insert_link', handler: 'temp'},
	// {name: 'photo', icon_name: 'insert_photo', handler: 'temp'},
	// {name: 'video', icon_name: 'movie', handler: 'temp'},
