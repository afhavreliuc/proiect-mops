import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Callback = () => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState("");
  const [likedSongs, setLikedSongs] = useState([]);

  useEffect(() => {
    const fetch_liked_songs = async (code: string, clientId: string, clientSecret: string) => {
      const redirectUri = "http://localhost:3000/callback"; // Replace with your redirect URI

      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: redirectUri,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch access token");
      }

      const data = await response.json();
      setAccessToken(data.access_token);

      const likedSongsResponse = await fetch("https://api.spotify.com/v1/me/tracks", {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      });

      const likedSongsData = await likedSongsResponse.json();
      
      setLikedSongs(likedSongsData.items || []);

      // Store likedSongsData in session storage
      sessionStorage.setItem('likedSongsData', JSON.stringify(likedSongsData.items || []));

      // Send likedSongsData to another endpoint
        //   const sendLikedSongsData = async () => {};
    };

    if (router.query.code && router.query.state) {
      const { code, state } = router.query;
      const { clientId, clientSecret } = JSON.parse(decodeURIComponent(state as string));
      fetch_liked_songs(code as string, clientId, clientSecret);
    }
  }, [router.query.code, router.query.state]);

  const handleRedirectHome = async () => {
    // send the content of likedSongs from session storage to another endpoint
    const likedSongsData = sessionStorage.getItem('likedSongsData');
    console.log(likedSongsData);

    if (likedSongsData) {
        try {
          const response = await fetch('http://127.0.0.1:5000/spotify-liked-songs', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: likedSongsData,
          });
    
          if (!response.ok) {
            throw new Error('Failed to send liked songs data');
          }
    
          const result = await response.json();
          console.log('Data sent successfully:', result);
        } catch (error) {
          console.error('Error sending liked songs data:', error);
        }
      }
    router.push("/");
  };

  return (
    <div>
      <h1>Spotify Liked Songs</h1>
      {accessToken && (
        <div>
          <ul>
            {likedSongs.map((song: any) => (
              <li key={song.track.id}>
                {song.track.name} by {song.track.artists.map((artist: any) => artist.name).join(", ")}
              </li>
            ))}
          </ul>
          {likedSongs && (
            <button
            onClick={handleRedirectHome}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Go to Home
          </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Callback;