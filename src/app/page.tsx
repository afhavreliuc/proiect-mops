"use client";

import ShazamModal from "@/components/shazam/ShazamModal";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SpotifyButton from "@/components/spotify/SpotifyButton";

export default function Home() {
  return (
    <div className="flex-1 w-full flex flex-col items-center px-4">
      <div className="text-8xl font-extralight pt-6">
        The Vault for all your tunes.
      </div>
      <div
        className="mt-6 w-full min-h-[922px] flex flex-col items-center px-4"
        style={{ backgroundImage: `url(/bg-player.png)` }}
      >
        <div className="text-white text-4xl font-extralight max-w-[1065px] pt-12">
          Vaultone brings the timeless charm of vinyl records into the modern
          age. Connect your Spotify account and let our innovative platform
          transform your music journey. Our smart integration customizes vinyl
          collections based on your streaming history, preferences, and
          most-loved tracks, making it easier than ever to discover and own the
          records that resonate with you.
        </div>

        <div className="pt-12 max-w-[848px]">
          <div className="w-full flex justify-between gap-12 py-12 text-white text-3xl">
            <SpotifyButton />
            <ShazamModal />
          </div>
          <div className="text-white text-xl font-extralight drop-shadow-lg">
            Connect to Spotify so we can analyze your favorites list and compare
            it to our collection. This allows us to create a selection tailored
            specifically for you. Once you're logged in, we'll identify albums
            that bring together as many of your favorite tracks as possible,
            giving you a fully customized listening experience.
          </div>
        </div>
      </div>
    </div>
  );
}