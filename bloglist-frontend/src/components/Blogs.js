import React, { useState } from 'react'
import Togglable from './Togglable'
import { addLike } from '../services/blogs'

const Blogs  = ({blogs}) => {
  const Blog = ({blog}) => {
    const [likes, setLikes] = useState(blog.likes);
    const onClickHandler = async ({blog}) => {
      const newLikes = likes + 1;
      const res = await addLike({blog, newLikes});
      setLikes(res.likes);
    }
    return (
      <div>
        {blog.title} {blog.author}
        <Togglable visibleLabel='show' hiddenLabel='hide' up={true}>
          <div>
            {blog.url}
          </div>
          <div>
            {likes}
            <button class='button' onClick={() => onClickHandler({blog})}>
              like
            </button>
          </div>
          <div>
            {blog.user.map((user) =><>{user.username}</>)}
          </div>
        </Togglable>
      </div>
    )
  }
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
