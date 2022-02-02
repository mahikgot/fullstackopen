import React, { useState, useEffect } from 'react'
import useAsyncEffect from 'use-async-effect'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Logout from './components/Logout'
import CreateBlog from './components/CreateBlog'
import UserVisible from './components/UserVisible'
import UserHidden from './components/UserHidden'
import Togglable from './components/Togglable'
const {getAll} = require('./services/blogs')

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState({})

  useAsyncEffect(async () => {
    const getted = await getAll();
    setBlogs(getted);
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
        <Togglable visibleLabel='create new blog' hiddenLabel='cancel' up={false}>
          <CreateBlog setBlogs={(props) => setBlogs(props)} user={user} />
        </Togglable>
        <Blogs blogs={blogs} />
      </UserVisible>
    </>
  )
}

export default App
