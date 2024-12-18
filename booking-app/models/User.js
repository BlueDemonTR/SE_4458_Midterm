import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'


const UserSchema = new Schema({
    username: String,
    role: {
        type: String,
        enum: ['guest', 'host', 'admin'],
        default: 'guest'
    },
    password: String
})

// generates a hashed password with bycrpt
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

// for checking if the password is valid on login
UserSchema.methods.validPassword = function(password, userPassword) {
    return bcrypt.compareSync(password, userPassword)
}

const User = model('User', UserSchema)

export default User
