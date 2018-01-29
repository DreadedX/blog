import api from './data/api';

let id = "5a6f7a31941e0b2d957a473c";

api.getPost({id}).then((post) => {
	api.updatePost({id, input: post});
})


