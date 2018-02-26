// ACTION
export const ADD_TO_CART = 'ADD_TO_CART';

export function addToCart(product, quantity, unitCost) {
  return {
    type: ADD_TO_CART,
    payload: { product, quantity, unitCost }
  }
}

//REDUCER

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

// DISPATCH

import { addToCart }  from '../actions/cart-actions';

class App extends Component {
  render() {
    const { cart } = this.props;
    
    let input;
    return (
      <div>
        <ul>
          { cart.map((item) => (
            <li key={item.product}>{item.product} - {item.quantity} - {item.unitCost}</li>
            ))
          }
        </ul>
        <form onSubmit={e => {
          e.preventDefault();
          if (!this.item.value.trim()) {
            return
          }
          this.props.dispatch(addToCart(this.item.value,this.qty.value,this.cost.value));
          this.item.value = '';       
          this.qty.value = ''; 
          this.cost.value = '';  
        }}>        
        
        <input ref={node => { this.item = node  }} />
        <input ref={node2 => { this.qty = node2  }} />
        <input ref={node3 => { this.cost = node3  }} />
        <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(cart) {
  return {
    cart: cart.cart.cart
  }
}

export default connect(mapStateToProps)(App);