import React from 'react'

const Blogs  = ({blogs}) => {
  const Blog = ({blog}) => (
    <div>
      {blog.title} {blog.author}
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
