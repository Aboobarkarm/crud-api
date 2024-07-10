const express = require('express')
const { 
    createBlog,
    getblogs,
    getblog,
    updateBlog,
    deleteBlog
} = require('../controllers/BlogController')
const router = express.Router()

// GET all blogs
router.get('/', getblogs)

// GET a single blog
router.get('/:id', getblog)

// POST all blogs
router.post('/', createBlog)

// UPDATE blog
router.patch('/:id', updateBlog)

// DELETE blog
router.delete('/:id', deleteBlog)

module.exports = router