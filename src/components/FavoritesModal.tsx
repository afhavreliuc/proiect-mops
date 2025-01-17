import React from 'react';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favoriteDisks: any[];
  onToggleFavorite: (id: number) => void;
  onAddToCart: (disk: { title: string; price: number; id: number }) => void;
}

const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favoriteDisks,
  onToggleFavorite,
  onAddToCart
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="modal bg-white rounded-lg p-4 max-w-lg w-full">
        <h2 className="text-2xl mb-4">Favorite Disks</h2>
        {favoriteDisks.length === 0 ? (
          <p>No favorite disks yet.</p>
        ) : (
          <ul>
            {favoriteDisks.map((disk) => (
              <li key={disk.id} className="flex justify-between items-center mb-2">
                <span>{disk.title} - ${disk.price}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => onToggleFavorite(disk.id)}
                    className="text-yellow-500 px-2 py-1"
                  >
                    ★
                  </button>
                  <button
                    onClick={() => onAddToCart(disk)}
                    className="px-2 py-1 bg-green-500 text-white rounded"
                  >
                    Add to Cart
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default FavoritesModal;