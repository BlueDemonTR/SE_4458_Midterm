var express = require('express');
const { default: login } = require('./login');
const { default: signup } = require('./signup');
const { verify } = require('jsonwebtoken');
var router = express.Router();

const connectionObject = {
	"GET": {
	},
	"POST": {
    '/users/login': login,
    '/users/signup': signup
	}
}

function handleSend(data) {
	this.write(JSON.stringify(data))
	this.end()
}

function handleMessage(req, res) {
	const method = connectionObject[req.method]

	if(!method) {
		res.write("Invalid Method " + req.method)

		res.end()
		return
	}

	const func = method[req.url]
	
	if(!func) {
		res.write(JSON.stringify(
			{ err: "Invalid Function " + req.url + " in " + req.method }
		))
		res.end()
		return
	}

	let id

	if(req?.headers?.authorization) {
		try {
			id = verify(
				req.headers.authorization.slice(7), 
				config.JWT_SECRET
			).data
		} catch (error) {
			res.write(
				JSON.stringify({
					err: 'Token Expired',
					removeToken: true
				})
			)
			
			res.end()
			return
		}
	}

	res.send = handleSend

	func(req, res, id)
}

router.post('*', function(req, res, next) {
  handleMessage(req, res)
});

module.exports = router;
