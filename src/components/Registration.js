// import React, { useState } from "react";
// import { db } from "../firebase"; 
// import { collection, addDoc } from "firebase/firestore";

// function Registration() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [success, setSuccess] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // ✅ Validation
//     if (name.length < 3) {
//       alert("Name must be at least 3 characters");
//       return;
//     }
//     if (!email.includes("@")) {
//       alert("Invalid email format");
//       return;
//     }
//     if (phone.length !== 10 || isNaN(phone)) {
//       alert("Phone must be exactly 10 digits");
//       return;
//     }

//     setLoading(true);
//     try {
//       await addDoc(collection(db, "users"), {
//         name,
//         email,
//         phone,
//         createdAt: new Date(),
//       });

//       setSuccess(true);
//       setName("");
//       setEmail("");
//       setPhone("");
//     } catch (err) {
//       console.error("❌ Firebase Error:", err);
//       alert("Error saving to Firebase. Check console.");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="container mt-5" style={{ maxWidth: 520 }}>
//       <h2 className="mb-4">Register</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label className="form-label">Name</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="form-control"
//             placeholder="Enter your name"
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="form-control"
//             placeholder="you@example.com"
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Phone</label>
//           <input
//             type="text"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             className="form-control"
//             placeholder="Enter 10-digit phone"
//             required
//           />
//         </div>

//         <button type="submit" className="btn btn-success w-100" disabled={loading}>
//           {loading ? "Submitting..." : "Submit"}
//         </button>
//       </form>

//       {success && (
//         <div className="alert alert-success mt-3" role="alert">
//           ✅ Registration successful!
//         </div>
//       )}
//     </div>
//   );
// }

// export default Registration;

import React, { useState } from "react";
import { Link } from "react-router-dom";

import { db } from "../firebase"; 
import { collection, addDoc } from "firebase/firestore";
import "./Registration.css";

 // Make sure your style.css includes below styles

function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation
    if (name.length < 3) {
      alert("Name must be at least 3 characters");
      return;
    }
    if (!email.includes("@")) {
      alert("Invalid email format");
      return;
    }
    if (phone.length !== 10 || isNaN(phone)) {
      alert("Phone must be exactly 10 digits");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "users"), {
        name,
        email,
        phone,
        createdAt: new Date(),
      });

      setSuccess(true);
      setName("");
      setEmail("");
      setPhone("");
    } catch (err) {
      console.error("❌ Firebase Error:", err);
      alert("Error saving to Firebase. Check console.");
    }
    setLoading(false);
  };

  return (
    <div className="registration-wrapper">
      <div className="registration-card">
        <h2 className="mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control premium-input"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control premium-input"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control premium-input"
              placeholder="Enter 10-digit phone"
              required
            />
          </div>

          <button type="submit" className="btn premium-btn w-100" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

        {success && (
          <div className="alert alert-success mt-3 premium-alert" role="alert">
            ✅ Registration successful!
          </div>
        )}
      </div>
    </div>
  );
}

export default Registration;
