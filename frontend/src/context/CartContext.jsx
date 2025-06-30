
import React, { createContext, useReducer, useEffect, useContext, act } from "react";

 const CartContext = createContext();

const getinitialstate = () => {
  const storedCart = localStorage.getItem("cartItems");

  const parsed = storedCart ? JSON.parse(storedCart) : [];

  // Ensure each item has a quantity
  const cartItems = parsed.map(item => ({
    ...item,
    quantity: item.quantity ?? 1
  }));

  const totalItems = cartItems.reduce((acc, item) => acc + Number(item.quantity), 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + Number(item.price) * Number(item.quantity), 0);

  return {
    cartItems,
    totalItems,
    totalPrice
  };
};

const intialstate = getinitialstate();




const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const item = action.payload;
      const existingitem = state.cartItems.find((cartitem) => {
        return cartitem.id === item.id;
      });
      let updatedCartItems ;
      if (existingitem) {
        updatedCartItems=state.cartItems.map((cartitem) =>
      cartitem.id === item.id ? { ...cartitem, quantity: cartitem.quantity + 1 } : cartitem
    );
      }
      else{
        updatedCartItems=[...state.cartItems, { ...item, quantity: 1 }];
      }
      const totalItems = updatedCartItems.reduce((total, item) => total + Number(item.quantity), 0);
      const totalPrice = updatedCartItems.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0);
      return {...state,
        cartItems:updatedCartItems, 
        totalItems:totalItems, 
        totalPrice:totalPrice}; // Return the updated state with new cartItems
         
         
      
    }
    case "REMOVE_FROM_CART": {
      const itemid = action.payload;
      const updatedCartItems = state.cartItems.filter((cartitem) => cartitem.id !== itemid);
const totalItems = updatedCartItems.reduce((total, item) => total + Number(item.quantity), 0);
      const totalPrice = updatedCartItems.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0);
      return {
        cartItems: updatedCartItems, // Update cartItems by filtering out the item to be removed
        totalItems: totalItems, // Update total items count
        totalPrice: totalPrice, // Update total price
      };
       
    }
    case "INCREASE_QUANTITY": {
      const itemid=action.payload; 
      const updatedCartItems = state.cartItems.map((item) => {
        if(item.id===itemid){
          return {...item,quantity:item.quantity+1}; 
        }
        else{
          return item; 
        }
      })
      return {
        cartItems: updatedCartItems, // Update cartItems with increased quantity
         totalItems : updatedCartItems.reduce((total, item) => total + Number(item.quantity), 0),
       totalPrice :updatedCartItems.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0),
      }
    }
    case "DECREASE_QUANTITY": {
      const itemId = action.payload; // Get the item ID from the action payload

      const updatedcartitems=state.cartItems.map((item)=>{
        if(item.id === itemId && item.quantity > 0) {
          return { ...item, quantity: item.quantity - 1 }; // Decrease the quantity of the item
        }
        else{
          return item; 
        }

      }).filter((item)=>{
        return item.quantity>0

      })
      const totalItems = updatedcartitems.reduce((total, item) => total + Number(item.quantity), 0);
      const totalPrice = updatedcartitems.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0);

      return {
        cartItems: updatedcartitems, // Update cartItems by filtering out the item to be removed
        totalItems: totalItems, // Update total items count
        totalPrice: totalPrice, // Update total price
      }
    }
    case "CLEAR_CART": {
      return {
        cartItems: [], // Clear the cart by setting cartItems to an empty array
        totalItems: 0, // Reset total items count
        totalPrice: 0, // Reset total price 
      };
    }

    default:
      return state; // Return the current state if no action matches
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, intialstate);
  // Save to localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  }, [state.cartItems]);
  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
 
};
function useCart(){
    const context=useContext(CartContext);
    if(!context){
      throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
export{useCart}
