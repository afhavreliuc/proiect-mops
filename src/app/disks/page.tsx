"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import CartModal from "@/components/CartModal";
import DiskDetailsModal from "@/components/DiskDetailsModal";
import { RootState } from "@/store";

const DisksPage = () => {
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.auth);

  // Redirect to the main page if not logged in
  useEffect(() => {
    if (!currentUser) {
      router.push("/"); // Redirect to the main page
    }
  }, [currentUser, router]);

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

  const addToCart = (disk: { title: string; price: number; id: number }) => {
    const exists = cartItems.find(item => item.id === disk.id);
    if (!exists) {
      setCartItems([...cartItems, { ...disk, id: disk.id }]);
      setTotalPrice(totalPrice + disk.price);
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

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl mb-4">Search for Disks</h1>
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <button
        onClick={() => {
          if (cartItems.length > 0) {
            setCartOpen(true);
          }
        }}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Open Cart
      </button>
      <ul className="list-disc">
        {filteredDisks.map(disk => (
          <li key={disk.id} className="mb-2">
            {disk.title} - {disk.label}
            <button onClick={() => addToCart({ title: disk.title, price: disk.price, id: disk.id })} className="ml-2 px-2 py-1 bg-green-500 text-white rounded">
              Add to Cart
            </button>
            <button onClick={() => openDetails(disk)} className="ml-2 px-2 py-1 bg-blue-500 text-white rounded">
              Details
            </button>
          </li>
        ))}
      </ul>
      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setCartOpen(false)} 
        cartItems={cartItems} 
        totalPrice={finalPrice} 
        shippingCost={shippingCost} 
        onRemove={removeFromCart} 
        onClearCart={clearCart}
      />
      <DiskDetailsModal 
        isOpen={isDetailsOpen} 
        onClose={() => setDetailsOpen(false)} 
        disk={selectedDisk} 
      />
    </div>
  );
};

export default DisksPage;