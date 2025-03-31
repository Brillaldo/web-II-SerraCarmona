import { Routes, Route } from "react-router-dom"

import Home from '../page/Home'
import About from '../page/About'
import Contact from '../page/Contact'
import Login from "../page/Login"
import Products from '../page/Products'
import ProductDetails from "../page/ProductDetails"
import ProductList from "../page/ProductList"
import ProductClase from "../page/ProductDetailsClase"
import Cart from "../page/Cart"

export default function MyRouters()
{
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/products" element={<Products/>}/>
            <Route path="/product-details/:id" element={<ProductDetails/>}/>
            <Route path="/product-list" element={<ProductList/>}/>
            <Route path="/product/:id" element={<ProductClase/>}/>
            <Route path="/cart" element={<Cart/>}/>
        </Routes>
    )
}