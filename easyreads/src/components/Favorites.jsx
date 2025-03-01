import { useUser } from '@clerk/clerk-react';
import React, { useState, useEffect } from 'react';
import BookItem from './BookItem'; // Ensure you have a BookItem component
const apiurl = import.meta.env.VITE_BACKEND_URL;

function Favorites() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiurl}/api/auth/favorites/${user.id}`);
        if (!response.ok) throw new Error("Failed to fetch favorites");
        const data = await response.json();
        
        // Assuming `data.favorites` is an array of book objects
        setFavorites(data.favorites);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  return (
    <div className="p-4" style={{minHeight : 'calc(100vh - 3rem)'}}>
      <h1 className="text-3xl m-2">My Library</h1>
      {loading ? (
        <p className="m-4 text-gray-600">Loading Library...</p>
      ) : favorites.length > 0 ? (
        <div className="flex flex-row m-4 flex-wrap no-scrollbar gap-3">
          {favorites.map((book) => (
            <BookItem key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <p className="m-4 text-gray-600">No favorite books found.</p>
      )}
    </div>
  );
}

export default Favorites;
