import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CartItem({
  title,
  id,
  description,
  images,
  price,
  quantity,
  removeFromCart,
  updateQuantity,
  canIncrement,
}) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const image =
    images?.[0] ??
    "https://imgs.search.brave.com/ti7F41pW3oNrqH6FqBXQEqUEzFDnl1Wf-F8YtVViYTU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9waXhs/ci5jb20vaW1hZ2Vz/L2luZGV4L3Byb2R1/Y3QtaW1hZ2Utb25l/LndlYnA";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch(error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleClick = () => {
    navigate(`/product-details/${id}`);
  };

  const handleRemove = () => {
    removeFromCart(id);
  };

  const handleIncrease = () => {
    if (canIncrement && product.stock >= quantity) {
        updateQuantity(id, quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    }
  };

  return (
    <div className="cart-item" key={id}>
      <div className="cart-item-image" onClick={handleClick}>
        {loading ? (
          <div>Loading image...</div>
        ) : (
          <img
            src={product?.images?.[0] || image}
            alt={product?.title || "Product"}
          />
        )}
      </div>
      <div className="cart-item-details">
        <div className="cart-item-header">
            <h4>{product?.title}</h4>
            <p>{product?.description}</p>
            <div className="cart-item-stock">
                <p>Stock Available: {product?.stock}</p>
            </div>
        </div>
        <div className="cart-item-quantity">
          <button onClick={handleDecrease} className="quantity-button">
            -
          </button>
          <span>{quantity}</span>
          <button onClick={handleIncrease} className={`quantity-button ${(!canIncrement || product?.stock <= quantity) ? 'disabled' : ''}`} disabled={(!canIncrement || product?.stock <= quantity)}>
            +
          </button>
        </div>
        <div className="cart-item-price">
          <p>${(price * quantity).toFixed(2)}</p>
        </div>
        <div className="cart-item-actions">
          <button onClick={handleRemove} className="remove-button">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
