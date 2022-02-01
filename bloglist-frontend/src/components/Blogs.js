import React from 'react'
import Togglable from './Togglable'

const Blogs  = ({blogs}) => {
  const Blog = ({blog}) => (
    <div>
      <Togglable visibleLabel='show' hiddenLabel='hide'>
        {blog.title} {blog.author}
      </Togglable>
    </div>
  )
  return (
    <div>
      <h2>blogs</h2>
            {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}
export default Blogs
