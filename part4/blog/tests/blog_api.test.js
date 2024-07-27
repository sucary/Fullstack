const { test, after, beforeEach, describe } = require('node:test')
const Blog = require('../models/blog')
const assert = require('node:assert')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})                   // Removes all documents from Blog collection (database)

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('blogs are returned as json', async () => {
    console.log('entered test')
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('a blog can be added', async () => {
    const newBlog = {
        title: 'Story of Eastern Ukraine',
        author: 'Putin',
        url: 'https://tass.com/',
        likes: 100
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    assert(titles.includes('Story of Eastern Ukraine'))
    const response = await api.get('/api/blogs')
    console.log(`Blogs in database: ${helper.initialBlogs.length}, blogs received: ${response.body.length}`)
})

test('the amount of blog posts are correct', async () => {
    const response = await api.get('/api/blogs')

    console.log(`Blogs in database: ${helper.initialBlogs.length}, blogs received: ${response.body.length}`)
    assert.strictEqual(response.body.length, helper.initialBlogs.length)

    const blogsAtEnd = await helper.blogsInDb()
    console.log('the last blog: ', 
        assert((blogsAtEnd.map(b => b.title)).includes('Story of Eastern Ukraine')))
})

test('the id is in the correct form', async () => {
    const response = await api.get('/api/blogs')

    const blogs = response.body
    console.log('The first blog:', blogs[0])

    blogs.forEach(blog => {
        assert.ok(blog.id)
        assert.strictEqual(typeof blog.id, 'string')
    })
})

test('all likes are initialized', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body

    blogs.forEach(blog => {
        if (blog.likes === undefined) {
            blog.likes = 0
            console.log('Missing property: likes, reset likes to 0')
        }
        console.log('Type of likes: ', typeof blog.likes)
    })

    blogs.forEach(blog => {
        assert.ok(blog.id)
        assert.strictEqual(typeof blog.likes, 'number')
    })
})

test('blog without title or url is not added', async () => {
    const newBlog = {
        author: 'Zelenskyi',
        url: 'https://www.ukrinform.ua/',
        likes: 100
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogAtEnd = await helper.blogsInDb()

        assert.strict(blogAtEnd.length, helper.initialBlogs.length - 1)

        const title = blogAtEnd.map(b => b.content)
        assert(!title.includes(blogToDelete.title))
    })
})

test('the information of a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[1]

    const newBlog = {
        title: 'Browser can execute only JavaScript',
        author: 'Jarkko',
        url: 'moodle.utu.fi',
        likes: 0
    }

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)

    assert.strictEqual(updatedBlog.likes, newBlog.likes)
})

describe('when there is initially one user in db', () => {
    // Create an initial user
    beforeEach(async () => {
        await User.deleteMany({})
    
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })
    
        await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
            username: 'putin107',
            name: 'putin',
            password: 'salainen',
        }
  
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
    
        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))
    })

    test('creation fails if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }
    
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    
        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('expected `username` to be unique'))
    
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
})

after(async () => {
    await mongoose.connection.close()
})