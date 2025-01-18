import { getSongs } from "@/app/api/requests/disk";
import React, { useEffect, useState } from "react";

interface DiskDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  disk: { id: number,  title: string; label: string; price: number; details: string; format: string };
}
interface Song {
  idSong: number;
  songName: string;
  releaseDate: string;
}

const DiskDetailsModal: React.FC<DiskDetailsModalProps> = ({ isOpen, onClose, disk }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !disk?.id) return;

    const fetchSongs = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedSongs = await getSongs(disk.id);
        setSongs(fetchedSongs);
      } catch (err) {
        setError("Failed to fetch songs. Please try again.");
        console.error("Error fetching songs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [isOpen, disk?.id]);

  if (!isOpen || !disk) return null;

  return (
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="modal bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">{disk.title}</h2>
            <p>
              <strong>Label:</strong> {disk.label}
            </p>
            <p>
              <strong>Price:</strong> ${disk.price}
            </p>
            <p>
              <strong>Details:</strong> {disk.details}
            </p>
            <p>
              <strong>Format:</strong> {disk.format}
            </p>
            <h3 className="text-xl font-bold mt-4">Songs:</h3>
            <ul className="list-disc pl-5">
              {songs.map((song) => (
                <li key={song.idSong}>
                  <strong>{song.songName}</strong> (Released: {song.releaseDate})
                </li>
              ))}
            </ul>
          </>
        )}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DiskDetailsModal;
