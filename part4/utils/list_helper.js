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

const mostBlogs = (blogs) => {
  const names = blogs.map(({ author }) => author);
};
module.exports = { totalLikes, favoriteBlog };
