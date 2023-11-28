import { useState, useContext } from "react"
import { CartContext } from "../../Context/CartContext"
import ItemCount from "../ItemCount/ItemCount"
import { Link } from "react-router-dom"
const ItemDetail = ({ id, name, img, category, description, price, stock }) =>{
    const [quantityAdded,setQuantityAdded] = useState (0)
    const {setCart} = useContext (CartContext)
    const handleOnAdd=(quantity)=>{
        console.log(`se agregaron ${quantity} ${name}`)
        const productToAdd = {
        id,name,price,quantity
        }
        setCart (prev => [...prev,productToAdd])
        setQuantityAdded(quantity);
    }
    return (
        <article className="CardItem">
            <header className="Header">
                <h3 className="ItemHeader">
                    {name}
                </h3>
            </header>
            <picture>
                <img src={img} alt={name} className="ItemImg"/>
            </picture>
            <section>
                <p className="Info">
                    Descripción: {description}
                </p>
                <p className="Info">
                    $ {price}
                </p>
            </section>
            <footer className='ItemFooter'>
                {
                    quantityAdded > 0 ? (
                        <Link to='/cart' className = 'Option'> Finalizar compra</Link>

                    ):(
                        < ItemCount initial={1} stock={stock} onAdd={handleOnAdd}>
                        </ItemCount>
                    )
                }
            </footer>
            <p className="Info">
                    Stock en tienda online: {stock}
                </p>
        </article>
    )
}

export default ItemDetail