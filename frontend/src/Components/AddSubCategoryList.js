import React, { useState, useEffect } from "react";
import SideNavBar from "./SideNavBar";
import back from "../Assets/Category/back.png";
import { Link, useNavigate } from "react-router-dom";
import "../styles/addsubcategorylist.css"; // Import the CSS file

export default function AddSubCategoryList() {
  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState('');
  const [sequenceNumber, setSequenceNumber] = useState('');
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState(true);
  const [categories, setCategories] = useState([]); // State to hold categories
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  // Function to fetch categories from backend API
  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Function to Reset the category and navigate to category page
  const cancelCategory = () => {
    setCategoryName("");
    setSubCategoryName("");
    setSequenceNumber('');
    setImage(null);
    setStatus(true);
    navigate("/subCategory");
  };

  // Function to save subcategory by hitting API and storing data into DB and navigating to category page
  const saveSubCategory = async () => {
    if (categoryName && subCategoryName && sequenceNumber) {
      console.log('Sending data from subcategory : ', {
        categoryName,
        subCategoryName,
        sequenceNumber,
        image,
      });

      let result = await fetch("http://localhost:5000/add-Subcategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify({
          categoryName,
          subCategoryName,
          sequenceNumber,
        }),
      });

      result = await result.json();

      if (result.message) {
        alert(result.message);
        navigate("/subCategory");
      } else {
        navigate("/subCategory");
      }
    } else {
      alert("Please fill all the fields");
    }
  };

  return (
    <div className="add-category-container">
      <SideNavBar />
      {/* Add SubCategory Component */}
      <div className="add-category-component">
        <div className="back-button">
          <Link to="/category">
            <img src={back} alt="back" />
          </Link>
        </div>
        <div className="add-category-title">Add SubCategory</div>
        <div>
          <form>
            <div className="input-container" style={{ top: "109px", left: "23px" }}>
              <div className="input-relative">
                <label className="input-label">Category Name</label>
                <div className="input-box">
                  <select
                    className="input-field"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat.cid} value={cat.cname}>
                        {cat.cname}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="input-container" style={{ top: "109px", left: "425px" }}>
              <div className="input-relative">
                <label className="input-label">SubCategory Name</label>
                <div className="input-box">
                  <input
                    type="text"
                    className="input-field"
                    value={subCategoryName}
                    onChange={(e) => setSubCategoryName(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="input-container" style={{ top: "109px", left: "830px" }}>
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
                onClick={saveSubCategory}
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
