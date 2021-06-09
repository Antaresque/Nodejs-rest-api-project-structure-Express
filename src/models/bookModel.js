const mongoose = require('mongoose');
const logger = require('../utils/logger');

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    description: {
        type: String
    },
    code: {
        type: String,
        required: [true, "Code is required"],
        unique: true
    },
    author: {
        type: String,
        required: [true, "Author is required"]
    },
    secret: {
        type: String,
        select: false
    },
    typeOfBook: {
        type: String,
        enum: ["good", "ok", "bad"],
        default: "ok"
    }
});

// mongoose middleware example
schema.pre("save", async (next) => {

    // adding the field
    this.newField = true;

    logger.info("Saving the document...");
    next();
});

const Book = mongoose.model("Book", schema);
module.exports = Book;