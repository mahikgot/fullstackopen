import React from 'react'
const {getAll, createBlog} = require('../services/blogs');

const Blogs  = ({blogs, user, title, author, url, setBlogs, setUser, setTitle, setAuthor, setUrl}) => {
  const onClickHandler = ({setUser, e}) => {
    e.preventDefault();
    window.localStorage.removeItem('user');
    setUser(null);
  }
  const formHandler = async ({title, author, url, setBlogs, setTitle, setAuthor, setUrl, user, e}) => {
    e.preventDefault();
    await createBlog({title, author, url, user});
    const toPut = await getAll()
    setBlogs(toPut);
    setTitle('');
    setAuthor('');
    setUrl('');
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
      <div>
        <h1> Create New </h1>
        <form onSubmit={(e) => formHandler({title, author, url, setBlogs, setTitle, setAuthor, setUrl, user, e})}>
          <div>
            <label> title:
              <input
                type="text"
                name="Title"
                value={title}
                onChange={({target}) => setTitle(target.value)}
              />
            </label>
          </div>
          <div>
            <label> author:
              <input type="text" name="Author" value={author} onChange={({target}) => setAuthor(target.value)} />
            </label>
          </div>
          <div>
            <label> url:
              <input type="text" name="Url" value={url} onChange={({target}) => setUrl(target.value)} />
            </label>
          </div>
          <button type="submit">
            submit
          </button>
        </form>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}
export default Blogs
