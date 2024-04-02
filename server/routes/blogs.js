const express = require('express');
const { 
    createBlog,
    getAllUserBlogs,
    getSingleBlog,
    getAllBlogs,
    deleteBlog,
    updateLikes,
    updateBlog
} = require('../controller/blogsController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

//require for all routes
router.use(requireAuth);

//get all data
router.get('/user', getAllBlogs);

//get all blog of specific user
router.get('/all', getAllUserBlogs);

//get single data
router.get('/:id', getSingleBlog);

//post a new data
router.post('/',  createBlog)

//update a like
router.post('/like/:id', updateLikes)

//delete a single data
router.delete('/:id', deleteBlog)

//update a single data
router.patch('/:id', updateBlog)

module.exports = router;