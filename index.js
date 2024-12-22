// import required librarie
import express from 'express'; // for building the server
import cors from 'cors'; // for handling cross-origin requests
import { dbPromise } from './db.mjs';

// initialize the server and make it listen to incoming requests
const app = express(); // Initialize the express app
const port = 3000; // Define the port number

// Middleware
app.use(cors()); // enable CORS
app.use(express.json()); //Parse JSON data from requests

// Initialize database
async function initializeDb() {
    const Db = await dbPromise
    await Db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task TEXT NOT NULL,
      completed BOOLEAN NOT NULL DEFAULT 0
    )
        
        `);
}

initializeDb();

// Routes
app.get('/todos', async (req, res) => {
    const db = await dbPromise;
    const todos = await db.all('SELECT * FROM todos');
    res.json(todos);
});

app.post('/todos', async (req, res) => {
    const {
        task
    } = req.body;
    const db = await dbPromise;
    const result = await db.run('INSERT INTO todos (task, completed) VALUES (?, ?)', [task, false]);
    const newTodo = {
        id: result.lastID,
        task,
        completed: false
    };
    res.status(201).json(newTodo);
});

app.put('/todos/:id', async (req, res) => {
    const {
        id
    } = req.params;
    const {
        task,
        completed
    } = req.body;
    const db = await dbPromise;
    const result = await db.run(
        'UPDATE todos SET task = ?, completed = ? WHERE id = ?',
        [task, completed, id]
    );
    if (result.changes === 0) {
        res.status(404).json({
            message: 'To-Do item not found'
        });
    } else {
        res.json({
            id,
            task,
            completed
        });
    }
});

app.delete('/todos/:id', async (req, res) => {
    const {
        id
    } = req.params;
    const db = await dbPromise;
    const result = await db.run('DELETE FROM todos WHERE id = ?', [id]);
    if (result.changes === 0) {
        res.status(404).json({
            message: 'To-Do item not found'
        });
    } else {
        res.status(204).send();
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
