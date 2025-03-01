import React from 'react'
import { Link } from 'react-router-dom'
import { SignedIn, SignedOut, UserButton, SignInButton} from '@clerk/clerk-react'
import { ModeToggle } from './mode-toggle'


const Header = () => {
  return (
    <>
        <nav className='px-8 flex h-12 justify-between items-center border-b-2 border-solid border-slate-500'>
          {/* Left */}
          <div className='flex flex-row items-center justify-center gap-4'>
            {/* logo */}
            <Link className='flex flex-row' to='/'>
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