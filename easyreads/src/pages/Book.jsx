import React from 'react'
import { Link, useParams } from 'react-router-dom';
import Hero1 from "../../public/hero1.jpg"
import { FaStar } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

const Book = () => {
  // using useParams hook to access the url, and get the book id
  const {id} = useParams()

  let book = {
    id: 1,
    title: 'The Alchemist',
    genre: ['Fiction', 'Adventure'],
    author: 'Paulo Coelho',
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, ratione perspiciatis. Magnam id nam eveniet corrupti facere dignissimos rerum excepturi repudiandae, in ut consectetur numquam fuga minima libero eaque vel natus maiores. Voluptas, facilis. Explicabo architecto impedit mollitia veritatis exercitationem quo aliquam et modi cumque doloremque sit aspernatur, blanditiis ex! Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores impedit alias eos, rem earum quos.",
    rating: 4.5
  }
  
  return (
    <div className='flex flex-row w-full h-full'>
      {/* left */}
      <div className='w-1/3 mt-10'>
        <img className='w-3/4 flex mx-auto' src={Hero1} alt={book.title} />
        <div className='flex flex-row justify-center mt-4'>
          <FaStar className='text-yellow-500' />
          <FaStar className='text-yellow-500' />
          <FaStar className='text-yellow-500' />
          <FaStar className='text-yellow-500' />
        </div>
      </div>

    
      {/* right */}
      <div className='w-2/3 h-full flex flex-col mt-10'>
        <h1 className='font-bold text-2xl mb-2'>{book.title}</h1>
        <h2 className='font-semibold text-xl mb-2'>By {book.author}</h2>
        <p className='font-medium mb-2'>{book.desc}</p>
        <div className='flex flex-row justify-between gap-4 px-4'>
          <Link className='mx-auto w-full' to={`/read/${book.id}`}>
            <Button className="w-full">Read</Button>
          </Link>
          <Link className='mx-auto w-full' to={`/read/${book.id}`}>
            <Button className="w-full">Add to Library</Button>
          </Link>
        </div>
        
      </div>
    </div>
  )
}

export default Book