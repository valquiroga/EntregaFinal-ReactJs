import { useState } from "react"
import { db } from "../../services/firebase/firebaseconfig"
import { useContext } from "react"
import { CartContext } from "../../Context/CartContext"
import CheckoutForm from '../CheckoutForm/CheckoutForm'
import CartItem from "../CartItem/CartItem"
import { Timestamp, addDoc, collection, doc, getDocs, query, where, writeBatch } from "firebase/firestore"

const Checkout = () => {
    const [orderId,setOrder]= useState ('')
    const [orderDetails, setOrderDetails] = useState(null);
    
    const { cart,total,clearCart
    } = useContext(CartContext)
    const createOrder = async ({ name, phone, email }) => {
        try {
const objOrder = {
            buyer: {
                name,
                phone,
                email,
            },
            items: cart,
            total: total,
            date: Timestamp.fromDate(new Date()),
};

const batch = writeBatch(db);
const outOfStock = [];

        const ids = cart.map((prod) => prod.id);
        
        const productsRef = collection(db, 'products');
        const productsAddedFromFirestore = await getDocs(
            query(productsRef, where('id', 'in', ids))
        );
        
        const { docs } = productsAddedFromFirestore;

        docs.forEach((doc) => {
            const dataDoc = doc.data();
            const stockDb = dataDoc.stock;
            const productAddedToCart = cart.find((prod) => prod.id === doc.id);
            const prodQuantity = productAddedToCart?.quantity;

            if (stockDb >= prodQuantity) {
                batch.update(doc.ref, { stock: stockDb - prodQuantity });
            } else {
                outOfStock.push({ id: doc.id, ...dataDoc });
            }
});
if (outOfStock.length === 0) {
            await batch.commit();
            const orderRef = collection(db, 'orders');
            const orderAdded = await addDoc(orderRef, objOrder);
            setOrder(orderAdded.id);
            setOrderDetails(cart); 
            clearCart();
        } else {
            console.error('Error en la compra: Sin stock :(');
        }
        } catch (error) {
        console.log(error);
        }
    };


    if (orderId) {
        return (
            <div>
                <h3>N° de orden: {orderId}</h3>
                <h4>Detalle de la compra:</h4>
                {orderDetails && orderDetails.map(item => (
                    <CartItem key={item.id} {...item} />
                ))}
            </div>
        );
    }

    return (
        <div>
            <h3>Checkout</h3>
            <CheckoutForm onConfirm={createOrder}/>
        </div>
    );
};

export default Checkout;