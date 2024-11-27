import Booking from "../models/Booking";
import Listing from "../models/Listing";
import Review from "../models/Review";

const QUERY_LIMIT = 10

async function queryListings(req, res, id) {
	const { query } = req,
		{ from, to, noOfPeople, country, city, skip = 0 } = query

	const listings = await Listing.find({ noOfPeople, country, city })

	console.log(listings);
	

	const bookings = await Booking.find({ 
		from: { $gt: from }, 
		to: { $lt: to }, 
		listing: { $in: listings.map(x => x._id)}
	}),
		bookingIds = bookings.map(x => x._id)

	const filteredListings = listings.filter(x => !bookingIds.includes(x._id))

	const reviews = await Review.find({
		listing: { $in: filteredListings.map(x => x._id)}
	})

	const mappedListings = filteredListings
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

export default queryListings