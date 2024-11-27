import { Schema, model } from 'mongoose'

const ReviewSchema = new Schema({
    owner: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
    listing: {
        type: Schema.Types.ObjectId,
        ref: 'Listing'
    },
		value: {
			type: Number,
			default: 0
		},
		description: {
			type: String,
			default: ''
		}
})

const Review = model('Review', ReviewSchema)

export default Review