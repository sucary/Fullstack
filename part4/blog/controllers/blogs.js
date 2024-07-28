const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})



blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const user = request.user

    if (!user) {
        return response.status(401).json({ error: 'token invalid' })
    }

    const body = request.body

    if (!body.title || !body.url) {
        return response.status(400).json({body})
    }

    const blog = new Blog({
        title: body.title,
        author: body.author || user.name,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    
    const user = request.user
    const blog = await Blog.findById(request.params.id)
    const userid = user.id
    
    if (blog.user.toString() === userid.toString()) {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } else {
        return response.status(401).json({error: 'Current user unauthorized to delete this blog'})
    }
})

blogsRouter.put('/:id', (request, response, next) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .then(updatedBlog => {
            response.json(updatedBlog)
        })
        .catch(error => next(error))
})

module.exports = blogsRouter