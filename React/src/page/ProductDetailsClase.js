import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ProductListItem from "../components/ProductListItem";

export default function ProductClase()
{
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async() => {
            const data = await getProductsById(id);
            setProduct(data)
        }

        fetchProduct();
    }, [id]);

    return (
        <div>
            {product && <ProductListItem
                title={product.title}
                id={product.id}
                images={product.images}
                description={product.description}
            />}
        </div>
    )
}

async function getProductsById(id)
{
    const product = await fetch(`https://dummyjson.com/products/${id}`)
    return product.json();
}



