import React, { useState } from "react";
import SideNavBar from "./SideNavBar";
import back from "../Assets/Category/back.png";
import { Link, useNavigate } from "react-router-dom";
// import "../styles/adcategorylist.css"; // Import the CSS file

export default function AddCategoryList() {
  const [name, setName] = useState("");
  const [sequenceNumber, setSequenceNumber] = useState('');
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState(true);
  const navigate = useNavigate();

  // Function to Reset the category and navigate to category page
  const cancelCategory = () => {

    // console.log("you are on wrong track");

    setName("");
    setSequenceNumber('');
    setImage(null);
    setStatus(true);
    navigate("/category");
  };

  // Function to save category by hitting API and storing data into DB and navigating to category page
  const saveCategory = async () => {
    if (name && sequenceNumber) {
      console.log('Sending data:', {
        name,
        status,
        sequenceNumber,
        image,
      });

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
        <div className="add-category-title">Add Category</div>
        <div>
          <form>
            <div className="input-container" style={{ top: "109px", left: "23px" }}>
              <div className="input-relative">
                <label className="input-label">Category Name</label>
                <div className="input-box">
                  <input
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

            <div
              className="button-container"
              style={{ top: "850px", left: "750px" }}
            >
              <button
                type="button"
                className="button-cancel"
                onClick={cancelCategory}
              >
                Cancel
              </button>
            </div>

            <div
              className="button-container"
              style={{ top: "771px", left: "1000px" }}
            >
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
