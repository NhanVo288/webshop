import React, { useState } from "react";
import "./AdditionalInfo.css";

import user1 from "../../../Assets/Users/user1.jpeg";
import user2 from "../../../Assets/Users/user2.jpeg";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import Rating from "@mui/material/Rating";

const AdditionalInfo = () => {
  const [activeTab, setActiveTab] = useState("aiTab1");
  const { detail } = useSelector((state) => state.product);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="productAdditionalInfo">
        <div className="productAdditonalInfoContainer">
          <div className="productAdditionalInfoTabs">
            <div className="aiTabs">
              <p
                onClick={() => handleTabClick("aiTab1")}
                className={activeTab === "aiTab1" ? "aiActive" : ""}
              >
                Description
              </p>
              <p
                onClick={() => handleTabClick("aiTab2")}
                className={activeTab === "aiTab2" ? "aiActive" : ""}
              >
                Additional Information
              </p>
              <p
                onClick={() => handleTabClick("aiTab3")}
                className={activeTab === "aiTab3" ? "aiActive" : ""}
              >
                Reviews (2)
              </p>
            </div>
          </div>
          <div className="productAdditionalInfoContent">
            {/* Tab1 */}

            {activeTab === "aiTab1" && (
              <div className="aiTabDescription">
                <div className="descriptionPara">
                  {/* <h3>Sed do eiusmod tempor incididunt ut labore</h3> */}
                  <p>{detail?.description}</p>
                </div>
                <div className="descriptionParaGrid">
                  <div className="descriptionPara">
                    <h3>Why choose this product?</h3>
                    <ul>
                      <li>
                        Powerful performance with latest generation processor
                      </li>
                      <li>
                        High-resolution display for an immersive viewing
                        experience
                      </li>
                      <li>Long-lasting battery life for all-day usage</li>
                      <li>
                        Advanced camera system for high-quality photos and
                        videos
                      </li>
                      <li>Premium design with durable materials</li>
                    </ul>
                  </div>

                  <div className="descriptionPara">
                    <h3>Key Features</h3>
                    <ol>
                      <li>Large display with vibrant colors</li>
                      <li>Fast and smooth multitasking</li>
                      <li>High storage capacity for apps and media</li>
                      <li>
                        Enhanced security features (Face ID / Fingerprint)
                      </li>
                      <li>Supports latest connectivity (5G, Wi-Fi 6)</li>
                    </ol>
                  </div>
                </div>
                <div className="descriptionPara">
                  <h3>Build & Material</h3>
                  <p style={{ marginTop: "-10px" }}>
                    Premium aluminum frame with reinforced glass. Designed for
                    durability and a comfortable hand feel.
                  </p>
                </div>
              </div>
            )}

            {/* Tab2 */}

            {activeTab === "aiTab2" && (
              <div className="aiTabAdditionalInfo">
                {detail?.specs?.map((spec) => (
                  <div className="additionalInfoContainer" key={spec.id}>
                    <h6>{spec.specKey}</h6>
                    <p>{spec.specValue}</p>
                  </div>
                ))}
                {/* <div className="additionalInfoContainer">
                  <h6>Weight</h6>
                  <p> {detail}</p>
                </div>
                <div className="additionalInfoContainer">
                  <h6>Dimensions</h6>
                  <p> 90 x 60 x 90 cm</p>
                </div>
                <div className="additionalInfoContainer">
                  <h6>Size</h6>
                  <p> XS, S, M, L, XL</p>
                </div>
                <div className="additionalInfoContainer">
                  <h6>Color</h6>
                  <p> Black, Orange, White</p>
                </div>
                <div className="additionalInfoContainer">
                  <h6>Storage</h6>
                  <p> Relaxed fit shirt-style dress with a rugged</p>
                </div> */}
              </div>
            )}

            {/* Tab3 */}

            {activeTab === "aiTab3" && (
              <div className="aiTabReview">
                <div className="aiTabReviewContainer">
                  <h3>Reviews</h3>
                  <div className="userReviews">
                    <div
                      className="userReview"
                      style={{ borderBottom: "1px solid #e4e4e4" }}
                    >
                      {/* <div className="userReviewImg">
                        <img src={user1} alt="" />
                      </div> */}
                      {/* <div className="userReviewContent">
                        <div className="userReviewTopContent">
                          <div className="userNameRating">
                            <h6>Janice Miller</h6>
                            <div className="userRating">
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                            </div>
                          </div>
                          <div className="userDate">
                            <p>April 06, 2023</p>
                          </div>
                        </div>
                        <div
                          className="userReviewBottomContent"
                          style={{ marginBottom: "30px" }}
                        >
                          <p>
                            Nam libero tempore, cum soluta nobis est eligendi
                            optio cumque nihil impedit quo minus id quod maxime
                            placeat facere possimus, omnis voluptas assumenda
                            est…
                          </p>
                        </div>
                      </div> */}
                    </div>
                    {/* <div className="userReview">
                      <div className="userReviewImg">
                        <img src={user2} alt="" />
                      </div>
                      <div className="userReviewContent">
                        <div className="userReviewTopContent">
                          <div className="userNameRating">
                            <h6>Benjam Porter</h6>
                            <div className="userRating">
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                              <FaStar color="#FEC78A" size={10} />
                            </div>
                          </div>
                          <div className="userDate">
                            <p>April 12, 2023</p>
                          </div>
                        </div>
                        <div className="userReviewBottomContent">
                          <p>
                            Nam libero tempore, cum soluta nobis est eligendi
                            optio cumque nihil impedit quo minus id quod maxime
                            placeat facere possimus, omnis voluptas assumenda
                            est…
                          </p>
                        </div>
                      </div>
                    </div> */}
                  </div>
                  <div className="userNewReview">
                    <div className="userNewReviewMessage">
                      <h5>Be the first to review</h5>
                      <p>
                        Your email address will not be published. Required
                        fields are marked *
                      </p>
                    </div>
                    <div className="userNewReviewRating">
                      <label>Your rating *</label>
                      <Rating name="simple-controlled" size="small" />
                    </div>
                    <div className="userNewReviewForm">
                      <form>
                        <textarea
                          cols={30}
                          rows={8}
                          placeholder="Your Review"
                        />
                        <input
                          type="text"
                          placeholder="Name *"
                          required
                          className="userNewReviewFormInput"
                        />
                        <input
                          type="email"
                          placeholder="Email address *"
                          required
                          className="userNewReviewFormInput"
                        />
                        <div className="userNewReviewFormCheck">
                          <label>
                            <input type="checkbox" placeholder="Subject" />
                            Save my name, email, and website in this browser for
                            the next time I comment.
                          </label>
                        </div>

                        <button type="submit">Submit</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdditionalInfo;
