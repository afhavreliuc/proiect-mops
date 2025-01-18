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
    { 
      id: 4, 
      title: "Recent door customer apply", 
      label: "Coleman-Clark", 
      price: 35, 
      format: "CD",
      details: "A collection of contemporary tracks exploring modern themes." 
    },
    { 
      id: 15, 
      title: "Wind house financial language news", 
      label: "Lopez-Williams", 
      price: 49, 
      format: "Digital",
      details: "An innovative fusion of electronic and acoustic elements." 
    },
    { 
      id: 19, 
      title: "Consider education", 
      label: "Valenzuela, McIntyre and Cobb", 
      price: 17, 
      format: "CD",
      details: "A thoughtful compilation of educational and inspirational music." 
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState<"title" | "artist">("title");
  const [selectedFormat, setSelectedFormat] = useState<string>("");
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

  // Get unique formats
  const formats = Array.from(new Set(disks.map(disk => disk.format)));

  useEffect(() => {
    // Simulate loading disks data
    const loadDisks = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        setDisks([
          { 
            id: 4, 
            title: "Recent door customer apply", 
            label: "Coleman-Clark", 
            price: 35, 
            format: "CD",
            details: "A collection of contemporary tracks exploring modern themes." 
          },
          { 
            id: 15, 
            title: "Wind house financial language news", 
            label: "Lopez-Williams", 
            price: 49, 
            format: "Digital",
            details: "An innovative fusion of electronic and acoustic elements." 
          },
          { 
            id: 19, 
            title: "Consider education", 
            label: "Valenzuela, McIntyre and Cobb", 
            price: 17, 
            format: "CD",
            details: "A thoughtful compilation of educational and inspirational music." 
          }
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
    setCartOpen(false);
  };

  // Filter disks based on all criteria
  const filteredDisks = disks.filter(disk => {
    const matchesSearch = searchType === "title" 
      ? disk.title.toLowerCase().includes(searchTerm.toLowerCase())
      : disk.label.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFormat = !selectedFormat || disk.format === selectedFormat;
    return matchesSearch && matchesFormat;
  });

  // Shipping cost logic
  const shippingCost = totalPrice >= 40 ? 0 : 5;
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
    <div className="flex flex-col items-center p-4">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="w-full max-w-4xl mb-8">
        <h2 className="text-2xl mb-4">View Discs by Format, Artist, or Search Results</h2>
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex-1 flex gap-2">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value as "title" | "artist")}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="title">Search by Title</option>
              <option value="artist">Search by Artist</option>
            </select>
            <input
              type="text"
              placeholder={`Search by ${searchType === "title" ? "title" : "artist"}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded"
            />
          </div>

          <select
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">All Formats</option>
            {formats.map(format => (
              <option key={format} value={format}>{format}</option>
            ))}
          </select>

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
                <span>{disk.title} - {disk.label} ({disk.format})</span>
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