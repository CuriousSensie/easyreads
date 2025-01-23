import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { SignedIn, SignedOut, UserButton, SignInButton} from '@clerk/clerk-react'
import { ModeToggle } from './mode-toggle'
import Logo from "../../public/ER.png"


const Header = () => {
  return (
    <>
        <nav className='px-8 flex h-12 justify-between items-center'>
            <Link>
              <img src={Logo} className='h-10 w-10' alt="" />
            </Link>

            {/* <Button variant="outline">Login</Button>  */}
            <div className='grid grid-cols-2 gap-4'>
              <ModeToggle />

              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>        
        </nav>
    </>
  )
}

export default Header