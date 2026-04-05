import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";
import { logout } from "../../Features/Auth/auth.thunk";

const UserMenu = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) {
    return (
      <FaRegUser
        size={22}
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/loginSignUp")}
      />
    );
  }

  return (
    <div ref={ref} className="userMenuWrapper">
      <FaRegUser
        size={22}
        className="userIcon"
        onClick={() => setOpen((prev) => !prev)}
      />

      {open && (
        <div className="userDropdown">
          <div className="userInfo">
            <p className="userName">{user?.name || "Người dùng"}</p>
            <p className="userEmail">{user?.email}</p>
          </div>

          <div className="divider" />
          <button
            className="menuItem"
            onClick={() => {
              navigate("/order");
              setOpen(false);
            }}
          >
            My orders
          </button>
          <button
            className="menuItem"
            onClick={() => {
              navigate("/profile");
              setOpen(false);
            }}
          >
            Thông tin cá nhân
          </button>

          <button
            className="menuItem logout"
            onClick={() => {
              dispatch(logout());
              setOpen(false);
            }}
          >
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
