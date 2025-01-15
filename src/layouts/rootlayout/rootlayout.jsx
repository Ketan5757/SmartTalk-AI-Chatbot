import { Link, Outlet } from 'react-router-dom'
import './rootlayout.css'

const Rootlayout = () => {
    return (
        <div className='rootlayout'>
            <header>
                <Link>
                <img src="/logo.png" alt="" />
                <span>SMARTTALK AI</span>
                </Link>
                <div className="user">User</div>
                  
            </header>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}
export default Rootlayout