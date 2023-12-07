const catchAsync = require('../utils/catchAsync');
const axios = require('axios');

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const optionsCreator = (method, body) => {
  const options = {
    method: method.toUpperCase(),
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  };

  if (body) options.body = JSON.stringify(body);
};

// exports.fetchPosts = catchAsync(async (req, res, next) => {
//   const options = optionsCreator('get');
//   const url = 'https://jsonplaceholder.typicode.com/posts';

//   const postsResponse = await fetch(url, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   console.log(postsResponse);
//   const posts = postsResponse.json();

//   res.status(200).json({
//     status: 'success',
//     length: posts.length,
//     data: {
//       posts,
//     },
//   });
// });

exports.fetchPosts = catchAsync(async (req, res, next) => {
  const { data: posts } = await axios.get(
    'https://jsonplaceholder.typicode.com/posts',
    {
      headers: {
        'content-type': 'application/json',
      },
    }
  );

  console.log({ posts });

  res.status(200).json({
    status: 'success',
    length: posts.length,
    data: {
      posts,
    },
  });
});
