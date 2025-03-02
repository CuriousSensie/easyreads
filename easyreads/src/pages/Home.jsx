import React, { useState, useEffect, useRef } from "react";
import { FaHome, FaBook, FaExternalLinkAlt, FaPen, FaSearch, FaPlus, FaBug} from "react-icons/fa";
import BookItem from "../components/BookItem";
import AddBook from "@/components/AddBook";
import Browse from "@/components/Browse";
import Favorites from "@/components/Favorites";
import Library from "@/components/Library";
import Report from "@/components/Report";
import ScrollableSection from "@/components/ScrollableSection";

const apiurl = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
  const [showLibraryMenu, setShowLibraryMenu] = useState(false);
  const [allBooks, setAllBooks] = useState([]);
  const [trending, setTrending] = useState([]);
  const [classics, setClassics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");

  // Refs for scrolling
  const trendingRef = useRef(null);
  const classicsRef = useRef(null);

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

  // Filter trending books
  useEffect(() => {
    setTrending(allBooks.filter(book => book.genre.some((g) => g.toLowerCase().includes("trending"))));
  }, [allBooks]);

  // Filter classics books
  useEffect(() => {
    setClassics(allBooks.filter(book => book.genre.some((g) => g.toLowerCase().includes("classic"))));
  }, [allBooks]);

  // Scroll function
  const scrollHorizontally = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full flex flex-row" style={{minHeight : 'calc(100vh - 3rem)'}}>
      {/* Left Sidebar */}
      <div className="w-1/4 lg:w-1/5 min-h-full bg-secondary flex flex-col">
        <div className="ml-2 flex flex-row items-center gap-2 mt-2 cursor-pointer" onClick={() => setActiveSection("home")}>
          <FaHome />
          Home
        </div>
        <div className="ml-2 flex flex-row items-center gap-2 mt-2 cursor-pointer" onClick={() => setActiveSection("browse")}>
          <FaSearch />
          Browse
        </div>
        <div className="ml-2 gap-2 mt-2 cursor-pointer">
          <div className="flex flex-row gap-2 items-center" onClick={() => setShowLibraryMenu(!showLibraryMenu)}>
            <FaBook />
            Library
          </div>
          {showLibraryMenu && (
            <div className="flex flex-col gap-2 mt-2 ml-4">
              <span className="flex flex-row items-center justify-between mr-2" onClick={() => setActiveSection("library")}>
                All <FaExternalLinkAlt />
              </span>
              <span className="flex flex-row items-center justify-between mr-2" onClick={() => setActiveSection("favorites")}>
                Favorites <FaExternalLinkAlt />
              </span>
              <span className="flex flex-row items-center justify-between mr-2">
                Recents <FaExternalLinkAlt />
              </span>
            </div>
          )}
        </div>
        <div className="ml-2 flex flex-row gap-2 items-center mt-2 cursor-pointer">
          <FaPen />
          Notes
        </div>
        <div className="ml-2 flex flex-row gap-2 items-center mt-2 cursor-pointer" onClick={() => setActiveSection("addBook")}>
          <FaPlus />
          Add Book
        </div>
        <div className="ml-2 flex flex-row gap-2 items-center mt-2 cursor-pointer" onClick={() => setActiveSection("report")}>
          <FaBug />
          Report a Bug
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4 lg:w-4/5 min-h-full bg-primary-foreground container mx-auto">
        {activeSection === "addBook" ? <AddBook /> :
          activeSection === "browse" ? <Browse allBooks={allBooks} /> :
            activeSection === "favorites" ? <Favorites /> :
              activeSection === "library" ? <Library /> :
                activeSection === "report" ? <Report /> :
                <div>
                  <ScrollableSection title="Trending" books={trending} />
                  <ScrollableSection title="Classics" books={classics} />
                </div>

        }
      </div>
    </div>
  );
};

export default Home;
