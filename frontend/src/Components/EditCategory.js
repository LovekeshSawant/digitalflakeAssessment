import React, { useState, useEffect } from "react";
import SideNavBar from "./SideNavBar";
import back from "../Assets/Category/back.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/editcategorylist.css"; 

export default function UpdateCategoryList() {
  const navigate = useNavigate();
  const location = useLocation();
  const { category } = location.state || {}; 

  // Initialize state with the received category data
  const [name, setName] = useState(category?.cname || "");
  const [sequenceNumber, setSequenceNumber] = useState(category?.sequence || '');
  const [status, setStatus] = useState(category?.status || "");
  const [image, setImage] = useState(null);

  // Function to reset the category and navigate to the category page
  const cancelCategory = () => {
    setName("");
    setSequenceNumber('');
    setImage(null);
    setStatus("");
    navigate("/category");
  };

  // Function to save the category by hitting API and storing data into DB and navigating to the category page
  const saveCategory = async () => 
  {

    if (name && sequenceNumber) {

      let result = await fetch("http://localhost:5000/add-category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify({
          name,
          status,
          sequenceNumber,
        }),
      });

      result = await result.json();

      if (result.message) {
        alert(result.message);
        navigate("/category");
      } else {
        navigate("/category");
      }
    } else {
      alert("Please fill all the fields");
    }
  };

  return (
    <div className="add-category-container">
      <SideNavBar />
      {/* Add Category List Component */}
      <div className="add-category-component">
        <div className="back-button">
          <Link to="/category">
            <img src={back} alt="back" />
          </Link>
        </div>
        <div className="add-category-title">Edit Category</div>
        <div>
          <form>
            <div className="input-container" style={{ top: "109px", left: "23px" }}>
              <div className="input-relative">
                <label className="input-label">Category Name</label>
                <div className="input-box">
                  <input
                    placeholder="enter name"
                    type="text"
                    className="input-field"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="input-container" style={{ top: "109px", left: "425px" }}>
              <div className="input-relative">
                <label className="input-label">Sequence Number</label>
                <div className="input-box">
                  <input
                    type="number"
                    className="input-field"
                    value={sequenceNumber}
                    onChange={(e) => setSequenceNumber(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="input-container" style={{ top: "109px", left: "850px" }}>
              <div className="input-relative">
                <label className="input-label">Status</label>
                <select
                  className="input-field"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="input-container" style={{ top: "250px", left: "80px" }}>
              <div className="input-relative">
                <label className="input-label">Upload Image</label>
                <div className="input-box">
                  <input
                    type="file"
                    className="input-field"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
              </div>
            </div>

            <div className="button-container" style={{ top: "850px", left: "750px" }}>
              <button
                type="button"
                className="button-cancel"
                onClick={cancelCategory}
              >
                Cancel
              </button>
            </div>

            <div className="button-container" style={{ top: "771px", left: "1000px" }}>
              <button
                type="button"
                className="button-save"
                onClick={saveCategory}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
