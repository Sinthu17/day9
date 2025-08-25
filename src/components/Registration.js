import React, { useState } from "react";
// import { db } from "../firebase"; // import Firestore
// import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase"; // 🔹 db must come from firebase.js
import { collection, addDoc } from "firebase/firestore";


function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add data to Firestore "users" collection
      await addDoc(collection(db, "users"), {
        name: name,
        email: email,
        createdAt: new Date()
      });

      alert(`Registered: ${name}, ${email}`);
      setName(""); // clear input
      setEmail("");
    } catch (err) {
      console.error(err);
      alert("Error saving to Firebase");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 520 }}>
      <h2 className="mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
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
            className="form-control"
            placeholder="you@example.com"
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Registration;

