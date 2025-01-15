import './dashboardlayout.css';
import { Outlet } from 'react-router-dom';  // Correctly import Outlet

const Dashboardlayout = () => {
  return (
    <div className='dashboardlayout'>
      <div className="menu">MENU</div>
      <div className="content">
        <Outlet /> {/* Correct usage of Outlet */}
      </div>
    </div>
  );
};

export default Dashboardlayout;
