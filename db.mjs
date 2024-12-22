import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Ensure the database connection is initialized properly
export const dbPromise = open({
  filename: './database.db',
  driver: sqlite3.Database,
});
