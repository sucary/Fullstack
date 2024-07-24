const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'HTML is easy',
        author: 'Matti',
        url: 'fulstackopen.com',
    },
    {
        title: 'Browser can execute only JavaScript',
        author: 'Jarkko',
        url: 'moodle.utu.fi',
        likes: 10
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ ctitle: 'willremovethissoon' })
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}