const catchAsync = require('../utils/catchAsync');
const axios = require('axios');

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

exports.fetchPosts = catchAsync(async (req, res, next) => {
  const { data: posts } = await axios.get(
    'https://jsonplaceholder.typicode.com/posts',
    {
      headers: {
        'content-type': 'application/json',
      },
    }
  );

  res.status(200).json({
    status: 'success',
    length: posts.length,
    data: {
      posts,
    },
  });
});
