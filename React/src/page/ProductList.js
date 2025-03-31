import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductListItem from "../components/ProductListItem";

export default function ProductList ()
{
    const[products, setProducts] = useState(null)
    const[productId, setProductId] = useState(null)
    const [word, setWord] = useState(null)

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getProducts();

            setProducts(data.products);
        }

        fetchProducts()
    }, []);

    useEffect(() => {
        const hasWord = word !== null && word !== undefined && word.length > 3;
        
        if(!hasWord) return;

        const fetchProductsByWord = async () => {
            const data = await getProductsByWord(word)
            setProducts(data.products);
        }

        fetchProductsByWord()
    }, [word]);

    return (
        <div>
            <div>
                <input type="text" placeholder="search product" onChange={(e) => setWord(e.target.value)} />
            </div>
            <div className="container-products">
                {products && products.map((item) => {
                    return (
                        <ProductListItem
                            title={item.title}
                            id={item.id}
                            description={item.description}
                            images={item.images}
                        />
                    )
                })}
            </div>
        </div>
    )
}

async function getProducts()
{
    const products = await fetch("https://dummyjson.com/products");
    return products.json();
}

async function getProductsByWord(word) {
    const products = await fetch(`https://dummyjson.com/products/search?q=${word}`)
    return products.json()
}