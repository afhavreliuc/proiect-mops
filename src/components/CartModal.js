import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const CartModal = ({ cartItems, isOpen, closeModal, removeFromCart }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const shippingCost = 20; 
  const priceThreshold = 100; 

  useEffect(() => {
    const calculatedTotal = cartItems.reduce((total, item) => total + item.price, 0) + (totalPrice < priceThreshold ? shippingCost : 0);
    setTotalPrice(calculatedTotal);
  }, [totalPrice, cartItems]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <h2>Coșul de cumpărături</h2>
        {cartItems.length === 0 ? (
          <div>
            <p>Coșul este gol.</p>
            <h3>Total: 0 RON</h3>
          </div>
        ) : (
          <div>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.title} - {item.price} RON
                <button
                  onClick={() => removeFromCart(index)}
                  style={{ marginLeft: "10px", color: "red" }}
                >
                  Șterge
                </button>
              </li>
            ))}
          </ul>
            <h3>Cost pentru transport: {totalPrice > 100 ? 0 : shippingCost}</h3>
            <hr />
            <h3>Total: {totalPrice} RON</h3>
          </div>
        )}

        <button onClick={closeModal}>Închide</button>
      </div>
    </div>,
    document.body
  );
};

export default CartModal;
