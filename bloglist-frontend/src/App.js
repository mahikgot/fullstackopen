import React, { useState, useEffect } from 'react'
import Blogs from './components/Blog'
import loginComp from './components/Login'
const {getAll} = require('./services/blogs')

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    getAll().then(blogs =>
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
      {user !== null && Blogs({
        blogs,
        user,
        title,
        author,
        url,
        setBlogs,
        setUser,
        setTitle,
        setAuthor,
        setUrl
      })}
    </>
  )
}

export default App
