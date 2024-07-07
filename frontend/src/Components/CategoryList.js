import React, { useEffect, useState } from "react";
import SideNavBar from "./SideNavBar";
import logo from "../Assets/Category/categorylogo.png";
import { Link } from "react-router-dom";
import edit from "../Assets/Category/edit.png";
import deleteIcon from "../Assets/Category/delete.png";
import Swal from "sweetalert2";
import "../styles/ctlist.css"; // Import the external CSS file

export default function CategoryList() {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  // Function to delete the selected category by hitting API and deleting data from DB
  const deleteCategory = async (id) => {
    let result = await fetch(`http://localhost:5000/delete-category/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    getCategoryList();
  };

  // Function to get category list to be populated in table
  const getCategoryList = async () => {
    let result = await fetch("http://localhost:5000/category-list", {
      method: "get",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });

    result = await result.json();
    console.log(result);

    setCategoryList(result);
  };

  return (
    <div className="container">
      <SideNavBar />
      {/* Category List Component */}
      <div>
        <div className="main">
          <div>
            <div className="logo">
              <img src={logo} />
            </div>
            <div className="heading">Category</div>
            <button className="add-button">
              <Link to="/addCategory" style={{ color: "white", textDecoration: "none" }}>
                Add New
              </Link>
            </button>
          </div>
          {/* Table */}
          <div className="table-container">
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                    <thead className="table-header">
                      <tr>
                        <th scope="col" className="table-header">ID</th>
                        <th scope="col" className="table-header">Name</th>
                        <th scope="col" className="table-header">Image</th>
                        <th scope="col" className="table-header">Status</th>
                        <th scope="col" className="table-header">Sequence</th>
                        <th scope="col" className="table-header">Action</th>
                        <th scope="col" className="p-6">
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                      {categoryList.map((category) => (
                        <tr key={category.cid} className="table-row">
                          <td className="table-cell">{category.cid}</td>
                          <td className="table-cell">{category.cname}</td>
                          <td className="table-cell">{category.image}</td>
                          <td className="table-cell">{category.status}</td>
                          <td className="table-cell">{category.sequence}</td>
                          <td className="table-action-cell">
                          <Link
                              to={{
                                pathname: "/editCategory",
                                state: { category },
                              }}
                              style={{ display: "inline-flex" }}
                            >
                              <img src={edit} alt="Edit" />
                            </Link>
                            <button
                              type="button"
                              onClick={() => {
                                Swal.fire({
                                  title: "Delete",
                                  text: "Are you sure you want to delete ?",
                                  icon: "warning",
                                  showCancelButton: true,
                                  cancelButtonColor: "#676767",
                                  confirmButtonColor: "#662671",
                                  confirmButtonText: "Confirm",
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    deleteCategory(category.cid);
                                  }
                                });
                              }}
                              style={{ display: "inline-flex" }}
                            >
                              <img src={deleteIcon} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}