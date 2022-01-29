import React, { useState, useEffect } from 'react'
import blogsComp from './components/Blog'
import blogService from './services/blogs'
import loginComp from './components/Login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  return (
    <>
      {user === null && loginComp({
        username: username,
        password: password,
        setUsername: setUsername,
        setPassword: setPassword,
      })}
      {user !== null && blogsComp(blogs)}
    </>
  )
}

export default App
