import React from 'react'
import Togglable from './Togglable'

const Blogs  = ({blogs}) => {
  const Blog = ({blog}) => (
    <div>
      {blog.title} {blog.author}
      <Togglable visibleLabel='show' hiddenLabel='hide' up={true}>
        <div>
          {blog.url}
        </div>
        <div>
          {blog.likes}
        </div>
        <div>
          {blog.user.map((user) =><>{user.username}</>)}
        </div>
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
