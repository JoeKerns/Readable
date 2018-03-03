
const baseURL = `http://localhost:3001/`;
const headers = {
  Authorization: "whatever-you-want",
  "Content-Type": "application/json"
};

const urlToUse = command => `${baseURL}${command}`;

const handleResponse = response =>
  response.json().then(data => {
    return data;
  });

export const getCategories = () => fetch(urlToUse('categories'), { headers })
  .then(handleResponse);

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
  }).then(handleResponse);

export const updateCommentVote = (commentId,option) => fetch(urlToUse(`comments/${commentId}`), {
  method: "POST",
  headers,
  body: JSON.stringify({option})
  }).then(handleResponse);

export const postSaveToServer = (postData) => fetch(urlToUse(`posts`), {
  method: "POST",
  headers,
  body: postData
  }).then(handleResponse);

export const postUpdateToServer = (id, title, body) => fetch(urlToUse(`posts/${id}`), { 
  method: "PUT",
  headers,
  body: JSON.stringify({ title, body })
  }).then(handleResponse);

export const deletePostFromServer = (id) => fetch(urlToUse(`posts/${id}`), {
  method: "DELETE",
  headers,
  body: JSON.stringify({id})
  }).then(handleResponse);

export const commentSaveToServer = (commentData) => fetch(urlToUse(`comments`), {
  method: "POST",
  headers,
  body: commentData
  }).then(handleResponse);

export const commentUpdateToServer = (id, timestamp, body) => fetch(urlToUse(`comments/${id}`), { 
  method: "PUT",
  headers,
  body: JSON.stringify({ timestamp, body })
  }).then(handleResponse);

export const deleteCommentFromServer = (id) => fetch(urlToUse(`comments/${id}`), {
  method: "DELETE",
  headers,
  body: JSON.stringify({id})
  }).then(handleResponse);