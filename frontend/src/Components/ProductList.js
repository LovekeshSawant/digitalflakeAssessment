import React, { useEffect, useState } from "react";
import SideNavBar from "./SideNavBar";
import logo from "../Assets/Products/productlogo.png";
import search from "../Assets/Category/search.png";
import { Link } from "react-router-dom";
import edit from "../Assets/Category/edit.png";
import deleteIcon from "../Assets/Category/delete.png";
import Swal from "sweetalert2";

export default function ProductList() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getProductList();
  }, []);

  // Function to delete the selected product by hitting API and deleting data from DB
  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/delete-product/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    getProductList();
  };

  // Function to get product list to be populated in table
  const getProductList = async () => {
    let result = await fetch("http://localhost:5000/product-list", {
      method: "get",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();

    setProductList(result);
  };

  return (
    <div
      style={{
        width: "1728px",
        height: "1117px",
        top: "-1699px",
        left: "-303px",
      }}
    >
      <SideNavBar />
      {/* Product List Component */}
      <div>
        <div
          style={{
            position: "absolute",
            width: "1230px",
            height: "962px",
            top: "132px",
            left: "464px",
            borderRadius: "10px",
            border: "1px solid #B0ADAD",
            color: "white",
            boxShadow: "0px 4px 10px 0px #00000040",
          }}
        >
          <div>
            <div
              style={{
                position: "absolute",
                width: "30px",
                height: "30px",
                top: "23px",
                left: "26px",
              }}
            >
              <img src={logo} />
            </div>
            <div
              style={{
                position: "absolute",
                width: "119px",
                height: "36px",
                top: "20px",
                left: "81px",
                fontFamily: "Inter",
                fontStyle: "normal",
                fontWeight: "600",
                fontSize: "24px",
                lineHeight: "36px",
                color: "#000000",
                letterSpacing: "0.5px",
              }}
            >
              Product
            </div>
            
            <button
              type="button"
              style={{
                position: "absolute",
                width: "110px",
                height: "40px",
                top: "21px",
                left: "1100px",
                borderRadius: "10px",
                backgroundColor: "#662671",
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "14px",
                lineHeight: "21px",
                color: "#FFFFFF",
              }}
            >
              <Link
                to="/addProduct"
                style={{ color: "white", textDecoration: "none" }}
              >
                Add New
              </Link>
            </button>
          </div>
          {/* Product Table */}
          <div
            style={{
              position: "absolute",
              width: "1230px",
              height: "800px",
              top: "80px",
            }}
          >
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden ">
                  <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                    <thead style={{ backgroundColor: "#FFF8B7" }}>
                      <tr>
                        <th
                          scope="col"
                          style={{
                            fontFamily: "Poppins",
                            fontStyle: "normal",
                            fontWeight: "500",
                            fontSize: "20px",
                            lineHeight: "30px",
                            color: "#000000",
                            alignContent: "center",
                          }}
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          style={{
                            fontFamily: "Poppins",
                            fontStyle: "normal",
                            fontWeight: "500",
                            fontSize: "20px",
                            lineHeight: "30px",
                            color: "#000000",
                            alignContent: "center",
                          }}
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          style={{
                            fontFamily: "Poppins",
                            fontStyle: "normal",
                            fontWeight: "500",
                            fontSize: "20px",
                            lineHeight: "30px",
                            color: "#000000",
                            alignContent: "center",
                          }}
                        >
                          Pack Size
                        </th>
                        <th
                          scope="col"
                          style={{
                            fontFamily: "Poppins",
                            fontStyle: "normal",
                            fontWeight: "500",
                            fontSize: "20px",
                            lineHeight: "30px",
                            color: "#000000",
                            alignContent: "center",
                          }}
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          style={{
                            fontFamily: "Poppins",
                            fontStyle: "normal",
                            fontWeight: "500",
                            fontSize: "20px",
                            lineHeight: "30px",
                            color: "#000000",
                            alignContent: "center",
                          }}
                        >
                          MRP
                        </th>
                        <th
                          scope="col"
                          style={{
                            fontFamily: "Poppins",
                            fontStyle: "normal",
                            fontWeight: "500",
                            fontSize: "20px",
                            lineHeight: "30px",
                            color: "#000000",
                            alignContent: "center",
                          }}
                        >
                          Image
                        </th>
                        <th
                          scope="col"
                          style={{
                            fontFamily: "Poppins",
                            fontStyle: "normal",
                            fontWeight: "500",
                            fontSize: "20px",
                            lineHeight: "30px",
                            color: "#000000",
                            alignContent: "center",
                          }}
                        >
                          Status
                        </th>
                        <th scope="col" className="p-4">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                      {productList.map((product) => (
                        <tr
                          key={product._id}
                          style={{ backgroundColor: "#F2F2F2" }}
                        >
                          <td
                            style={{
                              fontFamily: "Poppins",
                              fontStyle: "normal",
                              fontWeight: "400",
                              fontSize: "16px",
                              lineHeight: "24px",
                              color: "#000000",
                            }}
                          >
                            {product._id}
                          </td>
                          <td
                            style={{
                              fontFamily: "Poppins",
                              fontStyle: "normal",
                              fontWeight: "400",
                              fontSize: "16px",
                              lineHeight: "24px",
                              color: "#000000",
                            }}
                          >
                            {product.name}
                          </td>
                          <td
                            style={{
                              fontFamily: "Poppins",
                              fontStyle: "normal",
                              fontWeight: "400",
                              fontSize: "16px",
                              lineHeight: "24px",
                              color: "#000000",
                            }}
                          >
                            {product.packSize}
                          </td>
                          <td
                            style={{
                              fontFamily: "Poppins",
                              fontStyle: "normal",
                              fontWeight: "400",
                              fontSize: "16px",
                              lineHeight: "24px",
                              color: "#000000",
                            }}
                          >
                            {product.category}
                          </td>
                          <td
                            style={{
                              fontFamily: "Poppins",
                              fontStyle: "normal",
                              fontWeight: "400",
                              fontSize: "16px",
                              lineHeight: "24px",
                              color: "#000000",
                            }}
                          >
                            {product.mrp}
                          </td>
                          <td
                            style={{
                              fontFamily: "Poppins",
                              fontStyle: "normal",
                              fontWeight: "400",
                              fontSize: "16px",
                              lineHeight: "24px",
                              color: "#000000",
                            }}
                          >
                            {product.image}
                          </td>
                          {product.status ? (
                            <td
                              style={{
                                fontFamily: "Poppins",
                                fontStyle: "normal",
                                fontWeight: "400",
                                fontSize: "16px",
                                lineHeight: "24px",
                                color: "#2DA323",
                              }}
                            >
                              Active
                            </td>
                          ) : (
                            <td
                              style={{
                                fontFamily: "Poppins",
                                fontStyle: "normal",
                                fontWeight: "400",
                                fontSize: "16px",
                                lineHeight: "24px",
                                color: "#B13129",
                              }}
                            >
                              Inactive
                            </td>
                          )}
                          <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                            {/* Link to navigate to Edit Product Page */}
                            <Link
                              to="/editProduct"
                              style={{ display: "inline-flex" }}
                            >
                              <img src={edit} />
                            </Link>
                            {/* Button for Delete Callout */}
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
                                    deleteProduct(product._id);
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
