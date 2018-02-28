import { GET_CATEGORIES } from "../actions/actions";

const inintialState = [];

export default (state = inintialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES: {
      return [...action.categories];
    }
    default: {
      return state;
    }
  }
};