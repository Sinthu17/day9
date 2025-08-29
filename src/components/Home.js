// import React from "react";
// import { Link } from "react-router-dom";

// function Home() {
//   return (
//     <div className="container mt-5">
//       <h1>Welcome to {`Mobile App Development `}</h1>
//       <p>Manage your data efficiently using our mobile app.</p>
//       <Link to="/registration" className="btn btn-primary me-2">Register</Link>
//       <Link to="/about" className="btn btn-primary me-2">About</Link>
//     </div>
//   );
// }

// export default Home;


import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "../style.css"; // if style.css is inside src/




function Home() {
  return (
    <div className="home-wrapper">
      <div className="circle circle1"></div>
      <div className="circle circle2"></div>
      <div className="circle circle3"></div>
     <div className="circle circle4"></div>


      <div className="home-card">
        <h1>Welcome to {`Mobile App Development `}</h1>
        <p>Manage your data efficiently using our mobile app.</p>
        <div className="btn-group">
          <Link to="/registration" className="btn btn-primary rounded-pill">
            Register
          </Link>
          <Link to="/about" className="btn btn-success rounded-pill">
            About
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;

