const mongoose = require('mongoose')

async function startDatabase() {
  await mongoose.connect(process.env.DB_URI, {})
  console.log('connected to database')
}

const database = {
  startDatabase,
}

export default database
