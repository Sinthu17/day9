import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Modal, Button } from "react-bootstrap";

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("table"); // toggle table / card

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  // Delete Modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Fetch users
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

  // Search filter
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort
  const sortBy = (key) => {
    const sorted = [...filteredUsers].sort((a, b) =>
      a[key].toLowerCase() > b[key].toLowerCase() ? 1 : -1
    );
    setUsers(sorted);
  };

  // Add new user
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "users"), { name, email, phone });
      setUsers([...users, { id: docRef.id, name, email, phone }]);
      setName("");
      setEmail("");
      setPhone("");
    } catch (err) {
      console.error(err);
      alert("Error adding user");
    }
  };

  // Start edit
  const handleEdit = (user) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
  };

  // Update user
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const userRef = doc(db, "users", editingUser.id);
      await updateDoc(userRef, { name, email, phone });
      setUsers(
        users.map((u) =>
          u.id === editingUser.id ? { ...u, name, email, phone } : u
        )
      );
      setEditingUser(null);
      setName("");
      setEmail("");
      setPhone("");
    } catch (err) {
      console.error(err);
      alert("Error updating user");
    }
  };

  // Confirm delete
  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  // Delete user
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "users", deleteId));
      setUsers(users.filter((u) => u.id !== deleteId));
      setShowDeleteModal(false);
    } catch (err) {
      console.error(err);
      alert("Error deleting user");
    }
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

      {/* Toggle view */}
      <div className="mb-3">
        <button className="btn btn-primary me-2" onClick={() => setView("table")}>
          Table View
        </button>
        <button className="btn btn-secondary" onClick={() => setView("card")}>
          Card View
        </button>
      </div>

      {/* Add / Update form */}
      <form onSubmit={editingUser ? handleUpdate : handleAdd} className="mb-4">
        <div className="row g-2">
          <div className="col-md-3">
            <input
              type="text"
              placeholder="Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              placeholder="Phone"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="col-md-3 d-flex">
            <button type="submit" className="btn btn-success me-2">
              {editingUser ? "Update" : "Add"}
            </button>
            {editingUser && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setEditingUser(null);
                  setName("");
                  setEmail("");
                  setPhone("");
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Table view */}
      {view === "table" && (
        <table className="table table-bordered table-hover table-striped">
          <thead>
            <tr>
              <th onClick={() => sortBy("name")} style={{ cursor: "pointer" }}>
                Name ⬍
              </th>
              <th onClick={() => sortBy("email")} style={{ cursor: "pointer" }}>
                Email ⬍
              </th>
              <th onClick={() => sortBy("phone")} style={{ cursor: "pointer" }}>
                Phone ⬍
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleEdit(u)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => confirmDelete(u.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Card view */}
      {view === "card" && (
        <div className="row">
          {filteredUsers.map((u) => (
            <div className="col-md-4 mb-3" key={u.id}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{u.name}</h5>
                  <p className="card-text mb-1">
                    <strong>Email:</strong> {u.email}
                  </p>
                  <p className="card-text">
                    <strong>Phone:</strong> {u.phone}
                  </p>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleEdit(u)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => confirmDelete(u.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserList;
