import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

const SpotifyButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const handleConnect = () => {
    if (!clientId || !clientSecret) {
      alert("Please provide a Client ID and Client Secret");
      return;
    }

    const redirectUri = "http://localhost:3000/callback"; // Replace with your redirect URI
    const scopes = "user-library-read";
    const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(
      scopes
    )}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${encodeURIComponent(
      JSON.stringify({ clientId, clientSecret })
    )}`;

    window.location.href = authUrl;
  };

  return (
    <div className="w-full">
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-2 font-normal w-full text-xl border h-12 flex justify-between items-center"
      >
        <FontAwesomeIcon icon={faSpotify} className="h-7 w-7" />
        <span>Connect With Spotify</span>
        <span className="h-7 w-7"></span>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 max-w-lg w-full">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-normal">Connect With Spotify</h2>
              <input
                type="text"
                placeholder="Client ID"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className="px-4 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="Client Secret"
                value={clientSecret}
                onChange={(e) => setClientSecret(e.target.value)}
                className="px-4 py-2 border rounded"
              />
              <button
                onClick={handleConnect}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded self-end hover:bg-green-600 transition-colors"
              >
                Connect
              </button>
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

export default SpotifyButton;