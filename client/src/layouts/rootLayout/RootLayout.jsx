import { Link, Outlet } from 'react-router-dom'
import './rootLayout.css'
import { ClerkProvider, SignedIn, UserButton } from '@clerk/react-router'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable key")
}

const RootLayout  = () => {
    return(
        <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <div className='rootLayout'>
            <header>
                <Link to="/" className="logo">
                <img src="/logo1.png" alt="" />
                <span>SmartTalk-AI</span>
                </Link>
                <div className="user">
                    <SignedIn>
                        <UserButton/>
                    </SignedIn>
                </div>
            </header>
            <main>
                <Outlet/>
            </main>
        </div>
        </ClerkProvider>
    )
}

export default  RootLayout