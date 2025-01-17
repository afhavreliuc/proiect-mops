"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import DiskDetailsModal from "../../components/DiskDetailsModal";
import { RootState } from "../../lib/store";
import CartModal from "../../components/CartModal";
import FavoritesModal from "../../components/FavoritesModal";
import Notification from '../../components/common/Notification';
import LoadingSpinner from "@/components/common/LoadingSpinner";

const DisksPage = () => {
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  const [disks, setDisks] = useState<any[]>([
    { id: 1, title: "Disk One", label: "Label A", price: 10, details: "This is a great album with amazing tracks." },
    { id: 2, title: "Disk Two", label: "Label B", price: 15, details: "A classic collection of timeless songs." },
    { id: 3, title: "Disk Three", label: "Label C", price: 20, details: "An eclectic mix of genres and styles." },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCartOpen, setCartOpen] = useState(false);
  const [isDetailsOpen, setDetailsOpen] = useState(false);
  const [selectedDisk, setSelectedDisk] = useState<any>(null);
  const [cartItems, setCartItems] = useState<{ title: string; price: number; id: number }[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('favorites');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });
  const [isFavoritesOpen, setFavoritesOpen] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  useEffect(() => {
    // Simulate loading disks data
    const loadDisks = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        setDisks([
          { id: 1, title: "Disk One", label: "Label A", price: 10, details: "This is a great album with amazing tracks." },
          { id: 2, title: "Disk Two", label: "Label B", price: 15, details: "A classic collection of timeless songs." },
          { id: 3, title: "Disk Three", label: "Label C", price: 20, details: "An eclectic mix of genres and styles." },
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    loadDisks();
  }, []);

  const favoriteDisks = disks.filter(disk => favorites.includes(disk.id));

  const addToCart = (disk: { title: string; price: number; id: number }) => {
    if (!currentUser) {
      router.push('/login');
      return;
    }
    const exists = cartItems.find(item => item.id === disk.id);
    if (!exists) {
      setCartItems([...cartItems, { ...disk, id: disk.id }]);
      setTotalPrice(totalPrice + disk.price);
      setNotification({ message: 'Item added to cart successfully!', type: 'success' });
    } else {
      setNotification({ message: 'Item is already in cart', type: 'error' });
    }
  };

  const removeFromCart = (id: number) => {
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    const removedItem = cartItems.find(item => item.id === id);
    if (removedItem) {
      setTotalPrice(totalPrice - removedItem.price);
    }
    setCartItems(updatedCartItems);

    // Close the cart modal if there are no items left
    if (updatedCartItems.length === 0) {
      setCartOpen(false);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setTotalPrice(0);
    setCartOpen(false); // Optionally close the cart modal
  };

  const filteredDisks = disks.filter(disk =>
    disk.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Shipping cost logic
  const shippingCost = totalPrice >= 20 ? 0 : 5; // $5 shipping if total is $20 or less
  const finalPrice = totalPrice + shippingCost;

  const openDetails = (disk: any) => {
    setSelectedDisk(disk);
    setDetailsOpen(true);
  };

  const handleToggleFavorite = (id: number) => {
    if (!currentUser) {
      router.push('/login');
      return;
    }
    setFavorites(prev => {
      const newFavorites = prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setNotification({ 
        message: prev.includes(id) ? 'Removed from favorites' : 'Added to favorites', 
        type: 'success' 
      });
      return newFavorites;
    });
  };

  return (
    <div className="flex flex-col items-center">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <h1 className="text-4xl mb-4">Search for Disks</h1>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        {currentUser && (
          <>
            <button
              onClick={() => setFavoritesOpen(true)}
              className="px-4 py-2 bg-yellow-500 text-white rounded"
            >
              View Favorites ({favoriteDisks.length})
            </button>
            <button
              onClick={() => {
                if (cartItems.length > 0) {
                  setCartOpen(true);
                }
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Open Cart
            </button>
          </>
        )}
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <LoadingSpinner />
        </div>
      ) : (
        <ul className="list-disc">
          {filteredDisks.length === 0 ? (
            <li className="text-red-500">No disks found.</li>
          ) : (
            filteredDisks.map(disk => (
              <li key={disk.id} className="mb-2 flex items-center gap-2">
                {disk.title} - {disk.label}
                <button
                  onClick={() => handleToggleFavorite(disk.id)}
                  className={`px-2 py-1 ${favorites.includes(disk.id) ? 'text-yellow-500' : 'text-gray-500'}`}
                >
                  ★
                </button>
                <button 
                  onClick={() => addToCart({ title: disk.title, price: disk.price, id: disk.id })} 
                  className="px-2 py-1 bg-green-500 text-white rounded"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={() => openDetails(disk)} 
                  className="px-2 py-1 bg-blue-500 text-white rounded"
                >
                  Details
                </button>
              </li>
            ))
          )}
        </ul>
      )}
      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setCartOpen(false)} 
        cartItems={cartItems} 
        totalPrice={finalPrice} 
        shippingCost={shippingCost} 
        onRemove={removeFromCart} 
        onClearCart={clearCart}
        onToggleFavorite={handleToggleFavorite}
        favorites={favorites}
      />
      <DiskDetailsModal 
        isOpen={isDetailsOpen} 
        onClose={() => setDetailsOpen(false)} 
        disk={selectedDisk} 
      />
      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setFavoritesOpen(false)}
        favoriteDisks={favoriteDisks}
        onToggleFavorite={handleToggleFavorite}
        onAddToCart={addToCart}
      />
    </div>
  );
};

export default DisksPage;