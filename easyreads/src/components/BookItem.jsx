import React from 'react';
import Hero1 from "../../public/hero1.jpg"; // Assuming Hero1 is the image path
import { Link } from 'react-router-dom';
const apiurl = import.meta.env.VITE_BACKEND_URL;

import Fallback from "../../public/fallback-image.jpg";

const BookItem = ({ book }) => {
  const imageurl = apiurl + '/' + book.image;

  return (
    <Link to={`/book/${book._id}`} className='cursor-pointer min-w-32 max-w-32  min-h-full shadow-md bg-cardcolor lg:min-w-40 '>  
        <img className='flex-1 object-cover' src={book.image ? imageurl : Fallback} alt="" />
        <div>
          <h1 className='truncate text-lg font-bold'>{book.title}</h1>
          <h2 className='truncate font-medium'>{book.author}</h2>
        </div>
    </Link>
  );
};

export default BookItem;
