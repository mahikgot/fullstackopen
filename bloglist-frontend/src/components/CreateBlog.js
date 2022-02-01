import React, { useState } from 'react'
const {getAll, createBlog} = require('../services/blogs');

const CreateBlog = ({setBlogs, user}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const formHandler = async ({title, author, url, setBlogs, setTitle, setAuthor, setUrl, user, e}) => {
    e.preventDefault();
    await createBlog({title, author, url, user});
    const toPut = await getAll()
    setBlogs(toPut);
    setTitle('');
    setAuthor('');
    setUrl('');
  }

  return (
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
  );
}

export default CreateBlog
