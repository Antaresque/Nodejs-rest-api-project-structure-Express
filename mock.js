const MOCK = [
    { "title": "Book 1", "code": "214245-343", "author": "me" },
    { "title": "Book 2", "code": "214w45-343", "author": "me" },
    { "title": "Book 3", "code": "214q45-343", "author": "me" },
    { "title": "Book 4", "code": "214e45-343", "author": "me" },
    { "title": "Book 5", "code": "214f45-343", "author": "you" }
]

const Book = require('./src/models/bookModel');

exports.loadData = async () => {
    try{
        await Book.insertMany(MOCK);
    }
    catch(err){
        // ignore, already inserted
    }
}