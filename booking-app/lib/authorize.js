import User from "../models/User";

async function authorize(id, role) {
	const user = await User.findById(id)
	
	if(!role) return user

	if(user?.role === role) return user

	return false
}

export default authorize