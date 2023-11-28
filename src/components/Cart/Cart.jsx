import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import CartItem from "../CartItem/CartItem";
import { Link } from "react-router-dom";
const Cart = () => {
const { cart, clearCart, totalQuantity, total}=useContext(CartContext)
if (totalQuantity===0){
    return (
        <div>
            <h3>No hay items agregados a la bolsa</h3>
        <Link to='/' className='Option'>Volver a la tienda</Link>
        </div>

    )
}
return (
    <div>
        {cart.map(p=><CartItem key = {p.id} {...p}/> )}
        <h3>Total: ${total}</h3>
        <button onClick={()=>clearCart() } className="Button">Vaciar bolsa</button>
        <Link to='/checkout' className='Option'>Checkout</Link>
    </div>
)
}

export default Cart
