import { Schema, model } from 'mongoose'

const ListingSchema = new Schema({
	noOfPeople: Number,
	country: String,
	city: String,
	price: Number,
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
})

const Listing = model('Listing', ListingSchema)

export default Listing
