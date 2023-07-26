import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

const products = [
  {id: 1,name: "Nike Mens Air Winflo Shoes",price: 15.55,rating: 4.5,image: "https://www.freepnglogos.com/uploads/shoes-png/download-nike-shoes-transparent-png-for-designing-projects-16.png",},
  {id: 2,name: "Product 2",price: 29,rating: 3.8,image: "https://www.boat-lifestyle.com/cdn/shop/products/A175Packaging.1804.png?v=1653396760",},
  {id: 2,name: "Redmi Note 12 Pro",price: 109,rating: 3.8,image: "https://media.croma.com/image/upload/v1683559056/Croma%20Assets/Communication/Mobiles/Images/267252_0_t0d3pv.png",},
  {id: 2,name: "Product 2",price: 15,rating: 3.8,image: "https://www.pngall.com/wp-content/uploads/11/Winterwear-PNG-Pic.png",},
  {id: 2,name: "Product 2",price: 99,rating: 3.8,image: "url-to-product-2-image",},
  {id: 2,name: "Product 2",price: 17,rating: 3.8,image: "url-to-product-2-image",},
  // Add more products as needed
];
const newarrival = [
  {id: 1,name: "Therabody",price: 15.55,rating: 4.5,image: "https://www.therabody.com/on/demandware.static/-/Sites-thg-master/default/dwd8d23252/images/compare/RA_GEN_2_PRO_COMPARE.png",},
  // Add more products as needed
];


const displayRatingStars = (rating) => {
  const maxRating = 5;
  const fullStar = "\u2605"; // Unicode character for a filled star
  const emptyStar = "\u2606"; // Unicode character for an empty star
  const fullStarsCount = Math.round(rating);
  const emptyStarsCount = maxRating - fullStarsCount;

  return fullStar.repeat(fullStarsCount) + emptyStar.repeat(emptyStarsCount);
};

const Home = ({ addToCart }) => (
  <div className="home-container">
    <div className="landing">
        <div className="landing-wrapper">
        {newarrival.map((product) => (
          <div key={product.id} className="landing-card">
            <div className="landing-image">
            <center><img src={product.image} alt={product.name} /></center>
          </div>
          <div className="landing-desc">
            <pre>Unleash The Sapholic In You!</pre>
            <span>new arrivals</span>
            <h3>{product.name}</h3>
            <p className="star-rating">{displayRatingStars(product.rating)}</p>
            <p className="price-tag">${product.price}</p>
            <button onClick={() => addToCart(product)}>SHOP NOW</button>
          </div>
          </div>
        ))}
    </div>
    </div>
    <div className="overlay"></div>
    <h2>Welcome to the Home Page</h2>
    <div className="product-cards">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <div className="product-image">
            <center><img src={product.image} alt={product.name} /></center>
            <div className="quick-view-button">
              <button>QUICK VIEW</button>
            </div>
          </div>
          <h3>{product.name}</h3>
          <div className="product-desc">
            <p className="star-rating">{displayRatingStars(product.rating)}</p>
            <p className="price-tag">${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Cart = ({ cartItems, removeFromCart }) => {
  const cartTotal = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="cart-container">
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <img src="https://www.nicepng.com/png/full/139-1392565_online-shop-icon-white-png.png" alt="cart"></img>
          <p>Your cart is empty.</p>
          <Link to="/" className="continue-shopping">Continue Shopping</Link>
        </div>
      ) : (
        <div>
          <h2>Items Added To Cart</h2>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Rating: {displayRatingStars(item.rating)}</p>
                  <p>Price: ${item.price}</p>
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <center><div className="cart-total">
            <pre className="sumPrice">Total: ${cartTotal.toFixed(2)}</pre>
            <Link to="/" className="continue-shopping">Continue Shopping</Link>
          </div></center>
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Function to handle scroll event
  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    // Attach the scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up the scroll event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" className="nav-link">Cart</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route
              path="/"
              element={<Home addToCart={addToCart} />}
            />
            <Route
              path="/cart"
              element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;