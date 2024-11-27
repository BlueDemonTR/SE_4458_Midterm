var express = require('express');
const { default: login } = require('./login');
const { default: signup } = require('./signup');
const { verify } = require('jsonwebtoken');
const { default: insertListing } = require('./insertListing');
import config from '../config'

var router = express.Router();

const connectionObject = {
	"GET": {
	},
	"POST": {
    '/users/login': login,
    '/users/signup': signup,
    '/insertListing': insertListing
	}
}

function handleSend(data, status = 200) {
  this.status(status)

	this.write(JSON.stringify(data))
	this.end()
}

function handleMessage(req, res) {
	const method = connectionObject[req.method]

	if(!method) {
    res.status(400)
		res.write("Invalid Method " + req.method)

		res.end()
		return
	}

	const func = method[req.url]
	
	if(!func) {
    res.status(400)
		res.write(JSON.stringify(
			{ err: "Invalid Function " + req.url + " in " + req.method }
		))
		res.end()
		return
	}

	let id

	if(req?.headers?.authorization) {
		try {
      const token = req.headers.authorization.slice(7)

			id = verify(
				token, 
				config.JWT_SECRET
			).data
		} catch (error) {
      res.status(401)
			res.write('Token Expired')
			
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
