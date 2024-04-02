const express = require('express');
const multer = require('multer');
const upload = multer();

const {
    postItem, getAllItem, getAllUserPost
} = require('../controller/lostandfoundController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

//require for all routes
router.use(requireAuth);

//post an item
router.post('/postItem', upload.none(), postItem);

//get all items
router.get('/getAllItem', getAllItem);

//get all specific user post
router.get('/getUserPost/:id', getAllUserPost);


module.exports = router;