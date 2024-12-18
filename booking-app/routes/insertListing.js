import authorize from "../lib/authorize";
import Listing from "../models/Listing";

async function insertListing(req, res, id) {
	const user = await authorize(id, 'host')

	if(!user) return res.send('Unauthorized', 401)

	let newListing
	try {
		newListing = await Listing.create({ ...req.body, owner: id })
	} catch (error) {
		console.log(error, req.body);
	}

	res.send(
		newListing?._id ? 'Successful' : 'Failure', 
		newListing?._id ? 200 : 400
	)
}

export default insertListing