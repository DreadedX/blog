var jwt = require('jsonwebtoken');
var token = jwt.sign({name: "Tim Huizinga", admin: true}, 'test');

console.log(token);
