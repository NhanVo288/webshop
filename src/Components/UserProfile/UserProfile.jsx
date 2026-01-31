import { useState } from "react";
import AddressList from "./AddressList";
import AddressModal from "./AddressModal";
import "./Address.css";
import { addAddress, updateAddress } from "../../Features/User/userSlice";
import { useDispatch } from "react-redux";

export default function AddressPage() {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      fullName: "Nguyễn Văn An",
      phone: "0901234567",
      addressLine: "123 Nguyễn Trãi",
      ward: "Phường 7",
      district: "Quận 5",
      city: "TP. Hồ Chí Minh",
      isDefault: true,
    },
    {
      id: 2,
      fullName: "Trần Thị Bình",
      phone: "0912345678",
      addressLine: "45 Lê Lợi",
      ward: "Bến Nghé",
      district: "Quận 1",
      city: "TP. Hồ Chí Minh",
      isDefault: false,
    },
    {
      id: 3,
      fullName: "Phạm Minh Đức",
      phone: "0987654321",
      addressLine: "89 Trần Hưng Đạo",
      ward: "Cẩm Phô",
      district: "Hội An",
      city: "Quảng Nam",
      isDefault: false,
    },
  ]);

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
      console.log(id)
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
