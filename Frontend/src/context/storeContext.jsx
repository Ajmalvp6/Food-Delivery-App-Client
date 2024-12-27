import { createContext, useEffect, useState } from "react";
import {
  addToCartApi,
  getCartApi,
  getFoodApi,
  removeFromCartApi,
} from "../components/services/allApi";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const [token, setToken] = useState("");

  const [food_list, setFood_list] = useState([]);

  // fetch food

  const fechFood = async () => {
    try {
      const { data } = await getFoodApi();

      setFood_list(data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  //   getCart items

  const cartItemapi = async () => {
    const headers = {
      authorization: `bearer ${localStorage.getItem("token")}`,
    };

    try {
      const result = await getCartApi(headers);
      setCartItems(result.data.cartData);
    } catch (error) {
      console.log("error fetching cart items", error);
    }
  };

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems({ ...cartItems, [itemId]: 1 });
    } else {
      setCartItems({ ...cartItems, [itemId]: cartItems[itemId] + 1 });
    }
    if (token) {
      const headers = {
        authorization: `bearer ${localStorage.getItem("token")}`,
      };

      const body = { itemId };

      const response = await addToCartApi(body, headers);

      console.log(response);
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems({ ...cartItems, [itemId]: cartItems[itemId] - 1 });
    if (token) {
      const headers = {
        authorization: `bearer ${localStorage.getItem("token")}`,
      };

      const body = { itemId };

      const response = await removeFromCartApi(body, headers);
      console.log(response);
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo?.price * cartItems[item];
      }
    }

    return totalAmount;
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      cartItemapi();
    }

    fechFood();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
    cartItemapi,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
