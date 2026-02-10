import { useEffect, useState } from "react";
import AddressList from "./AddressList";
import AddressModal from "./AddressModal";
import "./Address.css";
import { addAddress, fetchAddresses, updateAddress } from "../../Features/User/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function AddressPage() {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { addresses} = useSelector(state => state.user)

  // ---------- OPEN CREATE ----------
  const handleCreate = () => {
    setSelectedAddress(null);
    setOpen(true);
  };
  
  // ---------- OPEN UPDATE ----------
  const handleEdit = (addresses) => {
    setSelectedAddress(addresses);
    setOpen(true);
  };

  // ---------- SUBMIT (CREATE / UPDATE) ----------
  const handleSubmit = async (form) => {
  try {
    if (selectedAddress) {
      await dispatch(
        updateAddress({ addressId: selectedAddress.id, data: form })
      ).unwrap();
    } else {
      await dispatch(addAddress(form)).unwrap();
    }

    setOpen(false);
    setSelectedAddress(null);
  } catch (err) {
    console.error(err);
    alert("Có lỗi xảy ra!");
  }
};

useEffect(() => {
  dispatch(fetchAddresses())
},[dispatch])
  

  return (
    <div className={`addressPage ${addresses.length === 0 ? "empty" : ""}`}>
      <button className="addBtn" onClick={handleCreate}>
        + Thêm địa chỉ
      </button>

      <AddressList addresses={addresses} onEdit={handleEdit} />

      <AddressModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedAddress}
      />
    </div>
  );
}
