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
          <button class='button'>
            like
          </button>
        </div>
        <div>
          {blog.user.map((user) =><>{user.username}</>)}
        </div>
      </Togglable>
    </div>
  )
  const style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-evenly'

  }
  return (
    <div>
      <h2>blogs</h2>
      <div style={style}>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}
export default Blogs
