import { useState } from "react";
import Image from "next/image";
import AudioRecorder from '../AudioRecorder';

const ShazamModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full">
      <button 
        onClick={() => setIsModalOpen(true)}
        className="px-2 font-normal w-full text-xl border h-12 flex justify-between items-center"
      >
        <span className="h-7 w-7">🎵</span>
        <span>Shazam a Song</span>
        <span className="h-7 w-7"></span>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 max-w-lg w-full">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-normal">Shazam a Song</h2>
              <AudioRecorder onClose={() => setIsModalOpen(false)} />
              <button 
                onClick={() => setIsModalOpen(false)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded self-end hover:bg-red-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShazamModal;
