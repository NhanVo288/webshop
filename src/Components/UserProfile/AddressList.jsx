import React from "react";
import "./Address.css";
import { deleteAddress } from "../../Features/User/userSlice";
import { useDispatch } from "react-redux";

const AddressList = ({ addresses, onEdit }) => {
  const dispatch = useDispatch()
  return (
    <div className="address-list">
      {addresses.map((item) => (
        <div
          key={item.id}
          className={`address-card ${item.isDefault ? "default" : ""}`}
        >
          <div className="address-header">
            <h4>{item.fullName}</h4>
            {item.isDefault && <span className="badge">Mặc định</span>}
          </div>

          <p className="phone">📞 {item.phone}</p>

          <p className="address">
            {item.addressLine}, {item.ward}, {item.district}, {item.city}
          </p>

          <div className="actions">
            <button className="btn-edit" onClick={() => onEdit(item)}>Cập nhật</button>
            {!item.isDefault && (
              <button className="btn-delete" onClick={() => dispatch(deleteAddress(item.id))}>Xóa</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddressList;
