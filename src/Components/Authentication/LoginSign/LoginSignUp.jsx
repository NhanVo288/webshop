import React, { useState } from "react";
import "./LoginSignUp.css";
import { Link } from "react-router-dom";
import { Login, SignUp } from "../../../Features/Auth/auth.thunk";
import { useDispatch } from "react-redux";

const LoginSignUp = () => {
  const [activeTab, setActiveTab] = useState("tabButton1");
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [signUpData, setSignUpData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (fieldName, newValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: newValue,
    }));
  };
  const handleSignUpChange = (field, value) => {
    setSignUpData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    dispatch(SignUp(signUpData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(Login(formData));
  };
  const handleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="loginSignUpSection">
        <div className="loginSignUpContainer">
          <div className="loginSignUpTabs">
            <p
              onClick={() => handleTab("tabButton1")}
              className={activeTab === "tabButton1" ? "active" : ""}
            >
              Login
            </p>
            <p
              onClick={() => handleTab("tabButton2")}
              className={activeTab === "tabButton2" ? "active" : ""}
            >
              Register
            </p>
          </div>
          <div className="loginSignUpTabsContent">
            {/* tab1 */}

            {activeTab === "tabButton1" && (
              <div className="loginSignUpTabsContentLogin">
                <form onSubmit={handleSubmit}>
                  <input
                    value={formData.email}
                    type="text"
                    placeholder="Email address *"
                    required
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                  <input
                    value={formData.password}
                    type="password"
                    placeholder="Password *"
                    required
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                  />
                  <div className="loginSignUpForgetPass">
                    <label>
                      <input type="checkbox" className="brandRadio" />
                      <p>Remember me</p>
                    </label>
                    <p>
                      <Link to="/resetPassword">Lost password?</Link>
                    </p>
                  </div>
                  <button type="submit">Log In</button>
                </form>
                <div className="loginSignUpTabsContentLoginText">
                  <p>
                    No account yet?{" "}
                    <span onClick={() => handleTab("tabButton2")}>
                      Create Account
                    </span>
                  </p>
                </div>
              </div>
            )}

            {/* Tab2 */}

            {activeTab === "tabButton2" && (
              <div className="loginSignUpTabsContentRegister">
                <form onSubmit={handleSignUpSubmit}>
                  <input
                    type="text"
                    placeholder="Username *"
                    required
                    value={signUpData.fullName}
                    onChange={(e) =>
                      handleSignUpChange("fullName", e.target.value)
                    }
                  />

                  <input
                    type="email"
                    placeholder="Email address *"
                    required
                    value={signUpData.email}
                    onChange={(e) =>
                      handleSignUpChange("email", e.target.value)
                    }
                  />

                  <input
                    type="password"
                    placeholder="Password *"
                    required
                    value={signUpData.password}
                    onChange={(e) =>
                      handleSignUpChange("password", e.target.value)
                    }
                  />

                  <p>
                    Your personal data will be used to support your experience
                    throughout this website, to manage access to your account,
                    and for other purposes described in our
                    <Link
                      to="/terms"
                      style={{ textDecoration: "none", color: "#c32929" }}
                    >
                      {" "}
                      privacy policy
                    </Link>
                    .
                  </p>

                  <button type="submit">Register</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSignUp;
