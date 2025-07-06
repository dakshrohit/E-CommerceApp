// import React, {
//   createContext,
//   useReducer,
//   useEffect,
//   useContext,
//   act,
// } from "react";

// const CartContext = createContext();

// const getinitialstate = () => {
//   const storedCart = localStorage.getItem("cartItems");

//   const parsed = storedCart ? JSON.parse(storedCart) : [];

//   // Ensure each item has a quantity
//   const cartItems = parsed.map((item) => ({
//     ...item,
//     quantity: item.quantity ?? 1,
//   }));

//   const totalItems = cartItems.reduce(
//     (acc, item) => acc + Number(item.quantity),
//     0
//   );
//   const totalPrice = cartItems.reduce(
//     (acc, item) => acc + Number(item.price) * Number(item.quantity),
//     0
//   );

//   return {
//     cartItems,
//     totalItems,
//     totalPrice,
//   };
// };

// const intialstate = getinitialstate();

// const cartReducer = (state, action) => {
//   switch (action.type) {
//     case "ADD_TO_CART": {
//       const item = action.payload;
//       const existingitem = state.cartItems.find((cartitem) => {
//         return cartitem.id === item.id;
//       });
//       let updatedCartItems;
//       if (existingitem) {
//         updatedCartItems = state.cartItems.map((cartitem) =>
//           cartitem.id === item.id
//             ? { ...cartitem, quantity: cartitem.quantity + 1 }
//             : cartitem
//         );
//       } else {
//         updatedCartItems = [...state.cartItems, { ...item, quantity: 1 }];
//       }
//       const totalItems = updatedCartItems.reduce(
//         (total, item) => total + Number(item.quantity),
//         0
//       );
//       const totalPrice = updatedCartItems.reduce(
//         (total, item) => total + Number(item.price) * Number(item.quantity),
//         0
//       );
//       return {
//         ...state,
//         cartItems: updatedCartItems,
//         totalItems: totalItems,
//         totalPrice: totalPrice,
//       }; // Return the updated state with new cartItems
//     }
//     case "REMOVE_FROM_CART": {
//       const itemid = action.payload;
//       const updatedCartItems = state.cartItems.filter(
//         (cartitem) => cartitem.id !== itemid
//       );
//       const totalItems = updatedCartItems.reduce(
//         (total, item) => total + Number(item.quantity),
//         0
//       );
//       const totalPrice = updatedCartItems.reduce(
//         (total, item) => total + Number(item.price) * Number(item.quantity),
//         0
//       );
//       return {
//         cartItems: updatedCartItems, // Update cartItems by filtering out the item to be removed
//         totalItems: totalItems, // Update total items count
//         totalPrice: totalPrice, // Update total price
//       };
//     }
//     case "INCREASE_QUANTITY": {
//       const itemid = action.payload;
//       const updatedCartItems = state.cartItems.map((item) => {
//         if (item.id === itemid) {
//           return { ...item, quantity: item.quantity + 1 };
//         } else {
//           return item;
//         }
//       });
//       return {
//         cartItems: updatedCartItems, // Update cartItems with increased quantity
//         totalItems: updatedCartItems.reduce(
//           (total, item) => total + Number(item.quantity),
//           0
//         ),
//         totalPrice: updatedCartItems.reduce(
//           (total, item) => total + Number(item.price) * Number(item.quantity),
//           0
//         ),
//       };
//     }
//     case "DECREASE_QUANTITY": {
//       const itemId = action.payload; // Get the item ID from the action payload

//       const updatedcartitems = state.cartItems
//         .map((item) => {
//           if (item.id === itemId && item.quantity > 0) {
//             return { ...item, quantity: item.quantity - 1 }; // Decrease the quantity of the item
//           } else {
//             return item;
//           }
//         })
//         .filter((item) => {
//           return item.quantity > 0;
//         });
//       const totalItems = updatedcartitems.reduce(
//         (total, item) => total + Number(item.quantity),
//         0
//       );
//       const totalPrice = updatedcartitems.reduce(
//         (total, item) => total + Number(item.price) * Number(item.quantity),
//         0
//       );

//       return {
//         cartItems: updatedcartitems, // Update cartItems by filtering out the item to be removed
//         totalItems: totalItems, // Update total items count
//         totalPrice: totalPrice, // Update total price
//       };
//     }
//     case "CLEAR_CART": {
//       return {
//         cartItems: [], // Clear the cart by setting cartItems to an empty array
//         totalItems: 0, // Reset total items count
//         totalPrice: 0, // Reset total price
//       };
//     }

//     default:
//       return state; // Return the current state if no action matches
//   }
// };

// export const CartProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(cartReducer, intialstate);
//   // Save to localStorage whenever cartItems change
//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
//   }, [state.cartItems]);
//   const syncCartAfterLogin = async () => {
//     const localCart = JSON.parse(localStorage.getItem("cartItems")) || [];
//     try {
//       const res = await fetch("/api/cart", {
//         credentials: "include",
//       });
//       const data = await res.json();
//       const serverCart = data?.data?.items || [];
//       const merged = [...localCart];
//       for (let item of serverCart) {
//         if (!merged.find((i) => i.productId === item.productId._id)) {
//           merged.push({
//             productId: item.productId._id,
//             quantity: item.quantity,
//           });
//         }
//       }

//       await fetch("/api/cart/clear", {
//         method: "DELETE",
//         credentials: "include",
//       });
//       for (let item of merged) {
//         await fetch("/api/cart/add", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           credentials: "include",
//           body: JSON.stringify(item),
//         });
//       }
//       localStorage.removeItem("cart");
//       fetchCart();
//     } catch (error) {
//       console.error("Error syncing cart after login:", error);
//     }
//   };
//   return (
//     <CartContext.Provider value={{ ...state, dispatch, syncCartAfterLogin }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// function useCart() {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// }
// export { useCart };



// import React, { createContext, useReducer, useEffect, useContext } from "react";

// const CartContext = createContext();

// // ---------- Initial Cart State ----------
// const getInitialState = () => {
//   const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
//   const cartItems = storedCart.map((item) => ({
//     ...item,
//     quantity: item.quantity ?? 1,
//   }));

//   const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
//   const totalPrice = cartItems.reduce(
//     (acc, item) => acc + item.quantity * item.price,
//     0
//   );

//   return { cartItems, totalItems, totalPrice };
// };

// const initialState = getInitialState();

// // ---------- Reducer ----------
// const cartReducer = (state, action) => {
//   switch (action.type) {
//     case "ADD_TO_CART": {
//       const item = action.payload;
//       const existingItem = state.cartItems.find(
//         (i) => i.productId === item.productId
//       );
//       let updatedCartItems;

//       if (existingItem) {
//         updatedCartItems = state.cartItems.map((i) =>
//           i.productId === item.productId
//             ? { ...i, quantity: i.quantity + 1 }
//             : i
//         );
//       } else {
//         updatedCartItems = [...state.cartItems, { ...item, quantity: 1 }];
//       }

//       const totalItems = updatedCartItems.reduce((t, i) => t + i.quantity, 0);
//       const totalPrice = updatedCartItems.reduce(
//         (t, i) => t + i.price * i.quantity,
//         0
//       );

//       return { cartItems: updatedCartItems, totalItems, totalPrice };
//     }

//     case "REMOVE_FROM_CART": {
//       const updatedCartItems = state.cartItems.filter(
//         (i) => i.productId !== action.payload
//       );
//       const totalItems = updatedCartItems.reduce((t, i) => t + i.quantity, 0);
//       const totalPrice = updatedCartItems.reduce(
//         (t, i) => t + i.price * i.quantity,
//         0
//       );
//       return { cartItems: updatedCartItems, totalItems, totalPrice };
//     }

//     case "INCREASE_QUANTITY": {
//       const updatedCartItems = state.cartItems.map((i) =>
//         i.productId === action.payload ? { ...i, quantity: i.quantity + 1 } : i
//       );
//       const totalItems = updatedCartItems.reduce((t, i) => t + i.quantity, 0);
//       const totalPrice = updatedCartItems.reduce(
//         (t, i) => t + i.price * i.quantity,
//         0
//       );
//       return { cartItems: updatedCartItems, totalItems, totalPrice };
//     }

//     case "DECREASE_QUANTITY": {
//       const updatedCartItems = state.cartItems
//         .map((i) =>
//           i.productId === action.payload && i.quantity > 1
//             ? { ...i, quantity: i.quantity - 1 }
//             : i
//         )
//         .filter((i) => i.quantity > 0);

//       const totalItems = updatedCartItems.reduce((t, i) => t + i.quantity, 0);
//       const totalPrice = updatedCartItems.reduce(
//         (t, i) => t + i.price * i.quantity,
//         0
//       );
//       return { cartItems: updatedCartItems, totalItems, totalPrice };
//     }

//     case "CLEAR_CART":
//       return { cartItems: [], totalItems: 0, totalPrice: 0 };

//     default:
//       return state;
//   }
// };
// const removeCartItemFromServer = async (productId) => {
//   try {
//     const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:4000";
//     await fetch(`${base_url}/api/cart/remove/${productId}`, {
//       method: "DELETE",
//       credentials: "include",
//     });
//   } catch (error) {
//     console.error("Failed to remove item from backend:", error);
//   }
// };

// const updateCartItemOnServer = async (productId, quantity) => {
//   try {
//     const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:4000";
//     await fetch(`${base_url}/api/cart/update`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       credentials: "include",
//       body: JSON.stringify({ productId, quantity }),
//     });
//   } catch (error) {
//     console.error("Failed to update quantity on backend:", error);
//   }
// };

// // ---------- Provider ----------
// const CartProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(cartReducer, initialState);

//   // ---------- Persist to localStorage ----------
//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
//   }, [state.cartItems]);

//   // ---------- Fetch Cart From Server ----------
//   const fetchCart = async () => {
//     try {
//       const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:4000";

//       const res = await fetch(`${base_url}/api/cart`, {
//         credentials: "include",
//       });
//       const data = await res.json();
//       const items = data?.data?.items || [];

//       const cartItems = items.map((item) => ({
//         productId: item.productId._id,
//         name: item.productId.name,
//         price: item.productId.price,
//         image: item.productId.image,
//         quantity: item.quantity,
//       }));

//       dispatch({ type: "CLEAR_CART" });
//       cartItems.forEach((item) => {
//         dispatch({ type: "ADD_TO_CART", payload: item });
//       });
//     } catch (err) {
//       console.error("Failed to fetch cart:", err);
//     }
//   };

//   // ---------- Sync Cart After Login ----------
//   const syncCartAfterLogin = async () => {
//     const localCart = JSON.parse(localStorage.getItem("cartItems")) || [];

//     try {
//       const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:4000";

//       const res = await fetch(`${base_url}/api/cart`, {
//         credentials: "include",
//       });
//       const data = await res.json();
//       const serverCart = data?.data?.items || [];

//       let merged = localCart.map((i) => ({
//         productId: i.productId || i.id,
//         quantity: i.quantity,
//       }));

//       for (let item of serverCart) {
//         if (!merged.find((i) => i.productId === item.productId._id)) {
//           merged.push({
//             productId: item.productId._id,
//             quantity: item.quantity,
//           });
//         }
//       }

//       await fetch(`${base_url}/api/cart/clear`, {
//         method: "DELETE",
//         credentials: "include",
//       });

//       for (let item of merged) {
//         await fetch(`${base_url}/api/cart/add`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           credentials: "include",
//           body: JSON.stringify(item),
//         });
//       }

//       localStorage.removeItem("cartItems");
//       await fetchCart();
//     } catch (error) {
//       console.error("Error syncing cart after login:", error);
//     }
//   };

//   return (
//     <CartContext.Provider value={{ ...state, dispatch, syncCartAfterLogin }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// // ---------- Hook ----------
// const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) throw new Error("useCart must be used within a CartProvider");
//   return context;
// };
// export { CartProvider, useCart };

import React, { createContext, useReducer, useEffect, useContext } from "react";

const CartContext = createContext();
const base_url = import.meta.env.VITE_BASE_URL || "http://localhost:4000";

// ---------- Initial State ----------
const getInitialState = () => {
  const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartItems = storedCart.map((item) => ({
    ...item,
    quantity: item.quantity ?? 1,
  }));

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return { cartItems, totalItems, totalPrice };
};

const initialState = getInitialState();

// ---------- Reducer ----------
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const item = action.payload;
      const exists = state.cartItems.find((i) => i.productId === item.productId);
      const cartItems = exists
        ? state.cartItems.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          )
        : [...state.cartItems, { ...item, quantity: item.quantity }];
      const totalItems = cartItems.reduce((t, i) => t + i.quantity, 0);
      const totalPrice = cartItems.reduce((t, i) => t + i.quantity * i.price, 0);
      return { cartItems, totalItems, totalPrice };
    }

    case "REMOVE_FROM_CART": {
      const cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload
      );
      const totalItems = cartItems.reduce((t, i) => t + i.quantity, 0);
      const totalPrice = cartItems.reduce((t, i) => t + i.quantity * i.price, 0);
      return { cartItems, totalItems, totalPrice };
    }

    case "UPDATE_QUANTITY": {
      const { productId, quantity } = action.payload;
      const cartItems = state.cartItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      );
      const totalItems = cartItems.reduce((t, i) => t + i.quantity, 0);
      const totalPrice = cartItems.reduce((t, i) => t + i.quantity * i.price, 0);
      return { cartItems, totalItems, totalPrice };
    }

    case "CLEAR_CART":
      return { cartItems: [], totalItems: 0, totalPrice: 0 };

    default:
      return state;
  }
};

// ---------- Cart Provider ----------
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  // Fetch from backend
  const fetchCart = async () => {
    try {
      const res = await fetch(`${base_url}/api/cart`, {
        credentials: "include",
      });
      const data = await res.json();
      const items = data?.data?.items || [];

      dispatch({ type: "CLEAR_CART" });
      for (let item of items) {
        dispatch({
          type: "ADD_TO_CART",
          payload: {
            productId: item.productId._id,
            name: item.productId.name,
            price: item.productId.price,
            image: item.productId.image,
            quantity: item.quantity,
          },
        });
      }
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };

  const syncCartAfterLogin = async () => {
    const localCart = JSON.parse(localStorage.getItem("cartItems")) || [];

    try {
      const res = await fetch(`${base_url}/api/cart`, {
        credentials: "include",
      });
      const data = await res.json();
      const serverCart = data?.data?.items || [];

      const merged = [...localCart];
      for (let item of serverCart) {
        if (!merged.find((i) => i.productId === item.productId._id)) {
          merged.push({
            productId: item.productId._id,
            quantity: item.quantity,
          });
        }
      }

      await fetch(`${base_url}/api/cart/clear`, {
        method: "DELETE",
        credentials: "include",
      });

      for (let item of merged) {
        await fetch(`${base_url}/api/cart/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(item),
        });
      }

      localStorage.removeItem("cartItems");
      await fetchCart();
    } catch (err) {
      console.error("Error syncing cart after login:", err);
    }
  };

  // ---------- Utility Functions ----------
  const addToCart = async (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
    try {
      await fetch(`${base_url}/api/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(item),
      });
    } catch (err) {
      console.error("Failed to add item to backend cart:", err);
    }
  };

  const removeFromCart = async (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
    try {
      await fetch(`${base_url}/api/cart/remove/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });
    } catch (err) {
      console.error("Failed to remove item from backend:", err);
    }
  };

  const updateCartItem = async (productId, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });
    try {
      await fetch(`${base_url}/api/cart/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId, quantity }),
      });
    } catch (err) {
      console.error("Failed to update quantity on backend:", err);
    }
  };

  const clearCart = async () => {
    dispatch({ type: "CLEAR_CART" });
    try {
      await fetch(`${base_url}/api/cart/clear`, {
        method: "DELETE",
        credentials: "include",
      });
    } catch (err) {
      console.error("Failed to clear backend cart:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        dispatch,
        fetchCart,
        syncCartAfterLogin,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ---------- Hook ----------
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
