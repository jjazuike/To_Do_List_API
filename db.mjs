import { open } from 'sqlite'; // Use named import for the 'open' function
import sqlite3 from 'sqlite3'; // Keep sqlite3 as the driver

// Open the SQLite database file (or create it if it doesn't exist)
const dbPromise = open({
  filename: './database.db', // Path to your SQLite database
  driver: sqlite3.Database,  // Use sqlite3 as the driver
});

export { dbPromise };
// Initialize the database table when the server starts
async function initializeDb() {
  const db = await dbPromise;
  try {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task TEXT NOT NULL,
        completed BOOLEAN NOT NULL DEFAULT 0
      )
    `);
    console.log('Database initialized successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

initializeDb(); // Initialize the database when the server starts