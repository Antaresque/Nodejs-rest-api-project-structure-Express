const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../middleware/authMiddleware');

const bookController = require("../controllers/bookController");

router.get('/', bookController.getByRating, bookController.getByAuthor, bookController.getAll);
router.get('/:id', bookController.getBook);

// All routes below this middleware require valid token
router.use(protect);

// All routes below this middleware require admin role
router.use(restrictTo('admin'));

router.route('/')
    .post(bookController.createBook);

router.route('/:id')
    .patch(bookController.updateBook)
    .delete(bookController.deleteBook)

module.exports = router;