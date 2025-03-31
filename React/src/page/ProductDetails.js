import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../style/product_details.css";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const data = await getProductsById(id);
      setProduct(data);
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const addToCart = () => {
    if (!product) return;

    // Ensure cart is an array before using find
    if (!Array.isArray(cart)) {
      setCart([]);
      localStorage.setItem("cart", JSON.stringify([]));
      return;
    }

    // Restriction 1: Maximum 5 different products
    if (cart.length >= 5) {
      alert("You can only have a maximum of 5 different products in the cart.");
      return;
    }

    // Restriction 2: Total price must not exceed 10,000
    const currentTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (currentTotal + product.price > 10000) {
      alert("Total cart value cannot exceed $10,000.");
      return;
    }

    const existingItem = cart.find((item) => item.id === product.id);
    if(!existingItem)
    {
      const newCart = [...cart, {id: product.id, price: product.price, quantity: 1}];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  }

  const isInCart = Array.isArray(cart) && cart.some((item) => item.id === product?.id);

  const image = "https://imgs.search.brave.com/ti7F41pW3oNrqH6FqBXQEqUEzFDnl1Wf-F8YtVViYTU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9waXhs/ci5jb20vaW1hZ2Vz/L2luZGV4L3Byb2R1/Y3QtaW1hZ2Utb25l/LndlYnA";

  return (
    <div>
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading product details...</p>
        </div>
      ) : (
        product && (
          <div className="page-container" style={{ backgroundImage: "url('/espacio.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="product-details-page-container" style={{ backgroundColor: "white", width: "80%" }}>
              <div className="product-image-container">
                <img src={product.images?.[0] || image} alt="Product" />
              </div>

              <div className="product-details-container">
                <div className="toast-bar">
                  
                </div>
                <div className="product-info">
                  <h4>{product.title}</h4>
                  <p>{product.description}</p>
                </div>
                <div className="product-highlights">
                  <h5>Highlights:</h5>
                  <ul>
                    <li>Lightweight and Responsive Midsole.</li>
                    <li>Full-Length Zoom Air Unit.</li>
                    <li>Breathable Mesh Upper.</li>
                  </ul>
                </div>
                <div className="product-specifications">
                  <table>
                    <thead>
                      <tr>
                        <th>Categoria</th>
                        <th>Marca</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{titleCase(product.category)}</td>
                        <td>{product.brand ?? "N/A"}</td>
                      </tr>
                    </tbody>
                  </table>
                  <h5>${product.price}</h5>
                </div>
                <div className="product-buttons">
                  {isInCart ? (
                    <button id="added-to-cart-button" disabled>
                         Added to Cart
                    </button>
                  ) : (
                    <button id="add-to-cart-button" onClick={addToCart}>
                      Add to cart
                    </button>
                  )}
                  <button id="add-to-wishlist-button"> Add to wishlist</button>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

async function getProductsById(id) {
  const product = await fetch(`https://dummyjson.com/products/${id}`);
  return product.json();
}

function titleCase(str) {
  return str.toLowerCase().split(' ').map(function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}
