import { useState, useEffect, createContext } from "react";
export const CartContext = createContext();
export const CartProvider = ({children})=> {
    const [cart,setCart] = useState ([]);
    
    const clearCart = () => {
        setCart([]);
        };
    
    console.log(cart);
    const addItem = (productToAdd) => {
        if (!isInCart(productToAdd.id)) {
            setCart((prev) =>[...prev,productToAdd]);
        } else{
            console.log('Already in the bag');
        }
    };
    const isInCart = (id) => {
        return cart.some((prod)=>prod.id===id);
    };
    const removeItem = (id) => {
        const cartUpdated = cart.filter ((prod) => prod.id !== id);
        setCart (cartUpdated);
    };
    const getTotalQuantity = () => {
        let totalQuantity = 0
        cart.forEach ((prod) => {
            totalQuantity += prod.quantity;
        });
        return totalQuantity;
    }
    const getTotalPrice = () => {
        let totalPrice = 0;
        cart.forEach((prod) => {
          totalPrice += prod.price * prod.quantity;
        });
        return totalPrice;
        };
    
        const totalQuantity = getTotalQuantity();
        const total = getTotalPrice();

        useEffect(() => {
            const newTotal = getTotalPrice();
            if (total !== newTotal) {
            setCart((prevCart) => ({ ...prevCart, total: newTotal }));
            }
        }, [cart]);
        return( 
        <CartContext.Provider value={{cart,setCart,addItem,removeItem,totalQuantity,total,clearCart }}>
            {children}
        </CartContext.Provider>
    )
}