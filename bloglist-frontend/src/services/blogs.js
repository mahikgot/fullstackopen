import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () =>  {
  const request = await axios.get(baseUrl)
  return request.data
}

const createBlog = async ({title, author, url, user}) => {
  const config = {
      headers: { Authorization: `Bearer ${user.token}` }
  };
  const request = await axios.post(baseUrl, {title, author, url}, config);
  return request.data;
}

const addLike = async ({blog, newLikes}) => {
  const request = await axios.put(`${baseUrl}/${blog.id}`, {...blog, user:[blog.user.id], likes: newLikes});
  return request.data;
}

export {getAll, createBlog, addLike}
