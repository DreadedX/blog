import M from 'materialize-css'

M.Sidenav.init(document.querySelector('.sidenav'));
// M.Dropdown.init(document.querySelector('.dropdown-trigger'), {
// 	coverTrigger: false
// });

M.Dropdown.init(document.querySelector('.dropdown-trigger'),{coverTrigger: false});

global.M = M;

