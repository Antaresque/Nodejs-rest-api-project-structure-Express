const Book = require('../models/bookModel');
const base = require('./baseController');

exports.getByRating = base.getWhere(Book, ['typeOfBook']);
exports.getByAuthor = base.getWhere(Book, ['author']);

exports.getAll = base.getAll(Book, true);
exports.getBook = base.getOne(Book);
exports.createBook = base.createOne(Book);
exports.updateBook = base.updateOne(Book);
exports.deleteBook = base.deleteOne(Book);