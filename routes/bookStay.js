import authorize from "../lib/authorize";
import Booking from "../models/Booking";
import Listing from "../models/Listing";

async function bookStay(req, res, id) {
	const user = await authorize(id, 'guest')

	if(!user) return res.send('Unauthorized', 401)

	let newBooking
	try {
		newBooking = await Booking.create({ ...req.body, owner: id })
	} catch (error) {
		console.log(error, req.body);
	}

	res.send(
		newBooking?._id ? 'Successful' : 'Failure', 
		newBooking?._id ? 200 : 400
	)
}

export default bookStay