import React, { useState } from "react";
import "./UserProfile.css";

const UserProfile = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      label: "Nhà riêng",
      detail:
        "123 Nguyễn Trãi, Phường 7, Quận 5, TP.HCM",
    },
    {
      id: 2,
      label: "Công ty",
      detail:
        "456 Lê Lợi, Quận 1, TP.HCM",
    },
  ]);

  const [form, setForm] = useState({
    id: null,
    label: "",
    detail: "",
  });

  const isEditing = form.id !== null;

  // ------------------
  // Handle form change
  // ------------------
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ------------------
  // Add / Update
  // ------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.label || !form.detail) return;

    if (isEditing) {
      setAddresses((prev) =>
        prev.map((addr) =>
          addr.id === form.id ? form : addr
        )
      );
    } else {
      setAddresses((prev) => [
        ...prev,
        { ...form, id: Date.now() },
      ]);
    }

    // reset form
    setForm({ id: null, label: "", detail: "" });
  };

  // ------------------
  // Edit
  // ------------------
  const handleEdit = (addr) => {
    setForm(addr);
  };

  // ------------------
  // Delete
  // ------------------
  const handleDelete = (id) => {
    if (!window.confirm("Xóa địa chỉ này?")) return;

    setAddresses((prev) =>
      prev.filter((addr) => addr.id !== id)
    );
  };

  return (
    <div className="profileContainer">
      <h2>Địa chỉ của tôi</h2>

      {/* FORM */}
      <form className="addressForm" onSubmit={handleSubmit}>
        <input
          name="label"
          placeholder="Nhãn (Nhà riêng, Công ty...)"
          value={form.label}
          onChange={handleChange}
        />

        <textarea
          name="detail"
          placeholder="Địa chỉ chi tiết"
          value={form.detail}
          onChange={handleChange}
          rows={3}
        />

        <button type="submit">
          {isEditing ? "Cập nhật" : "Thêm địa chỉ"}
        </button>

        {isEditing && (
          <button
            type="button"
            className="cancelBtn"
            onClick={() =>
              setForm({ id: null, label: "", detail: "" })
            }
          >
            Hủy
          </button>
        )}
      </form>

      {/* ADDRESS LIST */}
      <div className="addressList">
        {addresses.map((addr) => (
          <div key={addr.id} className="addressItem">
            <strong>{addr.label}</strong>
            <p>{addr.detail}</p>

            <div className="addressActions">
              <button onClick={() => handleEdit(addr)}>
                ✏️ Sửa
              </button>
              <button
                className="deleteBtn"
                onClick={() => handleDelete(addr.id)}
              >
                🗑 Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
