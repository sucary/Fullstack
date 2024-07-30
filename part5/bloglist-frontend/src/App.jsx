import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

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

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
          setBlogs(blogs.concat(returnedBlog))
          setNewBlog({
              title: '',
              author: '',
              url: ''
            })          
        })

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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )



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
       {blogForm()}
      </div>
      } 
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}


export default App