const mongoose = require('mongoose');
const Book = mongoose.model('Book');

const getBooks = (req, res) => {
    Book.find(
        { userId: req.user._id },
        (err, books) => {
            if(err) {
                res.sendStatus(400);
                return;
            }
            res.send(books);
        }
    );
};

const getBook = (req, res) => {
    Book.findById(req.params.id, (err, book) => {
        if(err) {
            res.sendStatus(400);
            return;
        }
        if(!book || !book.userId.equals(req.user._id)) {
            res.sendStatus(404);
            return;
         }
        res.send(book);
    });
};

const addBook = (req, res) => {
    const book = new Book(req.body);
    book.userId = req.user._id;
    book.save((err) => {
        if(err) {
            res.sendStatus(400);
            return;
        }
        res.sendStatus(201);
    });
};

const changeBook = (req, res) => {
    Book.findById(req.params.id, (err, book) => {
        if(err) {
            res.sendStatus(400);
            return;
        }
        if(!book || !book.userId.equals(req.user._id)) {
            res.sendStatus(404);
            return;
        }
        book.title = req.body.title;
        book.author = req.body.author;
        book.completed = req.body.completed;
        book.mode = req.body.mode;
        book.save((err) => {
            if(err) {
                res.sendStatus(400);
                return;
            }
            res.sendStatus(204);
        });
    });
};

const deleteBook = (req, res) => {
    Book.findById(req.params.id, (err, book) => {
        if(err) {
            res.sendStatus(400);
            return;
        }
        if(!book || !book.userId.equals(req.user._id)) {
            res.sendStatus(404);
            return;
        }
        book.remove((err) => {
            if(err) {
                res.sendStatus(400);
                return;
            }
            res.sendStatus(204);
         });
    });
};

module.exports = {
    getBooks,
    getBook,
    addBook,
    changeBook,
    deleteBook
};
