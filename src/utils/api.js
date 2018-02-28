const baseURL = `http://localhost:3001/`;
const headers = {
  Authorization: "whatever-you-want",
  "Content-Type": "application/json"
};

const urlToUse = command => `${baseURL}${command}`;

export const getCategories = () => fetch(urlToUse('categories'), { headers })
  .then((response) =>{ return(response.json())})
  .then((data) => {
    return data;
  });

export const getPosts = () => fetch(urlToUse('posts'), { headers })
  .then((response) =>{ return(response.json())})
  .then((data) => {
    return {
      posts: data
    };
  });

export const getComments = (postId) => fetch(urlToUse(`posts/${postId}/comments`), { headers })
  .then((response) =>{ return(response.json())})
  .then((data) => {
    return {
      comments: data
    };
  });

export const updatePostVote = (postId,option) => fetch(urlToUse(`posts/${postId}`), {
  method: "POST",
  headers,
  body: JSON.stringify({option})
  }).then((response) =>{ return(response.json())})
    .then((data) => {
      //console.log('returned data',data);
    });

export const updateCommentVote = (commentId,option) => fetch(urlToUse(`comments/${commentId}`), {
  method: "POST",
  headers,
  body: JSON.stringify({option})
  }).then((response) =>{ return(response.json())})
    .then((data) => {
      //console.log('returned data',data);
    });

export const postSaveToServer = (postData) => fetch(urlToUse(`posts`), {
  method: "POST",
  headers,
  body: postData
  }).then((response) =>{ return(response.json())})
  .then((data) => {
    console.log('returned data',data);
  });

export const commentSaveToServer = (commentData) => fetch(urlToUse(`comments`), {
  method: "POST",
  headers,
  body: commentData
  }).then((response) =>{ return(response.json())})
  .then((data) => {
    console.log('returned data',data);
  });