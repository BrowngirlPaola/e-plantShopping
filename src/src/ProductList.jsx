import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

const plantCategories = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Peace Lily', price: 12.99, image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e6ba2?w=300', description: 'Improves air quality' },
      { name: 'Spider Plant', price: 8.99, image: 'https://images.unsplash.com/photo-1637967886160-fd78dc3ce3f5?w=300', description: 'Easy to grow' },
      { name: 'Snake Plant', price: 14.99, image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=300', description: 'Low maintenance' },
      { name: 'Aloe Vera', price: 9.99, image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=300', description: 'Medicinal plant' },
      { name: 'Boston Fern', price: 11.99, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300', description: 'Humidity lover' },
      { name: 'Bamboo Palm', price: 19.99, image: 'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=300', description: 'Tropical feel' },
    ],
  },
  {
    category: 'Low Maintenance Plants',
    plants: [
      { name: 'ZZ Plant', price: 16.99, image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=300', description: 'Drought tolerant' },
      { name: 'Pothos', price: 7.99, image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=300', description: 'Fast grower' },
      { name: 'Cast Iron Plant', price: 13.99, image: 'https://images.unsplash.com/photo-1599598425947-5202edd56fdb?w=300', description: 'Very hardy' },
      { name: 'Jade Plant', price: 10.99, image: 'https://images.unsplash.com/photo-1550159930-40066082a4fc?w=300', description: 'Lucky plant' },
      { name: 'Chinese Evergreen', price: 15.99, image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=300', description: 'Colorful leaves' },
      { name: 'Dracaena', price: 17.99, image: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=300', description: 'Tall and elegant' },
    ],
  },
  {
    category: 'Tropical Plants',
    plants: [
      { name: 'Monstera', price: 24.99, image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=300', description: 'Statement plant' },
      { name: 'Bird of Paradise', price: 34.99, image: 'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=300', description: 'Exotic beauty' },
      { name: 'Philodendron', price: 18.99, image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=300', description: 'Heart shaped leaves' },
      { name: 'Calathea', price: 21.99, image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e6ba2?w=300', description: 'Prayer plant' },
      { name: 'Anthurium', price: 22.99, image: 'https://images.unsplash.com/photo-1637967886160-fd78dc3ce3f5?w=300', description: 'Waxy flowers' },
      { name: 'Bromeliad', price: 19.99, image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=300', description: 'Colorful bracts' },
    ],
  },
];

function ProductList() {
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState({});
  const [showCart, setShowCart] = useState(false);
  const cartItems = useSelector(state => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart(prev => ({ ...prev, [plant.name]: true }));
  };

  const handleCartClick = () => {
    setShowCart(true);
  };

  const handleContinueShopping = () => {
    setShowCart(false);
  };

  if (showCart) {
    return <CartItem onContinueShopping={handleContinueShopping} />;
  }

  return (
    <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">🌿 Paradise Nursery</a>
        <ul className="navbar-links">
          <li><a href="/">Home</a></li>
          <li><a href="#plants">Plants</a></li>
          <li>
            <button 
              className="cart-icon" 
              onClick={handleCartClick}
              style={{background:'none', border:'none', cursor:'pointer'}}
            >
              🛒
              {cartCount > 0 && (
                <span className="cart-count">{cartCount}</span>
              )}
            </button>
          </li>
        </ul>
      </nav>

      <div className="product-list-page" id="plants">
        <h1>Our Plants 🌱</h1>
        {plantCategories.map((cat) => (
          <div key={cat.category} className="category-section">
            <h2>{cat.category}</h2>
            <div className="plants-grid">
              {cat.plants.map((plant) => (
                <div key={plant.name} className="plant-card">
                  <img src={plant.image} alt={plant.name} />
                  <h3>{plant.name}</h3>
                  <p>{plant.description}</p>
                  <p className="price">${plant.price.toFixed(2)}</p>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(plant)}
                    disabled={addedToCart[plant.name]}
                  >
                    {addedToCart[plant.name] ? 'Added ✓' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
