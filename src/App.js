// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUserPlus,
  FaUsers,
  FaInfoCircle
} from "react-icons/fa";

import Home from "./components/Home";
import Registration from "./components/Registration";
import About from "./components/About";
import UserList from "./components/UserList";

// Navbar Component
function Navbar() {
  const location = useLocation();

  const getNavItem = (to, icon, label) => {
    const isActive = location.pathname === to;
    return (
      <li className="nav-item mx-2">
        <Link
          className={`nav-link d-flex align-items-center gap-2 ${
            isActive ? "fw-bold active-link" : "text-light"
          }`}
          to={to}
        >
          {/* Show icon only if active */}
          {isActive && (
            <span className="icon icon-active text-warning">
              {icon}
            </span>
          )}
          {label}
        </Link>
      </li>
    );
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        background: "linear-gradient(90deg, #BA6E8F, #9F6496)",
        transition: "all 0.5s ease",
      }}
    >
      <div className="container">
        <Link className="navbar-brand text-white fw-bold" to="/">
          MobileApp
        </Link>
        <div className="collapse navbar-collapse show">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {getNavItem("/", <FaHome />, "Home")}
            {getNavItem("/registration", <FaUserPlus />, "Registration")}
            {getNavItem("/users", <FaUsers />, "User List")}
            {getNavItem("/about", <FaInfoCircle />, "About")}
          </ul>
        </div>
      </div>
    </nav>
  );
}

// Main App
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
