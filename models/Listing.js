import { Schema, model } from 'mongoose'

const ListingSchema = new Schema({
	noOfPeople: {
		type: Number,
		min: 0,
		required: true
	},
	country: {
		type: String,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		min: 0,
		required: true
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
})

const Listing = model('Listing', ListingSchema)

export default Listing
