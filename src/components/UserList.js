import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("table"); // toggle table / card

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const userData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userData);
    };
    fetchUsers();
  }, []);

  // search filter
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // sort function
  const sortBy = (key) => {
    const sorted = [...filteredUsers].sort((a, b) =>
      a[key].toLowerCase() > b[key].toLowerCase() ? 1 : -1
    );
    setUsers(sorted);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-3">Registered Users</h2>

      {/* Search box */}
      <input
        type="text"
        placeholder="Search by name"
        className="form-control mb-3"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Toggle button */}
      <div className="mb-3">
        <button
          className="btn btn-primary me-2"
          onClick={() => setView("table")}
        >
          Table View
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => setView("card")}
        >
          Card View
        </button>
      </div>

      {/* Table View */}
      {view === "table" && (
        <table className="table table-bordered table-hover table-striped">
          <thead>
            <tr>
              <th onClick={() => sortBy("name")} style={{ cursor: "pointer" }}>
                Name ⬍
              </th>
              <th
                onClick={() => sortBy("email")}
                style={{ cursor: "pointer" }}
              >
                Email ⬍
              </th>
              <th
                onClick={() => sortBy("phone")}
                style={{ cursor: "pointer" }}
              >
                Phone ⬍
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Card View */}
      {view === "card" && (
        <div className="row">
          {filteredUsers.map((user) => (
            <div className="col-md-4 mb-3" key={user.id}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text mb-1">
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p className="card-text">
                    <strong>Phone:</strong> {user.phone}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserList;
