import M from 'materialize-css'

M.Sidenav.init(document.querySelector('.sidenav'));
M.Dropdown.init(document.querySelector('.dropdown-trigger'), {
	coverTrigger: false
});

document.querySelector('#logout').onclick = () => {
	document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=-1;';
	window.location.reload();
}

global.M = M;

