import { sign } from "jsonwebtoken"
import config from "../config"
import User from "../models/User"

async function userLogin(req, res, next) {
  const { body } = req,
    { username, password } = body

  const user = await User.findOne({ username })

  if(!user) return res.send({
    err: 'User doesn\'t exist'
  })

  if(!user.validPassword(password, user.password)) {
    return res.send({
      err: 'Wrong password'
    })
  }

  delete user.password

  const token = sign(
    { data: { _id: user._id } },
    config.JWT_SECRET,
    { expiresIn: '7d' }
  )

  return res.send({
    user,
    token
  })
}

export default userLogin