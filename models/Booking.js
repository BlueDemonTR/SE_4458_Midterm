import { Schema, model } from 'mongoose'

const BookingSchema = new Schema({
    guests: {
        type: [String],
        default: []
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    listing: {
        type: Schema.Types.ObjectId,
        ref: 'Listing'
    },
    from: Date,
    to: Date
})

const Booking = model('Booking', BookingSchema)

export default Booking