const express = require('express');
const { getBlogs, editBlog, createblog,getspecificBlogs ,blogstatus,blogs_edit_cancel} = require('../controllers/blogController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/blogs', auth, getBlogs);
router.put('/blogs/:blogId/edit', auth, editBlog);
router.get('/blogs/:blogId', auth, getspecificBlogs);
router.put('/blogs_status/:blogId', auth, blogstatus);
router.put('/blogs_edit_cancel/:blogId', auth, blogs_edit_cancel);
router.post('/createblog', auth, createblog);

module.exports = router;
