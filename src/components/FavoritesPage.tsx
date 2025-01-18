"use client";

import React, {useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "../lib/store";
import Link from 'next/link';

const FavoritesPage = () => {
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.auth);

  // Redirect to the main page if not logged in
  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    }
  }, [currentUser, router]);

  // Get favorites from localStorage
  const [favorites, setFavorites] = useState<any[]>([]);
  const [disks, setDisks] = useState<any[]>([
    { id: 1, title: "Disk One", label: "Label A", price: 10, details: "This is a great album with amazing tracks." },
    { id: 2, title: "Disk Two", label: "Label B", price: 15, details: "A classic collection of timeless songs." },
    { id: 3, title: "Disk Three", label: "Label C", price: 20, details: "An eclectic mix of genres and styles." },
  ]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      const favoriteIds = JSON.parse(storedFavorites);
      const favoritedDisks = disks.filter(disk => favoriteIds.includes(disk.id));
      setFavorites(favoritedDisks);
    }
  }, []);

  const handleToggleFavorite = (id: number) => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const updatedFavorites = storedFavorites.filter((favId: number) => favId !== id);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(prev => prev.filter(disk => disk.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl">Favorite Disks</h1>
        <Link href="/disks" className="px-4 py-2 bg-blue-500 text-white rounded">
          Back to Disks
        </Link>
      </div>
      {favorites.length === 0 ? (
        <p>No favorites yet!</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((disk) => (
            <li key={disk.id} className="border p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl">{disk.title}</h3>
                  <p className="text-gray-600">{disk.label}</p>
                  <p className="font-bold">${disk.price}</p>
                </div>
                <button
                  onClick={() => handleToggleFavorite(disk.id)}
                  className="text-yellow-500 text-2xl"
                >
                  ★
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesPage;