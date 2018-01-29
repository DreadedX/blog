import axios from 'axios';

document.querySelector('#login').onsubmit = (event) => {
	event.preventDefault();
	showLoader();
	axios.post('/api', {
		query: `query($input: LoginInput!) {
			user: loginUser(input: $input) {
				token
			}
		}`,
		variables: {
			input: {
				username: document.querySelector('#username input').value,
				password: document.querySelector('#password input').value
			}
		}
	}).then((response) => {
		if (response.data.data.user && response.data.data.user.token) {
			let maxAge = (24*60*60);
			let d = new Date();
			d.setTime(d.getTime() + maxAge * 1000);
			let expires = 'Expires=' + d.toUTCString();
			document.cookie = 'token=' + response.data.data.user.token + '; Path=/; Expires=' + expires + '; Max-Age=' + maxAge + ';';
			window.location.replace(document.querySelector('#login').dataset.redirect_uri);
		} else {
			hideLoader();
			if (response.data.errors) {
				response.data.errors.forEach((error) => {
					for (let field in error.state) {
						document.querySelector('#' + field + ' span').dataset.error = error.state[field];
						document.querySelector('#' + field + '-input').className = 'invalid';
					}
				});
			}
		}
	});
}

document.querySelector('#username-input').oninput = () => {
	document.querySelector('#username-input').className = '';
}
document.querySelector('#password-input').oninput = () => {
	document.querySelector('#password-input').className = '';
}

const showLoader = () => {
	document.querySelector('#form').className = 'card-content scale-transition scale-out';
	document.querySelector('#loader').className = 'card-content scale-transition scale-out scale-in';
}
const hideLoader = () => {
	document.querySelector('#form').className = 'card-content scale-transition scale-out scale-in';
	document.querySelector('#loader').className = 'card-content scale-transition scale-out';
}
