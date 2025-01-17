import React, { useState } from 'react';
import Notification from './common/Notification';
import LoadingSpinner from './common/LoadingSpinner';


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
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [address, setAddress] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
    });
    const [notification, setNotification] = useState<{
        message: string;
        type: 'success' | 'error';
    } | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    if (!isOpen) return null;

    const handlePayment = async () => {
        if (showAddressForm && address.street && address.city && address.state && address.zipCode && address.country) {
            setIsProcessing(true);
            try {
                // Simulate payment processing
                await new Promise(resolve => setTimeout(resolve, 1000));
                console.log('Processing payment with address:', address);
                onClearCart();
                setShowAddressForm(false);
                setAddress({ street: '', city: '', state: '', zipCode: '', country: '' });
                setNotification({ message: 'Payment processed successfully!', type: 'success' });
            } finally {
                setIsProcessing(false);
            }
        } else if (!showAddressForm) {
            setShowAddressForm(true);
        } else {
            setNotification({ message: 'Please fill in all address fields', type: 'error' });
        }
    };
  
    return (
      <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
        <div className="modal bg-white rounded-lg p-4 max-w-lg w-full">
          <h2 className="text-2xl mb-4">Cart</h2>
          <ul className="mb-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between items-center mb-2">
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
          <h3 className="text-xl mb-2">Total Price: ${totalPrice}</h3>
          <h4 className="text-lg mb-4">Shipping Cost: ${shippingCost}</h4>

          {showAddressForm && (
            <div className="mb-4">
              <h3 className="text-xl mb-2">Delivery Address</h3>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Street Address"
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  className="p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="City"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="State/Province"
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  className="p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="ZIP/Postal Code"
                  value={address.zipCode}
                  onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                  className="p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Country"
                  value={address.country}
                  onChange={(e) => setAddress({ ...address, country: e.target.value })}
                  className="p-2 border rounded"
                  required
                />
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <button 
              onClick={handlePayment} 
              disabled={isProcessing || (showAddressForm && (!address.street || !address.city || !address.state || !address.zipCode || !address.country))}
              className={`px-4 py-2 text-white rounded flex justify-center items-center ${
                isProcessing || (showAddressForm && (!address.street || !address.city || !address.state || !address.zipCode || !address.country))
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-green-500'
              }`}
            >
              {isProcessing ? <LoadingSpinner /> : (showAddressForm ? 'Confirm Payment' : 'Pay')}
            </button>
            <button onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded">
              Close
            </button>
          </div>
        </div>
      </div>
    );
};

export default CartModal;