import { useNavigate } from 'react-router-dom'
import ProductItem from '../components/ProductItem'
import '../style/products.css'
import { useEffect, useState } from 'react'

export default function Products()
{
    const [products, setProducts] = useState(null);
    const [productId, setProductId] = useState(null);
    const [word, setWord] = useState(null);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);

            const data = await getProducts();

            setProducts(data.products);

            setLoading(false);
        }

        fetchProducts()
    }, []);

    useEffect(() => {
        const hasWord = word !== null && word !== undefined && word.length > 3;
        
        if(!hasWord) return;

        const fetchProductsByWord = async () => {
            setLoading(true);
            const data = await getProductsByWord(word)
            setProducts(data.products);
            setLoading(false);
        }

        fetchProductsByWord();
    }, [word])


    return (
        <div
        className="fondo"
        style={{
            backgroundImage: 'url("/espacio.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        <div
            className="container-products"
            style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                maxWidth: '800px',
                width: '90%',
            }}
        >
            <div className="products-title">
                <h2>Products</h2>
            </div>

           

            {loading ? (
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Loading products...</p>
                </div>
            ) : (
                <div className="container-products">
                    {products &&
                        products.map((item) => (
                            <ProductItem
                                key={item.id}
                                title={item.title}
                                id={item.id}
                                description={item.description}
                                images={item.images}
                            />
                        ))}
                </div>
            )}
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