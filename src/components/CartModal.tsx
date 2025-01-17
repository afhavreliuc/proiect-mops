import React from 'react';

interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: { title: string; price: number; id: number }[];
    totalPrice: number;
    shippingCost: number;
    onRemove: (id: number) => void;
    onClearCart: () => void;
    onToggleFavorite: (id: number) => void;
    favorites: number[];  // Array of favorite item IDs
}

const CartModal: React.FC<CartModalProps> = ({ 
    isOpen, 
    onClose, 
    cartItems, 
    totalPrice, 
    shippingCost, 
    onRemove, 
    onClearCart,
    onToggleFavorite,
    favorites 
}) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="modal bg-white rounded-lg p-4">
          <h2 className="text-2xl">Cart</h2>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between items-center">
                <span>{item.title} - ${item.price}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => onToggleFavorite(item.id)}
                    className={`px-2 py-1 ${
                      favorites.includes(item.id) ? 'text-yellow-500' : 'text-gray-500'
                    }`}
                  >
                    ★
                  </button>
                  <button onClick={() => onRemove(item.id)} className="px-2 py-1 bg-red-500 text-white rounded">
                    Remove
                  </button>
                </div>
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