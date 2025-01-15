import React from 'react';

interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: { title: string; price: number; id: number }[];
    totalPrice: number;
    shippingCost: number;
    onRemove: (id: number) => void;
    onClearCart: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, cartItems, totalPrice, shippingCost, onRemove, onClearCart }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal">
          <h2 className="text-2xl">Cart</h2>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between">
                {item.title} - ${item.price}
                <button onClick={() => onRemove(item.id)} className="ml-2 px-2 py-1 bg-red-500 text-white rounded">
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <h3 className="text-xl">Total Price: ${totalPrice}</h3>
          <h4 className="text-lg">Shipping Cost: ${shippingCost}</h4>
          <button onClick={onClearCart} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
            Pay
          </button>
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Close</button>
        </div>
      </div>
    );
};

export default CartModal;