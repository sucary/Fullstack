import { useState } from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const handleLike = async () => {
        const updatedBlog = {
            ...blog,
            likes: blog.likes + 1
        }
        try {
            const returnedBlog = await blogService.update(blog.id, updatedBlog)
            updateBlog(returnedBlog)
        } catch (exception) {
            console.error('Error updating blog:', exception)
        }
    }

    const handleDelete = () => {
        {
            deleteBlog(blog.id)
        }
    }

    return (
        <div style={blogStyle}>
            {blog.title} {blog.author}

            <button onClick={toggleVisibility}>
                {visible ? 'hide' : 'view'}
            </button>

            {visible && (
                <div>
                    <div>{blog.url}</div>
                    <div>
                    likes {blog.likes}
                        <button onClick={handleLike}>like</button>
                    </div>
                    <div>{blog.author}</div>
                    <div><button onClick={handleDelete}>remove</button></div>
                </div>
            )}
        </div>
    )
}

export default Blog