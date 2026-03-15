import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 0
  );

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
    alert('Coming Soon!');
  };

  return (
    <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">🌿 Paradise Nursery</a>
        <ul className="navbar-links">
          <li><a href="/">Home</a></li>
          <li><a href="#plants">Plants</a></li>
          <li>
            <span className="cart-icon">🛒</span>
          </li>
        </ul>
      </nav>

      <div className="cart-page">
        <h1>Shopping Cart 🛒</h1>
        <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.name} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Unit Price: ${item.price.toFixed(2)}</p>
                <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <div className="cart-item-controls">
                <button className="qty-btn" onClick={() => handleDecrement(item)}>−</button>
                <span>{item.quantity}</span>
                <button className="qty-btn" onClick={() => handleIncrement(item)}>+</button>
                <button className="delete-btn" onClick={() => handleRemove(item)}>Delete</button>
              </div>
            </div>
          ))
        )}

        <div className="cart-actions">
          <button className="continue-btn" onClick={onContinueShopping}>
            Continue Shopping
          </button>
          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
