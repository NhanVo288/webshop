import { useEffect, useState } from "react";
import AddressList from "./AddressList";
import AddressModal from "./AddressModal";
import ProfileModal from "./ProfileModal";
import "./Address.css";

import {
  addAddress,
  fetchAddresses,
  updateAddress,
  updateProfile,
} from "../../Features/User/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function AddressPage() {
  const dispatch = useDispatch();
  const [activeMenu, setActiveMenu] = useState("profile");
  // State cho Address
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  // State cho Profile
  const [openProfileModal, setOpenProfileModal] = useState(false);

  const { addresses, user } = useSelector((state) => state.user);

  const handleCreateAddress = () => {
    setSelectedAddress(null);
    setOpenAddressModal(true);
  };

  const handleEditAddress = (address) => {
    setSelectedAddress(address);
    setOpenAddressModal(true);
  };

  const handleAddressSubmit = async (form) => {
    try {
      if (selectedAddress) {
        await dispatch(
          updateAddress({ addressId: selectedAddress.id, data: form }),
        ).unwrap();
      } else {
        await dispatch(addAddress(form)).unwrap();
      }
      setOpenAddressModal(false);
      setSelectedAddress(null);
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra khi lưu địa chỉ!");
    }
  };

  const handleProfileSubmit = async (form) => {
    try {
      await dispatch(updateProfile(form)).unwrap();
      setOpenProfileModal(false);
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra khi cập nhật thông tin cá nhân!");
    }
  };

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  return (
    <>
      <div className="accountLayout">
        {/* Sidebar */}
        <div className="accountSidebar">
          <button
            className={activeMenu === "profile" ? "menu active" : "menu"}
            onClick={() => setActiveMenu("profile")}
          >
            Thông tin cá nhân
          </button>

          <button
            className={activeMenu === "address" ? "menu active" : "menu"}
            onClick={() => setActiveMenu("address")}
          >
            Sổ địa chỉ
          </button>
        </div>

        {/* Content */}
        <div className="accountContent">
          {activeMenu === "profile" && (
            <div className="profileSection">
              <h3>Thông tin cá nhân</h3>

              <div className="profileInfo">
                <p>
                  <strong>Họ và tên:</strong>{" "}
                  {user?.fullName || "Chưa cập nhật"}
                </p>
                <p>
                  <strong>Số điện thoại:</strong>{" "}
                  {user?.phone || "Chưa cập nhật"}
                </p>
              </div>

              <button
                className="editProfileBtn"
                onClick={() => setOpenProfileModal(true)}
              >
                Chỉnh sửa thông tin
              </button>
            </div>
          )}

          {activeMenu === "address" && (
            <div className="addressSection">
              <div className="addressHeader">
                <h3>Sổ địa chỉ</h3>

                <button className="addBtn" onClick={handleCreateAddress}>
                  + Thêm địa chỉ
                </button>
              </div>

              <AddressList addresses={addresses} onEdit={handleEditAddress} />
            </div>
          )}
        </div>
      </div>
      <AddressModal
        open={openAddressModal}
        onClose={() => setOpenAddressModal(false)}
        onSubmit={handleAddressSubmit}
        initialData={selectedAddress}
      />

      <ProfileModal
        open={openProfileModal}
        onClose={() => setOpenProfileModal(false)}
        onSubmit={handleProfileSubmit}
        initialData={user}
      />
    </>
  );
}
