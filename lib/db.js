import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// this is a top-level await 
const db=async () => {
    // open the database
    const db = await open({
      filename: './db.db',
      driver: sqlite3.Database
    })
  return db;
}
export default db