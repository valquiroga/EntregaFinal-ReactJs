import { useContext } from 'react'
import { CartContext } from '../../Context/CartContext'
import { Link } from 'react-router-dom'
import bag from './assets/bag.svg'
const CartWidget = () => {
    const { totalQuantity } = useContext (CartContext);
    return (
        <Link to='/cart' className='CartWidget' style={{display:totalQuantity > 0 ? 'block' : 'none'}}>
            <img src={bag} alt="cart-widget" /> 
{totalQuantity}
</Link>
    );
}

export default CartWidget;