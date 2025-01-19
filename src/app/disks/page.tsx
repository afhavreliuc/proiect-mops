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
import getDisks, { searchDiscsByArtist, searchDiscsByGenre, searchDiscsByTitle } from "../api/requests/disk";

const DisksPage = () => {
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [disks, setDisks]= useState<any[]>([ ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState<"title" | "artist" | "genre">("title");
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
    setIsLoading(true); 
  
    getDisks()
      .then((fetchedDisks: any[]) => {
        console.log("Fetched disks:", fetchedDisks);  
        const transformedDisks = fetchedDisks.map((disk: any) => ({
          id: disk.idDisc,
          title: disk.title,
          label: disk.label,
          price: disk.price,
          format: disk.format,
        }));
  
        setDisks(transformedDisks);
      })
      .catch((error: any) => {
        console.error("Error fetching disks:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
  //const filteredDisks = disks.filter(disk => {
    // const matchesSearch = searchType === "title" 
    //   ? disk.title.toLowerCase().includes(searchTerm.toLowerCase())
    //   : disk.label.toLowerCase().includes(searchTerm.toLowerCase());
    // const matchesFormat = !selectedFormat || disk.format === selectedFormat;
  //  return matchesSearch && matchesFormat;
  // return disks;
 // });


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

  const onSearch = async () => {
  //  console.log("Searching for:", searchTerm, "by", searchType, "with format", selectedFormat);
    
    if (searchTerm == null || searchTerm.trim() === "") {
      try {
        const artistDisks = await getDisks();  // Fetch all disks if no search term
        const filteredArtistDisks = filterDisksByFormat(artistDisks, selectedFormat); // Apply format filter
        setDisks(filteredArtistDisks);  // Set the filtered disks to state
      } catch (err) {
        setDisks([]);  // Clear the disks state in case of error
        console.error(err);
      }
      return; // Return early to avoid unnecessary further logic
    }


    if (searchType === "artist") {

      try {
        const artistDisks = await searchDiscsByArtist(searchTerm); 
        const filteredArtistDisks = filterDisksByFormat(artistDisks, selectedFormat);
        setDisks(filteredArtistDisks); 
      } catch (err) {
       // setError("Failed to fetch discs by artist.");
        setDisks([]); 
        console.error(err);
      } 
    } else {

      if (searchType === "genre") {

        try {
          const genreDisks = await searchDiscsByGenre(searchTerm); 
          const filteredGenreDisks = filterDisksByFormat(genreDisks, selectedFormat);
          setDisks(filteredGenreDisks); 
        } catch (err) {
         // setError("Failed to fetch discs by artist.");
          setDisks([]); 
          console.error(err);
        } 
      } else if(searchType =='title'){
        try {
          const titleDisks = await searchDiscsByTitle(searchTerm);
          const filteredTitleDisks = filterDisksByFormat(titleDisks, selectedFormat);
          setDisks(filteredTitleDisks);
          console.log('whatt?')
        } catch (err) {
         // setError("Failed to fetch discs by artist.");
          setDisks([]); 
          console.error(err);
          console.log('whatt?')
        } 
      }
 
    }
  };
  function filterDisksByFormat(disks: any[], selectedFormat: string) {
    return disks.filter(disk => {
      // Check if the disk's format matches the selected format
      const matchesFormat = !selectedFormat || disk.format === selectedFormat;
  
      // Return true if the disk matches both the format and the additional filter
      return matchesFormat;
    });
  }

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
              onChange={(e) => setSearchType(e.target.value as "title" | "artist" | "genre")}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="title">Search by Title</option>
              <option value="artist">Search by Artist</option>
              <option value="genre">Search by Genre</option>
            </select>
            <input
              type="text"
              placeholder={`Search by ${searchType}...`} 
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
          <button
          onClick={onSearch} // onSearch function to handle the search logic
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
          Search
          </button>
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
          {disks.length === 0 ? (
            <li className="text-red-500">No disks found.</li>
          ) : (
            disks.map(disk => (
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