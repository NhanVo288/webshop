import React, { useEffect, useState } from "react";


const AddressModal = ({ open, onClose, onSubmit, initialData }) => {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
  });

  
  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({
        fullName: "",
        phone: "",
      });
    }
  }, [initialData, open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = () => {
    onSubmit(form);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{initialData ? "Cập nhật địa chỉ" : "Thêm địa chỉ mới"}</h3>

        <input
          name="fullName"
          placeholder="Họ tên"
          value={form.fullName}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Số điện thoại"
          value={form.phone}
          onChange={handleChange}
        />


        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>
            Hủy
          </button>
          <button className="btn-submit" onClick={handleSubmit}>
            {initialData ? "Cập nhật" : "Tạo mới"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
