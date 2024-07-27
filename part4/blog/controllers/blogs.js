const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const users = await User.find({})
    const randomUser = users[Math.floor(Math.random() * users.length)]

    if (!body.title || !body.url) {
        return response.status(400).json({body})
    }

    const blog = new Blog({
        title: body.title,
        author: body.author || randomUser.name,
        url: body.url,
        likes: body.likes,
        user: randomUser._id
    })

    const savedBlog = await blog.save()
    randomUser.blogs = randomUser.blogs.concat(savedBlog._id)
    await randomUser.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
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