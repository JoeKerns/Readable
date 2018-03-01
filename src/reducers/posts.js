import { GET_POSTS, POST_VOTE, POST_SAVE } from "../actions/actions";

const inintialState = [];

export default (state = inintialState, action) => {
  switch (action.type) {
    case GET_POSTS: {
      return [...action.posts];
    }
    case POST_VOTE: {
      let newPostState = [...state];
      newPostState.map((post, index) => {
        if (post.id === action.payload.id) {
          newPostState[index].voteScore = action.payload.which === 'up' ? newPostState[index].voteScore + 1 : newPostState[index].voteScore - 1;
          }
        return true;
      })
      return [...newPostState];
    }
    case POST_SAVE: {
      let newPosts = [...state];
      if (action.payload.newPost === true) {
        newPosts.push(action.payload);
      }
      else {
        newPosts.map((post, index) => {
          if (post.id === action.payload.id) {
            // i think there should be a way to spread newPosts[index] then overwrite just the elements that are updated
            // which is author, title, body, and category
            // this creates a whole new object that is not quite right.
            newPosts[index] = {
              id: action.payload.id,
              timestamp: Date.now(),
              author: action.payload.author,
              title: action.payload.title,
              body: action.payload.body,
              category: action.payload.category,
              voteScore: newPosts[index].voteScore,
              deleted: newPosts[index].deleted,
              commentCount: newPosts[index].commentCount              
            };
          }
          return true;
        })
      }
      
      return [...newPosts];
      //return state; // for now
    }
    default: {
      return state;
    }
  }
};