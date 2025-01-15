import React from "react";

interface DiskDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  disk: { title: string; label: string; price: number; details: string };
}

const DiskDetailsModal: React.FC<DiskDetailsModalProps> = ({ isOpen, onClose, disk }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="text-2xl">{disk.title}</h2>
        <p><strong>Label:</strong> {disk.label}</p>
        <p><strong>Price:</strong> ${disk.price}</p>
        <p><strong>Details:</strong> {disk.details}</p>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">Close</button>
      </div>
    </div>
  );
};

export default DiskDetailsModal;