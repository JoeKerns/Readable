export const ADD_CATEGORY = 'ADD_CATEGORY';
export const ADD_POST = 'ADD_POST';
export const VOTE = 'VOTE';
export const COMMENTS_ADD = 'COMMENTS_ADD';

/*
export const ADD_TO_CART = 'ADD_TO_CART';

export function addToCart(product, quantity, unitCost) {
  return {
    type: ADD_TO_CART,
    payload: { product, quantity, unitCost }
  }
}
*/

export function categoryAdd( name, path ) {
  return {
    type: ADD_CATEGORY,
    payload: { name, path }
  }
}


/*export function postReducer(post) {
	return {
    type: ADD_POST,
    payload: { post },
  }
}*/

export function postAdd(post) {
	return {
    type: ADD_POST,
    payload: { post },
  }
}

export function vote(id,which) {
  return {
    type: VOTE,
    payload: {id,which},
  }
}

export function commentsAdd(comments) {
  return {
    type: COMMENTS_ADD,
    payload: { comments },
  }
}