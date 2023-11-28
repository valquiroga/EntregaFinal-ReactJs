import './App.css'
import NavBar from './components/NavBar/NavBar'
import Cart from './components/Cart/Cart'
import Checkout from './components/Checkout/Checkout'
import ItemListConteiner from './components/ItemListContainer/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { CartProvider } from './Context/CartContext'
function App() {

  return (
    <div className='App'>
      <CartProvider>
      <BrowserRouter>
        <NavBar />
          <Routes>
            <Route path='/'element={<ItemListConteiner greeting={'Hello World!'}/>}/>
            <Route path='/category/:categoryId'element={<ItemListConteiner greeting={'Hello World!'}/>}/>
            <Route path='/item/:itemId'element={<ItemDetailContainer/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
            <Route path='*' element= {<h3>¯\_(ツ)_/¯</h3>}></Route>
            
          </Routes>
      </BrowserRouter>
      </CartProvider>

    </div>
    
  )

}

export default App