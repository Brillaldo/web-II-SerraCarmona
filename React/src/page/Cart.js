import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import "../style/cart.css";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);

    calculateTotal(savedCart);
  }, []);

  const calculateTotal = (cart) => {
    const totalPrice = cart.reduce(
      (accumulator, item) => accumulator + item.price * item.quantity,
      0
    );
    setTotal(totalPrice);

    // Check if cart exceeds max limit or total exceeds $10k
    if (cart.length > 5) {
      setError(
        "You can only have a maximum of 5 different products in your cart."
      );
    } else if (totalPrice > 10000) {
      setError(
        "The total value of the items in your cart cannot exceed $10,000."
      );
    } else {
      setError(""); // Clear error if everything is fine
    }
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const updateQuantity = (id, newQuantity) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const canIncrement = (item) => {
    const potentialTotal = total + item.price;
    return potentialTotal <= 10000;
  };  

  return (
    <div className="cart-page-container">
      <h2>Your Cart</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="cart-items">
        {cart.length === 0 ? (
          <p>Your cart is empty. Start shopping!</p>
        ) : (
          cart.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              images={item.images}
              price={item.price}
              quantity={item.quantity}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
              canIncrement={canIncrement(item)}
            />
          ))
        )}
      </div>

      <div className="cart-summary">
        <h3>Cart Summary</h3>
        <div className="total-price">
          <p>Total: ${total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
