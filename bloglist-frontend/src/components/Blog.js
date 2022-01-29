import React from 'react'

const Blog = ({blog}) => (
  <div>
    {blog.title} {blog.author}
  </div>
)

const blogComp  = ({blogs}) => {
  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}
export default blogComp
