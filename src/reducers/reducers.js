import { combineReducers } from 'redux'

import { ADD_POST, ADD_CATEGORY, VOTE, COMMENTS_ADD } from '../actions/actions';

/*
export default function(state=initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      return {
        ...state,
        cart: [...state.cart, action.payload]
      }
    }
    
    default:
      return state;
  }
}
*/

const categoryInitialState = {
  category: [
    {
      name: null,
      path: null,
    },
  ]
}

function categoryReducer(state = { category: [{}] }, action) {
  switch(action.type) {
    case ADD_CATEGORY: {
      return {
        ...state,
        category: [...state.category,action.payload],
      }
    }

    default:
      return state;
  }
}

const postInitialState = {
  posts: [
    {
      id: null,
      body: null,
      category: null,
      commentCount: null,
      deleted: false,
      timestamp: null,
      title: null,
      voteScore: null,
    }    
  ]
}

function postReducer(state = { posts: [{}]  }, action) {
	switch(action.type) {
      case ADD_POST:      
        const { author, body, category, commentCount, deleted, id, timestamp, title, voteScore } = action.payload.post; 
        return {
        	...state,
          posts: [...state.posts,{author,body,category,commentCount,deleted,id,timestamp,title,voteScore}]
        }
      case VOTE:
        const postIndex = state.posts.findIndex(post => post.id === action.payload.id); // finds the correct post index
        let newPostState = [...state.posts];
        newPostState[postIndex].voteScore = action.payload.which === 'up' ? newPostState[postIndex].voteScore + 1 : newPostState[postIndex].voteScore - 1;
        return {
          posts: [...newPostState],
        }
      default:
        return state;
    }
}

function commentsReducer(state = { comments: [{}]  },action) {
  switch(action.type) {
    case COMMENTS_ADD:
      //console.log('comments_add: ',action);
      return {
        ...state,
        comments: [...state.comments,action.payload.comments],
      }
    
    default: 
      return state;
  }
}

export default combineReducers({
  categoryReducer,
  postReducer,
  commentsReducer,
});