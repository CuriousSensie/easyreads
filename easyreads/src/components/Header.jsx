import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { SignedIn, SignedOut, UserButton, SignInButton, useUser} from '@clerk/clerk-react'
import { ModeToggle } from './mode-toggle'
import Logo from "../../public/ER.png"
import {FaSearch} from 'react-icons/fa'
import { Input } from './ui/input'


const Header = () => {
  // I'll use this later to display the name
  const user = useUser();

  return (
    <>
        <nav className='px-8 flex h-12 justify-between items-center border-b-2 border-solid border-slate-500'>
          {/* Left */}
          <div className='flex flex-row items-center justify-center gap-4'>
            {/* logo */}
            <Link className='flex flex-row'>
              <h1 className='text-bold text-xl text-slate-700'>E</h1>
              <h1 className='text-bold text-xl text-slate-600'>A</h1>
              <h1 className='text-bold text-xl text-slate-500'>S</h1>
              <h1 className='text-bold text-xl text-slate-400'>Y</h1>
              <h1 className='text-bold text-xl text-slate-300'>R</h1>
              <h1 className='text-bold text-xl text-slate-400'>E</h1>
              <h1 className='text-bold text-xl text-slate-500'>A</h1>
              <h1 className='text-bold text-xl text-slate-600'>D</h1>
              <h1 className='text-bold text-xl text-slate-700'>S</h1>
            </Link>

            {/* search bar */}
            <div className="flex flex-row border-2 border-slate-700 border-solid rounded-lg gap-1">
              <SignedIn>
                <Input className="h-6 border-none outline-none" type="text" placeholder="Search Books" />
                <Button className="h-6 border-none" variant="outline" size="icon">
                  <FaSearch />
                </Button>
              </SignedIn>
            </div>
          </div>
          
          {/* Right */}
          <div>
            <div className='grid grid-cols-2 gap-4'>
              <ModeToggle />
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>        
          </div>
        </nav>
    </>
  )
}

export default Header