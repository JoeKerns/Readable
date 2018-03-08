import { GET_COMMENTS, COMMENT_VOTE, COMMENT_SAVE, COMMENT_UPDATE, COMMENT_DELETE } from "../actions/actions";

const inintialState = [];

export default (state = inintialState, action) => {
  switch (action.type) {
    case GET_COMMENTS: {
      //console.log(action.comments);
      return [...action.comments];
    }
    case COMMENT_VOTE: {
      let newCommentState = [...state];
      newCommentState.map((comment, index) => {
        if (comment.id === action.payload.id) {
          newCommentState[index].voteScore = action.payload.which === 'up' ? newCommentState[index].voteScore + 1 : newCommentState[index].voteScore - 1;
          }
        return true;
        })
      return [...newCommentState];
    }
    case COMMENT_SAVE: {
      let newComments = [...state];
      newComments.push(action.payload);
      return [...newComments];
    }
    case COMMENT_UPDATE: { 
      let newCommentState = [...state];
      const key = state.findIndex(comment => comment.id === action.payload.id);
      newCommentState[key] = action.payload;
      return [...newCommentState];
    }
    case COMMENT_DELETE: {
      const newComments = state.filter(comment => comment.id !== action.id);
      return [...newComments];
    }
    default: {
      return state;
    }
  }
};