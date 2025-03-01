import { useUser } from '@clerk/clerk-react';
import React, { useState, useEffect } from 'react';
import BookItem from './BookItem'; // Ensure you have a BookItem component
const apiurl = import.meta.env.VITE_BACKEND_URL;

function Library() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [library, setLibrary] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchLibrary = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiurl}/api/auth/library/${user.id}`);
        if (!response.ok) throw new Error("Failed to fetch library");
        const data = await response.json();
        
        setLibrary(data.library);
      } catch (error) {
        console.error("Error fetching library:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLibrary();
  }, [user]);

  return (
    <div className="p-4" style={{minHeight : 'calc(100vh - 3rem)'}}>
      <h1 className="text-3xl m-2">My Library</h1>
      {loading ? (
        <p className="m-4 text-gray-600">Loading Library...</p>
      ) : library.length > 0 ? (
        <div className="flex flex-row m-4 flex-wrap no-scrollbar gap-3">
          {library.map((book) => (
            <BookItem key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <p className="m-4 text-gray-600">No favorite books found.</p>
      )}
    </div>
  );
}

export default Library;
