import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Fallback from "../../public/fallback-image.jpg";

const BookItem = ({ book }) => {

  return (
    <Link to={`/book/${book._id}`} className='cursor-pointer min-w-32 max-w-32 min-h-full shadow-md bg-cardcolor lg:min-w-40'>  
      <img src={book.image} alt={book.title} onError={(e) => (e.target.src = Fallback)} />
      <div>
        <h1 className='truncate text-lg font-bold'>{book.title}</h1>
        <h2 className='truncate font-medium'>{book.author}</h2>
      </div>
    </Link>
  );
};

export default BookItem;