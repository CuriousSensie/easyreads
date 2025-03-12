import React from 'react';
import { Link } from 'react-router-dom';

import Fallback from "../../public/fallback-image.jpg";

const BookItem = ({ book }) => {
  return (
    <Link 
      to={`/book/${book._id}`} 
      className="cursor-pointer min-w-32 max-w-32 lg:min-w-40 shadow-md bg-cardcolor flex flex-col items-center"
    >  
      <div className="w-full h-48 lg:h-56 overflow-hidden">
        <img 
          className="w-full h-full object-cover"
          src={book.image} 
          alt={book.title} 
          onError={(e) => (e.target.src = Fallback)} 
        />
      </div>
      <div className="p-2  w-full">
        <h1 className="truncate text-lg font-bold">{book.title}</h1>
        <h2 className="truncate font-medium">{book.author}</h2>
      </div>
    </Link>
  );
};

export default BookItem;
