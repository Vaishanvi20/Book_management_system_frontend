import express from 'express';
import db from './db.js'; // Import the MySQL connection
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json()); // Middleware for parsing JSON bodies

const PORT = 5000; // Use the port from the environment or default to 5000

// Test route
app.get('/', (req, res) => {
  res.json('Hello, this is the backend!');
});

// Route to fetch booklist
app.get('/get-booklist', (req, res) => {
  const query = 'SELECT * FROM book_managment.booklist;';
  db.query(query, (err, data) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error', details: err });
    }
    return res.json(data);
  });
});

// Route to add a new book to the booklist
app.post('/add-book', (req, res) => {
  const query =
    'INSERT INTO book_managment.booklist (`bookname`, `author`, `price`) VALUES (?)';
  const values = [req.body.bookname, req.body.author, req.body.price];

  db.query(query, [values], (err, data) => {
    if (err) return res.json(err); // Handle error
    return res.json('Book added successfully');
  });
});

// Route to update a book's details
app.put('/update-book/:id', (req, res) => {
  const { id } = req.params;
  const { bookname, author, price } = req.body;

  const query = 'UPDATE book_managment.booklist SET `bookname` = ?, `author` = ?, `price` = ? WHERE `id` = ?';
  const values = [bookname, author, price, id];

  db.query(query, values, (err, data) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error', details: err });
    }
    if (data.affectedRows === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    return res.json('Book updated successfully');
  });
});

// Route to delete a book by id
app.delete('/delete-book/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM book_managment.booklist WHERE `id` = ?';
  db.query(query, [id], (err, data) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error', details: err });
    }
    if (data.affectedRows === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    return res.json('Book deleted successfully');
  });
});

app.get('/get-book/:id', (req, res) => {
  const { id } = req.params;

  const query = 'SELECT * FROM book_managment.booklist WHERE `id` = ?';
  db.query(query, [id], (err, data) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error', details: err });
    }
    if (data.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    return res.json(data[0]);
  });
});

// Server listen
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
