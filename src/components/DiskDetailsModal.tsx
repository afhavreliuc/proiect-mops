import React from "react";

interface DiskDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  disk: { title: string; label: string; price: number; details: string };
}

const DiskDetailsModal: React.FC<DiskDetailsModalProps> = ({ isOpen, onClose, disk }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 max-w-lg w-full">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-normal">{disk.title}</h2>
          <div className="flex flex-col gap-2">
            <p><span className="font-semibold">Label:</span> {disk.label}</p>
            <p><span className="font-semibold">Price:</span> ${disk.price}</p>
            <p><span className="font-semibold">Details:</span> {disk.details}</p>
          </div>
          <button 
            onClick={onClose} 
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded self-end hover:bg-red-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiskDetailsModal;