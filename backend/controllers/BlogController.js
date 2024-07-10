const Blog = require('../models/BlogModel')
const mongoose = require('mongoose')


// get all blogs
const getblogs = async (req, res) => {
    const blogs = await Blog.find({}).sort({ createdAt: -1 }) //dec

    res.status(200).json(blogs)
}

// get a single blog
const getblog = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ err: 'No such blog '}) // costum err
    }

    const blog = await Blog.findById(id)

    if (!blog) {
        return res.status(400).json({ error: 'No such blog'})
    }
    res.status(200).json(blog)
}


// create new blog
const createBlog = async (req, res) => {
    const { title, body, reps } = req.body
    // add doc to db
    try {
        const blog = await Blog.create({ title, body, reps })
        res.status(200).json(Blog)
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}


// update a blog
const updateBlog = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such blog '})
    }
    const blog = await Blog.findByIdAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!blog) {
        return res.status(400).json({ error: 'No such blog'})
     }
     res.status(200).json(blog)      
}


// delete a blog
const deleteBlog = async (req, res) => {
 const { id } = req.params
 
 if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: 'No such blog '})
 }
 const blog = await Blog.findOneAndDelete({ _id: id })
 if (!blog) {
    return res.status(400).json({ err: 'No such blog'})
 }
 res.status(200).json(blog)

}

module.exports = {
    getblogs,
    getblog,
    createBlog,
    deleteBlog,
    updateBlog
}


