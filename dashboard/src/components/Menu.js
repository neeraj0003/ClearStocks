import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  // Logout function
  const handleLogout =async () => {
    await localStorage.removeItem("token");
    await Cookies.remove("token");
    window.location.href = "https://frontend-z.netlify.app";
  };

  // Go to frontend home
  const goToFrontend = () => {
    window.location.href = "https://frontend-z.netlify.app";
  };

  return (
    <div className="menu-container">
      <img src="logo.png" alt="Logo" style={{ width: "50px", margin: "20px auto", display: "block" }} />

      <div className="menus">
        <ul>
          <li>
            <Link to="/" onClick={() => handleMenuClick(0)} style={{ textDecoration: "none" }}>
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>Dashboard</p>
            </Link>
          </li>
          <li>
            <Link to="/orders" onClick={() => handleMenuClick(1)} style={{ textDecoration: "none" }}>
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>Orders</p>
            </Link>
          </li>
          <li>
            <Link to="/holdings" onClick={() => handleMenuClick(2)} style={{ textDecoration: "none" }}>
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>Holdings</p>
            </Link>
          </li>
          <li>
            <Link to="/positions" onClick={() => handleMenuClick(3)} style={{ textDecoration: "none" }}>
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>Positions</p>
            </Link>
          </li>
          <li>
            <Link to="/funds" onClick={() => handleMenuClick(4)} style={{ textDecoration: "none" }}>
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>Funds</p>
            </Link>
          </li>
             <li>
            <p onClick={goToFrontend} className={menuClass} style={{ cursor: "pointer" }}>
              Exit Dashboard
            </p>
          </li>
          {/* <li>
            <p onClick={handleLogout} className={menuClass} style={{ cursor: "pointer" }}>
              Logout
            </p>
          </li> */}
       
        </ul>

        <hr style={{ margin: "20px 0" }} />

        <div className="profile" onClick={handleProfileClick}>
          <div className="avatar">ZU</div>
          <p className="username">USERID</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
