// import React from "react";

// function About() {
//   return (
//     <div className="container mt-5">
//       <h2>About {`Mobile App Development `}</h2>
//       <p>
//         This app is developed to demonstrate mobile app skills using React and Firebase.
//       </p>
//     </div>
//   );
// }

// export default About;

import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-wrapper">
      <div className="about-card">
        <h2>About {`Mobile App Development`}</h2>
        <p>
          This app is developed to demonstrate mobile app skills using React and Firebase.
        </p>
      </div>
    </div>
  );
}

export default About;

