import Booking from "../models/Booking";
import Listing from "../models/Listing";
import Review from "../models/Review";

const QUERY_LIMIT = 10

async function reportListings(req, res, id) {
	const { query } = req,
		{ country, city, skip = 0 } = query

	const user = await authorize(id, 'admin')
	if(!user) return res.send('Unauthorized', 401)

	const listings = await Listing.find({ country, city })

	const bookings = await Booking.find({
		listing: { $in: listings.map(x => x._id)}
	}),
		bookingIds = bookings.map(x => x._id)

	const reviews = await Review.find({
		listing: { $in: listings.map(x => x._id)}
	})

	const mappedListings = listings
		.map(x => {
			const ratings = reviews
				.filter(x => x.listing === x._id)
			const calculatedRating = ratings.reduce((prev, curr) => prev += curr.rating, 0) / ratings.length
			
			return {
				...x.toObject(),
				rating: calculatedRating || 0
			}
		})
		.sort((a, b) => b.rating - a.rating)
		.slice(skip, skip + QUERY_LIMIT)

	res.send(mappedListings)
}

export default reportListings