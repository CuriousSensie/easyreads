import React, {useState, useEffect} from 'react'
import { FaBook, FaExternalLinkAlt, FaPen, FaSearch } from 'react-icons/fa'
import BookItem from '../components/BookItem'
import { Link, Router, useNavigate } from 'react-router-dom'


const Home = () => {
  const [show, setShow] = useState(false);
  const [trending, setTrending] = useState([]);
  const [classics, setClassics] = useState([]);

  const navigate = useNavigate();

  // temp data for placeholders
  const getData = () =>{
    let temp = [
      {
        id: 1,
        title: 'The Alchemist',
        genre: ['Fiction', 'Adventure'],
        author: 'Paulo Coelho',
        rating: 4.5
      },
      {
        id: 2,
        title: 'The Great Gatsby',
        genre: ['Fiction', 'Classics'],
        author: 'F. Scott Fitzgerald',
        rating: 4.0
      },
      {
        id: 3,
        title: 'The Great Gatsby',
        genre: ['Fiction', 'Classics'],
        author: 'F. Scott Fitzgerald',
        rating: 4.0
      },
      {
        id: 4,
        title: 'The Great Gatsby',
        genre: ['Fiction', 'Classics'],
        author: 'F. Scott Fitzgerald',
        rating: 4.0
      },
      {
        id: 5,
        title: 'The Great Gatsby',
        genre: ['Fiction', 'Classics'],
        author: 'F. Scott Fitzgerald',
        rating: 4.0
      }
    ]

    setTrending(temp);

  }
  
  // get the data when page loads.
  useEffect(() => {
    getData();
  }, [])  
    
  return (
    <div className='w-full h-full flex flex-row'>
        {/* left */}
        <div className='w-1/4 lg:w-1/5h-full bg-secondary flex flex-col'>
          <div className='ml-2 flex flex-row items-center gap-2 mt-2 cursor-pointer'>
            <FaSearch />
            Browse
          </div>
          <div className='ml-2 gap-2 mt-2 cursor-pointer'> 
            <div className='flex flex-row gap-2 items-center' onClick={() => setShow(!show)}>
              <FaBook />
              Library
            </div>
            {show && <div className='flex flex-col gap-2 mt-2 ml-4'>
              <span className='flex flex-row items-center justify-between mr-2'>
                All
                <FaExternalLinkAlt />
              </span>
              <span className='flex flex-row items-center justify-between mr-2'>
                Recents
                <FaExternalLinkAlt />
              </span>
              <span className='flex flex-row items-center justify-between mr-2'>
                Favorites
                <FaExternalLinkAlt />
              </span>

              </div>
            }

          </div>
          <div className='ml-2 flex flex-row gap-2 items-center mt-2 cursor-pointer'> 
            <FaPen   />
            Notes
          </div>

        </div>
        {/* right */}
        <div className='w-3/4 lg:w-4/5 h-full bg-primary-foreground container mx-auto'>
        {/* trending */}
          <div >
            <h1 className='text-3xl m-2'>Trending</h1>
            <div className='flex flex-row m-4 overflow-x-scroll no-scrollbar gap-3'>
              {trending.map((book) => {
                  return (
                    <BookItem key={book.id - 1} book={book}/>
                  )
                })
              }
            </div>
          </div>
        
        {/* some genre */}
        </div>
    </div>
  )
}

export default Home