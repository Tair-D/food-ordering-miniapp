// src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [menu, setMenu] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/menu')
            .then(response => setMenu(response.data))
            .catch(error => console.error('Error fetching menu:', error));
    }, []);

    const addToCart = (item) => {
        setCart([...cart, item]);
    };

    const removeFromCart = (item) => {
        setCart(cart.filter(cartItem => cartItem.id !== item.id));
    };

    const handleOrder = () => {
        axios.post('http://localhost:3000/order', { items: cart })
            .then(response => alert('Order placed successfully!'))
            .catch(error => console.error('Error placing order:', error));
    };

    return (
        <div className="App">
            <h1>Food Ordering Miniapp</h1>
            <h2>Menu</h2>
            <ul>
                {menu.map(item => (
                    <li key={item.id}>
                        {item.name} - ${item.price}
                        <button onClick={() => addToCart(item)}>Add to Cart</button>
                    </li>
                ))}
            </ul>
            <h2>Cart</h2>
            <ul>
                {cart.map(item => (
                    <li key={item.id}>
                        {item.name}
                        <button onClick={() => removeFromCart(item)}>Remove</button>
                    </li>
                ))}
            </ul>
            <button onClick={handleOrder}>Place Order</button>
        </div>
    );
}

export default App;
