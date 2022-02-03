const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: "public/sachImg/" });
const controller = require('../controllers/book.controller')
const verifyToken = require('../middleware/auth.middleware')

router.get('/', controller.getBooks)
router.post('/', verifyToken, upload.single('img'), controller.createBook)
router.put('/', verifyToken,  upload.single('img'), controller.updateBook)
router.delete('/:id', verifyToken, controller.deleteBook)
router.post('/search', controller.searchBooks)
module.exports = router;