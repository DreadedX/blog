import render from './render';

let delta = {"ops":[{"attributes":{"bold":true},"insert":"Hallo allemaal dit is een test. Hier komt de inleidende tekst te staan."},{"insert":"\nHier gaat het "},{"attributes":{"italic":true},"insert":"hele"},{"insert":" verhaal verder. "},{"attributes":{"strike":true},"insert":"Nu claim ik iets dat fout blijkt te zijn."},{"insert":"\n\nDit is een mooie quote van iemand die ik ergens gelezen heb."},{"attributes":{"blockquote":true},"insert":"\n"}]}

// let delta = {
//   ops: [
//     { insert: 'Gandalf', attributes: { bold: true } },
//     { insert: ' the ', attributes: {italic: true} },
//     { insert: 'Grey', attributes: { color: '#cccccc' } }
//   ]
// }

render(delta).then((result) => {
	console.log(result);
}).catch((err) => {
	console.log(err);
});
