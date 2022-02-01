import React from 'react'

const Blogs  = ({blogs, user, setUser}) => {
  const onClickHandler = ({setUser, e}) => {
    e.preventDefault();
    window.localStorage.removeItem('user');
    setUser(null);
  }

  const Blog = ({blog}) => (
    <div>
      {blog.title} {blog.author}
    </div>
  )
  return (
    <div>
      <h2>blogs</h2>
      <div>
        {user.username}
        <button onClick={(e) => onClickHandler({setUser, e})}>
          logout
        </button>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}
export default Blogs
