import React, { useState, useEffect } from 'react'
import Blogs from './components/Blog'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
const {getAll} = require('./services/blogs')

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

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
      <CreateBlog setBlogs={(props) => setBlogs(props)} user={user} />
      {user !== null && Blogs({
        blogs,
        user,
        setUser
      })}
    </>
  )
}

export default App
