import { useState, useEffect } from "react"
import ItemList from "../ItemList/ItemList"
import { useParams } from "react-router-dom"
import { getDocs,collection,query,where, doc } from "firebase/firestore"
import {db} from "../../services/firebase/firebaseconfig"

const ItemListConteiner = ({greeting}) => {
    const [products, setProducts] =useState ([])
    const {categoryId} = useParams ()
    useEffect (()=>{
        const collectionRef = categoryId 
        ? query (collection(db,'products'),where('category','==',categoryId))
        : collection(db,'products')
        getDocs(collectionRef)
        .then (response =>{
            const productsAdapted = response.docs.map(doc=>{
                const data =doc.data()
                return{id:doc.id, ...data}
            })
            setProducts(productsAdapted)
        })
        .catch(error => {
            console.error(error)
        })
    }, [categoryId])
    return (
        <>
        <p>{greeting}</p>
        <ItemList products={products}/>
        </>
    )
}

export default ItemListConteiner