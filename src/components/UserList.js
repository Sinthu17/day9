import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { Modal, Button } from "react-bootstrap";
import "./UserList.css"; // custom styles

function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("table");

  const [editingUser, setEditingUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const userData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(userData);
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortBy = key => {
    const sorted = [...filteredUsers].sort((a, b) =>
      a[key].toLowerCase() > b[key].toLowerCase() ? 1 : -1
    );
    setUsers(sorted);
  };

  const handleEdit = user => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
  };

  const handleUpdate = async e => {
    e.preventDefault();
    try {
      const userRef = doc(db, "users", editingUser.id);
      await updateDoc(userRef, { name, email, phone });
      setUsers(users.map(u => (u.id === editingUser.id ? { ...u, name, email, phone } : u)));
      setEditingUser(null);
      setName(""); setEmail(""); setPhone("");
      alert("User updated successfully! ✅");
    } catch (err) {
      console.error(err);
      alert("Error updating user");
    }
  };

  const confirmDelete = id => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "users", deleteId));
      setUsers(users.filter(u => u.id !== deleteId));
      setShowDeleteModal(false);
      alert("User deleted successfully! 🗑️");
    } catch (err) {
      console.error(err);
      alert("Error deleting user");
    }
  };

  return (
    <div className="userlist-container container mt-5">
      <h2 className="title mb-3">Registered Users</h2>

      {/* Search Box */}
      <input
        type="text"
        className="form-control mb-3 custom-input"
        placeholder="Search by name..."
        onChange={e => setSearchTerm(e.target.value)}
      />

      {/* View toggle */}
      <div className="mb-3">
        <button className="btn btn-primary me-2 custom-btn" onClick={() => setView("table")}>Table View</button>
        <button className="btn btn-secondary custom-btn" onClick={() => setView("card")}>Card View</button>
      </div>

     
     {/* Edit Form in Registration Format */}
{editingUser && (
  <div className="edit-form-container card p-4 mb-4 shadow-sm">
    <h4 className="mb-3">Edit User</h4>
    <form onSubmit={handleUpdate}>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Phone</label>
        <input
          type="text"
          className="form-control"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
        />
      </div>
      <div className="d-flex">
        <button type="submit" className="btn btn-success me-2">Update</button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setEditingUser(null)}
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
)}



      {/* Table View */}
      {view === "table" && (
        <table className="table table-striped table-bordered table-hover custom-table">
          <thead>
            <tr>
              <th onClick={() => sortBy("name")} style={{ cursor: "pointer" }}>Name ⬍</th>
              <th onClick={() => sortBy("email")} style={{ cursor: "pointer" }}>Email ⬍</th>
              <th onClick={() => sortBy("phone")} style={{ cursor: "pointer" }}>Phone ⬍</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(u => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td>
                  <button className="btn btn-primary btn-sm me-2 custom-btn" onClick={() => handleEdit(u)}>Edit</button>
                  <button className="btn btn-danger btn-sm custom-btn" onClick={() => confirmDelete(u.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Card View */}
      {view === "card" && (
        <div className="row">
          {filteredUsers.map(u => (
            <div className="col-md-4 mb-3" key={u.id}>
              <div className="card shadow-sm h-100 custom-card">
                <div className="card-body">
                  <h5 className="card-title">{u.name}</h5>
                  <p className="card-text"><strong>Email:</strong> {u.email}</p>
                  <p className="card-text"><strong>Phone:</strong> {u.phone}</p>
                  <button className="btn btn-primary btn-sm me-2 custom-btn" onClick={() => handleEdit(u)}>Edit</button>
                  <button className="btn btn-danger btn-sm custom-btn" onClick={() => confirmDelete(u.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton className="modal-header-custom">
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="custom-btn" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" className="custom-btn" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserList;
