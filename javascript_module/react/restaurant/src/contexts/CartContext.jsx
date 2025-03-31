import { useContext, useState, createContext, Children } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    return (
        <CartContext.Provider value = {{ 'cartItems': cartItems, 'setCartItems': setCartItems }}>
            { children }
        </CartContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCartContext = () => {
    return useContext(CartContext);
}