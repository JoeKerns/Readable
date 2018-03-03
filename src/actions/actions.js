import * as api from '../utils/api';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_POSTS = 'GET_POSTS';
export const POST_VOTE = 'POST_VOTE';
export const POST_SAVE = 'POST_SAVE';
export const POST_UPDATE = 'POST_UPDATE';
export const POST_DELETE = 'POST_DELETE';
export const GET_COMMENTS = 'GET_COMMENTS';
export const COMMENT_SAVE = 'COMMENT_SAVE';
export const COMMENT_VOTE = 'COMMENT_VOTE';
export const COMMENT_UPDATE = 'COMMENT_UPDATE';
export const COMMENT_DELETE = 'COMMENT_DELETE';

export const categoriesGet = () => dispatch =>
  api.getCategories()
    .then(({ categories }) => 
      dispatch({
        type: GET_CATEGORIES,
        categories
      })
    );

export const postsGet = () => dispatch =>
  api.getPosts()
    .then(({ posts }) => 
      dispatch({
        type: GET_POSTS,
        posts
      })
    );

export const postVote = (id,which) => dispatch =>
  dispatch({
    type: POST_VOTE,
    payload: {id,which}
  });

export const postSave = (postData) => dispatch =>
  dispatch({
    type: POST_SAVE,
    payload: postData
  });

export const postUpdate = (postData) => dispatch =>
  dispatch({
    type: POST_UPDATE,
    payload: postData
  });

export const postDelete = (postId) => dispatch =>
  dispatch({
    type: POST_DELETE,
    id: postId
  });

export const commentsGet = (postId) => dispatch =>
  api.getComments(postId)
    .then(({ comments }) =>
      dispatch({
        type: GET_COMMENTS,
        comments
      })
    );

export const commentUpdate = (commentData) => dispatch =>
  dispatch({
    type: COMMENT_UPDATE,
    payload: commentData
  });  

export const commentSave = (commentData) => dispatch =>
  dispatch({
    type: COMMENT_SAVE,
    payload: commentData
  });

export const commentVote = (id,which) => dispatch =>
  dispatch({
    type: COMMENT_VOTE,
    payload: {id,which}
  });

export const commentDelete = (commentId) => dispatch =>
  dispatch({
    type: COMMENT_DELETE,
    id: commentId
  });