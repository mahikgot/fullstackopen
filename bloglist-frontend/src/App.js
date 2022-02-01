import React, { useState, useEffect } from 'react'
import Blogs from './components/Blog'
import Login from './components/Login'
import Logout from './components/Logout'
import CreateBlog from './components/CreateBlog'
import UserVisible from './components/UserVisible'
import UserHidden from './components/UserHidden'
const {getAll} = require('./services/blogs')

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState({})

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
      <UserHidden user={user}>
        <Login setUser={(props) => setUser(props)} />
      </UserHidden>
      <UserVisible user={user}>
        <Logout user={user} setUser={(props) => setUser(props)} />
        <CreateBlog setBlogs={(props) => setBlogs(props)} user={user} />
        <Blogs blogs={blogs} />
      </UserVisible>
    </>
  )
}

export default App
