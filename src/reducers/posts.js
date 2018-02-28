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
      newPosts.push(action.payload);
      return [...newPosts];
    }
    default: {
      return state;
    }
  }
};