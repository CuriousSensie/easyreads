import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import BookItem from "../components/BookItem";

const ScrollableSection = ({ title, books }) => {
  const scrollContainerRef = useRef(null);
  const [showButtons, setShowButtons] = useState(false);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  useEffect(() => {
    const updateButtons = () => {
      const { current } = scrollContainerRef;
      if (!current) return;

      setShowLeftButton(current.scrollLeft > 0);
      setShowRightButton(current.scrollLeft < current.scrollWidth - current.clientWidth);
    };

    updateButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", updateButtons);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", updateButtons);
      }
    };
  }, []);

  // Enable smooth scrolling with the mouse wheel (horizontal scrolling for PCs)
  useEffect(() => {
    const handleWheelScroll = (e) => {
      if (scrollContainerRef.current) {
        e.preventDefault();
        scrollContainerRef.current.scrollBy({
          left: e.deltaY * 2, // Adjust sensitivity for better UX
          behavior: "smooth",
        });
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheelScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheelScroll);
      }
    };
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full">
      <h1 className="text-3xl m-2">{title}</h1>
      <div
        className="relative"
        onMouseEnter={() => setShowButtons(true)}
        onMouseLeave={() => setShowButtons(false)}
      >
        {/* Scroll Left Button - Appears on Hover */}
        <button
          onClick={() => scroll("left")}
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 
          bg-black/40 hover:bg-black/60 text-white p-3 rounded-full 
          transition-opacity duration-300 shadow-lg 
          ${showButtons && showLeftButton ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <FaChevronLeft size={22} />
        </button>

        {/* Scrollable Books Section */}
        <div
          ref={scrollContainerRef}
          className="flex flex-row overflow-x-auto no-scrollbar gap-3 p-4"
        >
          {books.map((book) => (
            <BookItem key={book.id} book={book} />
          ))}
        </div>

        {/* Scroll Right Button - Appears on Hover */}
        <button
          onClick={() => scroll("right")}
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 
          bg-black/40 hover:bg-black/60 text-white p-3 rounded-full 
          transition-opacity duration-300 shadow-lg 
          ${showButtons && showRightButton ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <FaChevronRight size={22} />
        </button>
      </div>
    </div>
  );
};

export default ScrollableSection;
