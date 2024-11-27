import { sign } from "jsonwebtoken"
import User from "../models/User"
import config from "../config"

async function signup(req, res, next) {
	const { username, password } = req.body

  const existing = await User.findOne({ username })

  if(existing) {
    return res.send({
      type: 'ERROR',
      err: 'User with the selected name exists'
    })
  }

  const user = new User({ username })

  user.password = user.generateHash(password)

  await user.save()

	delete user.password

  const token = sign(
    { data: { _id: user._id } },
    config.JWT_SECRET,
    { expiresIn: '7d' }
  )

	console.log(token)

	res.send({ token, user })
}

export default signup