import React, { useState, useEffect } from 'react'
import blogsComp from './components/Blog'
import blogService from './services/blogs'
import loginComp from './components/Login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const currentUser = window.localStorage.getItem('user');
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, [])

  return (
    <>
      {user === null && loginComp({
        username,
        password,
        setUsername,
        setPassword,
        setUser,
      })}
      {user !== null && blogsComp({blogs, user, setUser})}
    </>
  )
}

export default App
