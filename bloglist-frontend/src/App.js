import React, { useState, useEffect } from 'react'
import Blogs from './components/Blog'
import Login from './components/Login'
const {getAll} = require('./services/blogs')

const App = () => {
  const [blogs, setBlogs] = useState([])
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
      <Login setUser={(props) => setUser(props)} />
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
