import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaStar, FaHeart } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Fallback from "../../public/fallback-image.jpg";
import { useUser } from "@clerk/clerk-react";

const apiurl = import.meta.env.VITE_BACKEND_URL;

const Book = () => {  
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [library, setLibrary] = useState([]);
  const user = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookResponse = await fetch(`${apiurl}/api/books/${id}`);
        if (!bookResponse.ok) throw new Error("Failed to fetch book data");
        const bookData = await bookResponse.json();
        setData(bookData);

        if (user.user) {
          const favResponse = await fetch(`${apiurl}/api/favorites/${user.user.id}`);
          const favData = await favResponse.json();
          setFavorites(favData.favorites.map(book => book._id));

          const libResponse = await fetch(`${apiurl}/api/library/${user.user.id}`);
          const libData = await libResponse.json();
          setLibrary(libData.library.map(book => book._id));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, user.user]);

  const toggleFavorite = async () => {
    if (!user.user) return;
    const isFavorite = favorites.includes(id);
    const endpoint = isFavorite ? "remove" : "add";
    try {
      await fetch(`${apiurl}/api/auth/favorites/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.user.id, bookId: id }),
      });
      setFavorites(prev => isFavorite ? prev.filter(bid => bid !== id) : [...prev, id]);
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  const toggleLibrary = async () => {
    if (!user.user) return;
    const isInLibrary = library.includes(id);
    const endpoint = isInLibrary ? "remove" : "add";
    try {
      await fetch(`${apiurl}/api/auth/library/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.user.id, bookId: id }),
      });
      setLibrary(prev => isInLibrary ? prev.filter(bid => bid !== id) : [...prev, id]);
    } catch (error) {
      console.error("Error updating library:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>Error: Book not found</div>;

  return (
    <div className="flex flex-row w-full">
      <div className="w-1/3 mt-10">
        <img className="w-3/4 flex mx-auto" src={data.image || Fallback} alt={data.title} />
        <div className="flex flex-row justify-center mt-4">
          {[...Array(4)].map((_, i) => <FaStar key={i} className="text-yellow-500" />)}
        </div>
      </div>

      <div className="w-2/3 h-full flex flex-col mt-10">
        <h1 className="font-bold text-2xl mb-2">{data.title}</h1>
        <h2 className="font-semibold text-xl mb-2">By {data.author}</h2>
        <p className="font-medium mb-2">{data.description}</p>

        <div className="flex flex-row justify-between gap-4 px-4">
          <Button onClick={toggleFavorite} className={favorites.includes(id) ? "bg-red-500" : "bg-gray-300"}>
            <FaHeart />
          </Button>
          <Link className="mx-auto w-full" to={`/read/${data._id}`}>
            <Button className="w-full">Read</Button>
          </Link>
          <Button onClick={toggleLibrary} className={library.includes(id) ? "bg-green-500" : "bg-gray-300"}>
            {library.includes(id) ? "Remove from Library" : "Add to Library"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Book;
