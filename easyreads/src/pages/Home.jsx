import React, { useState, useEffect } from "react";
import { FaBook, FaExternalLinkAlt, FaPen, FaSearch } from "react-icons/fa";
import BookItem from "../components/BookItem";
import { Link } from "react-router-dom";


const apiurl = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
  
  const [show, setShow] = useState(false);
  const [trending, setTrending] = useState([]);
  const [classics, setClassics] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Books Data
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(apiurl+"/api/books/all");
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        setTrending(data);
        setClassics(data);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  console.log(trending);
  
  return (
    <div className="w-full h-full flex flex-row">
      {/* Left Sidebar */}
      <div className="w-1/4 lg:w-1/5 h-full bg-secondary flex flex-col">
        <div className="ml-2 flex flex-row items-center gap-2 mt-2 cursor-pointer">
          <FaSearch />
          Browse
        </div>

        <div className="ml-2 gap-2 mt-2 cursor-pointer">
          <div className="flex flex-row gap-2 items-center" onClick={() => setShow(!show)}>
            <FaBook />
            Library
          </div>
          {show && (
            <div className="flex flex-col gap-2 mt-2 ml-4">
              {["All", "Recents", "Favorites"].map((item) => (
                <span key={item} className="flex flex-row items-center justify-between mr-2">
                  {item}
                  <FaExternalLinkAlt />
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="ml-2 flex flex-row gap-2 items-center mt-2 cursor-pointer">
          <FaPen />
          Notes
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4 lg:w-4/5 h-full bg-primary-foreground container mx-auto">
        {/* Trending Section */}
        <div>
          <h1 className="text-3xl m-2">Trending</h1>
          {loading ? (
            <p className="m-4 text-gray-600">Loading books...</p>
          ) : trending?.length > 0 ? (
            <div className="flex flex-row m-4 overflow-x-auto no-scrollbar gap-3">
              {trending.map((book) => (
                <BookItem key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <p className="m-4 text-gray-600">No trending books found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
