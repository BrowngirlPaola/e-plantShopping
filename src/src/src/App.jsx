import React, { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStarted = () => {
    setShowProductList(true);
  };

  return (
    <div>
      {!showProductList ? (
        <div className="landing-page background-image">
          <div className="landing-content">
            <h1>Welcome to Paradise Nursery</h1>
            <p>
              Where Green Dreams Come Alive!
            </p>
            <AboutUs />
            <button 
              className="get-started-btn"
              onClick={handleGetStarted}
            >
              Get Started
            </button>
          </div>
        </div>
      ) : (
        <ProductList />
      )}
    </div>
  );
}

export default App;
