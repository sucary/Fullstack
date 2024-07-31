import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const [loginVisible, setLoginVisible] = useState(false)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a,b) => parseFloat(b.likes) - parseFloat(a.likes))))  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (event) => {
    event.preventDefault()
    
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    }
    
    blogService
      .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs
            .concat(returnedBlog)
            .sort((a, b) => parseFloat(b.likes) - parseFloat(a.likes))
          )
          setNewBlog({
              title: '',
              author: '',
              url: ''
            })          
        })

    blogFormRef.current.toggleVisibility()



    setNotification(
      {
        message: `a new blog "${newBlog.title}" by ${newBlog.author} added`,
        type: 'success'
      }
    )
    setTimeout(() => {
      setNotification(null)
    }, 5000)

  }

  const deleteBlog = (id) => {
    const blog = blogs.find(b => b.id === id)
    console.log(`Blog "${blog.title}" needs to be deleted`)
    if (!blog) return

    if (window.confirm(`Confirm deleting ${blog.title}?`)){
      blogService
        .remove(id)
        .then(() => {
          console.log(`Blog ${blog.title} deleted successfully`)
          setBlogs(blogs.filter(b => b.id !== id))
          setNotification(
            {
              message: `${blog.title} deleted successfully`,
              type: 'success'
            }
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error => {
          setNotification(
            {
              message: `Error deleting ${person.name}`,
              type: 'error'
            }
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
      }
    }
  


  const updateBlog = (updatedBlog) => {
    setBlogs(blogs.
      map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
      .sort((a, b) => parseFloat(b.likes) - parseFloat(a.likes)))
  }

  const handleLogin = async (event) => {
      event.preventDefault()
      
      try {
        const user = await loginService.login({
          username, password,
        })

        window.localStorage.setItem(
          'loggedBlogUser', JSON.stringify(user)
        ) 

      blogService.setToken(user.token)
        setUser(user)
        setUsername('')
        setPassword('')
    } catch (exception) {
        setNotification({
          message: 'wrong password or username',
          type: 'error'
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
    }
  }

  const handleBlogChange = (event) => {
    const { name, value } = event.target
    setNewBlog(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
    blogService.setToken(null)
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }



  const blogForm = () => (

    <form onSubmit={addBlog}>
      <div>
        Title: 
        <input
          name = "title"
          value={newBlog.title}
          onChange={handleBlogChange}
        />
      </div>

      <div>
        Author: 
        <input
          name = "author"
          value = {newBlog.author}
          onChange={handleBlogChange}
        />
      </div>

      <div>      
        URL: 
        <input
          name = "url"
          value = {newBlog.url}
          onChange={handleBlogChange}
        />
      </div>

      <button type="submit">create</button>
    </form>  
  )

  if (user === null) {
    console.log("User not logged in")
    return (
      <div>
        <Notification message={notification?.message} type={notification?.type} />
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification?.message} type={notification?.type} />

      {!user && loginForm()}
      {user && <div>
       <p>{user.name} logged in 
        <button onClick = {handleLogout}>
          logout
        </button>
       </p>
       <Togglable buttonLabel = "new blog" ref={blogFormRef}>
        {blogForm()}
       </Togglable>
       
      </div>
      } 
      {blogs.map(blog => (
        <Blog 
          key={blog.id} 
          blog={blog}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
        />
      ))}
    </div>
  )
}


export default App