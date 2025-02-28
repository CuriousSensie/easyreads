import React, { useState, useEffect } from "react";
import { FaHome, FaBook, FaExternalLinkAlt, FaPen, FaSearch, FaPlus } from "react-icons/fa";
import BookItem from "../components/BookItem";
import { Link } from "react-router-dom";
import AddBook from "@/components/AddBook";
import Browse from "@/components/Browse";


const apiurl = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
  const [show, setShow] = useState(false);
  const [allBooks, setAllBooks] = useState([]);
  const [trending, setTrending] = useState([]);
  const [classics, setClassics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddBook, setShowAddBook] = useState(false);
  const [showBrowse, setshowBrowse] = useState(false);

  // Fetch Books Data
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(apiurl + "/api/books/all");
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        setAllBooks(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  // filter trending books
  useEffect(() => {
    const filterTrendingBooks = () => {
      const trendingBooks = allBooks.filter(book => book.genre.some((g) => g.toLowerCase().includes("trending")) );
      setTrending(trendingBooks);
    };
    filterTrendingBooks();
  }, [allBooks]);
  // filter classics books
  useEffect(() => {
    const filterClassicsBooks = () => {
      const classicsBooks = allBooks.filter(book => book.genre.some((g) => g.toLowerCase().includes("classic")) );
      setClassics(classicsBooks);
    };
    filterClassicsBooks();
  }, [allBooks]);

  return (
    <div className="w-full h-full flex flex-row">
      {/* Left Sidebar */}
      <div className="w-1/4 lg:w-1/5 h-full bg-secondary flex flex-col">
        <div className="ml-2 flex flex-row items-center gap-2 mt-2 cursor-pointer" onClick={() => {
          setShowAddBook(false);
          setshowBrowse(false);
        }}>
          <FaHome />
          Home
        </div>

        <div className="ml-2 flex flex-row items-center gap-2 mt-2 cursor-pointer" onClick={() => {
          setShowAddBook(false);
          setshowBrowse(true);
        }}>
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

        <div onClick={() => {
          showAddBook ? setShowAddBook(false) :
            setShowAddBook(true);
        }} className="ml-2 flex flex-row gap-2 items-center mt-2 cursor-pointer">
          <FaPlus />
          Add Book
        </div>
      </div>




      {/* Main Content */}
      <div className="w-3/4 lg:w-4/5 h-full bg-primary-foreground container mx-auto">
        {showAddBook ? <AddBook /> : showBrowse ? <Browse allBooks={allBooks} /> :
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

            {/* classics */}
            <h1 className="text-3xl m-2">Classics</h1>
            {loading ? (
              <p className="m-4 text-gray-600">Loading books...</p>
            ) : classics?.length > 0 ? (
              <div className="flex flex-row m-4 overflow-x-auto no-scrollbar gap-3">
                {classics.map((book) => (
                  <BookItem key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <p className="m-4 text-gray-600">No trending books found.</p>
            )}
          </div>
          }
      </div>
    </div>
  );
};

export default Home;
