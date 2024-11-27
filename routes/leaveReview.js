import authorize from "../lib/authorize";
import Booking from "../models/Booking";
import Listing from "../models/Listing";
import Review from "../models/Review";

async function leaveReview(req, res, id) {
	const user = await authorize(id, 'guest')

	if(!user) return res.send('Unauthorized', 401)

	const { body } = req,
		{ stayId, rating, description } = body

	const booking = await Booking.findById(stayId)

	if(booking && (booking.owner.toString() != user._id.toString())) return res.send('Unauthorized', 401)

	let newReview
	try {
		newReview = await Review.create({ 
			booking: stayId, 
			owner: id,
			rating,
			description,
			listing: booking.listing
		})
	} catch (error) {
		console.log(error, req.body);
	}

	res.send(
		newReview?._id ? 'Successful' : 'Failure', 
		newReview?._id ? 200 : 400
	)
}

export default leaveReview