const totalLikes = (blogs) => {
  const reducer = (sum, prev) => sum + prev.likes;
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const reducer = (highest, current) => {
    if (highest < current.likes) return current.likes;
    return highest;
  };
  const highestLikes = blogs.reduce(reducer, 0);
  const favorite = blogs.find((blog) => blog.likes === highestLikes);
  const returnee = {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
  return returnee;
};

const getIds = (blogs) => {
  if (blogs[0].id) return blogs.map((blog) => blog.id);
  return blogs.map((blog) => blog._id);
};
module.exports = { totalLikes, favoriteBlog, getIds };
