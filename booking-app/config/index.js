import { config } from 'dotenv'
import database from './database'

// Load .env
config()

let exported = {
  DB_URI: process.env.DB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  startDatabase: database.startDatabase
}

export default exported
