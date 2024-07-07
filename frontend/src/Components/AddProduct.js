import React, { useEffect, useState } from "react";
import SideNavBar from "./SideNavBar";
import { Link, useNavigate } from "react-router-dom";
import back from "../Assets/Category/back.png";
import upload from "../Assets/Products/upload.png";

export default function AddProduct() {
  const [category, setCategory] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [name, setName] = useState("");
  const [packSize, setPackSize] = useState("");
  const [mrp, setMrp] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState(true);
  const navigate = useNavigate();
  const trial = ["electronics", "mobile", "Sports"];

  // Function to Reset the Product and navigate to Product page
  const cancelProduct = () => {
    setCategory("");
    setName("");
    setPackSize("");
    setMrp("");
    setImage(null);
    setStatus(true);
    navigate("/products");
  };

  // Function to save product by hitting API and storng data into DB and navigating to Product page
  const saveProduct = async () => {
    if (name && packSize && mrp && image && category) {
      let result = await fetch("http://localhost:5000/add-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify({
          category,
          name,
          packSize,
          mrp,
          image,
          status,
        }),
      });
      result = await result.json();
      setCategory("");
      setName("");
      setPackSize("");
      setMrp("");
      setImage(null);
      setStatus(true);
      if (result.message) {
        alert(result.message);
        navigate("/addProduct");
      } else {
        navigate("/products");
      }
    } else {
      alert("Please fill all the fields");
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  // Function to get category list to be included in Select tag Options
  const getCategory = async () => {
    let result = await fetch("http://localhost:5000/category-list", {
      method: "get",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });

    result = await result.json();
    
    setCategoryList(
      result.map((category) => {
        return category.name;
      })
    );
  };

  return (
    <div>
      <div
        style={{
          width: "1728px",
          height: "1117px",
          top: "-1699px",
          left: "-303px",
        }}
      >
        <SideNavBar />
        {/* Add Product Component */}
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
            <div
              style={{
                position: "absolute",
                width: "16px",
                height: "16px",
                top: "33px",
                left: "15px",
              }}
            >
              <Link to="/product">
                <img src={back} />
              </Link>
            </div>
            <div
              style={{
                position: "absolute",
                width: "167px",
                height: "36px",
                top: "24px",
                left: "54px",
                fontFamily: "Inter",
                fontStyle: "normal",
                fontWeight: "600",
                fontSize: "24px",
                lineHeight: "36px",
                color: "#000000",
                letterSpacing: "0.5px",
                alignItems: "center",
              }}
            >
              Add Product
            </div>
            <div>
              <form>
                <div
                  style={{
                    position: "absolute",
                    width: "380px",
                    height: "64px",
                    top: "109px",
                    left: "23px",
                  }}
                >
                  <div className="absolute top-[-8px] left-[0px] w-[380px] h-[64px]">
                    <div className="absolute top-[8px] left-[0px] rounded-8xs bg-white box-border w-[380px] h-[64px] overflow-hidden border-[1px] border-solid border-darkgray">
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={{
                          width: "380px",
                          height: "64px",
                          border: "1px solid #686868",
                          fontFamily: "Inter",
                          fontStyle: "normal",
                          fontWeight: "500",
                          fontSize: "16px",
                          lineHeight: "16px",
                          color: "#000000",
                          letterSpacing: "0.5px",
                        }}
                      >
                        <option value={null}>Select an option</option>
                        {categoryList.map((category) => {
                          return <option value={category}>{category}</option>;
                        })}
                      </select>
                    </div>
                    <div
                      className="absolute top-[0px] left-[12px] bg-white flex flex-row items-center justify-center py-0 px-1 text-8xl text-dimgray-200 font-inter"
                      style={{
                        width: "127px",
                        height: "16px",
                        fontFamily: "Inter",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "16px",
                        lineHeight: "16px",
                        color: "#1F1F1F",
                        letterSpacing: "0.5px",
                      }}
                    >
                      <div
                        className="relative tracking-[0.15px] leading-[16px]"
                        style={{
                          fontFamily: "Inter",
                          fontStyle: "normal",
                          fontWeight: "500",
                          fontSize: "16px",
                          lineHeight: "16px",
                          color: "#000000",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Category
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    position: "absolute",
                    width: "380px",
                    height: "64px",
                    top: "109px",
                    left: "425px",
                  }}
                >
                  <div className="absolute top-[-8px] left-[0px] w-[380px] h-[64px]">
                    <div className="absolute top-[8px] left-[0px] rounded-8xs bg-white box-border w-[380px] h-[64px] overflow-hidden border-[1px] border-solid border-darkgray">
                      <input
                        type="text"
                        className="absolute top-[0px] left-[0px] w-[380px] h-[64px] text-4xl text-dimgray-200 font-p-posts"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: "400",
                          fontSize: "20px",
                          lineHeight: "48px",
                          color: "#717070",
                        }}
                      />
                    </div>
                    <div
                      className="absolute top-[0px] left-[12px] bg-white flex flex-row items-center justify-center py-0 px-1 text-8xl text-dimgray-200 font-inter"
                      style={{
                        width: "127px",
                        height: "16px",
                        fontFamily: "Inter",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "16px",
                        lineHeight: "16px",
                        color: "#1F1F1F",
                        letterSpacing: "0.5px",
                      }}
                    >
                      <div
                        className="relative tracking-[0.15px] leading-[16px]"
                        style={{
                          fontFamily: "Inter",
                          fontStyle: "normal",
                          fontWeight: "500",
                          fontSize: "16px",
                          lineHeight: "16px",
                          color: "#000000",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Product Name
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    position: "absolute",
                    width: "380px",
                    height: "64px",
                    top: "109px",
                    left: "828px",
                  }}
                >
                  <div className="absolute top-[-8px] left-[0px] w-[380px] h-[64px]">
                    <div className="absolute top-[8px] left-[0px] rounded-8xs bg-white box-border w-[380px] h-[64px] overflow-hidden border-[1px] border-solid border-darkgray">
                      <input
                        type="text"
                        className="absolute top-[0px] left-[0px] w-[380px] h-[64px] text-4xl text-dimgray-200 font-p-posts"
                        value={packSize}
                        onChange={(e) => setPackSize(e.target.value)}
                        style={{
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: "400",
                          fontSize: "20px",
                          lineHeight: "48px",
                          color: "#717070",
                        }}
                      />
                    </div>
                    <div
                      className="absolute top-[0px] left-[12px] bg-white flex flex-row items-center justify-center py-0 px-1 text-8xl text-dimgray-200 font-inter"
                      style={{
                        width: "127px",
                        height: "16px",
                        fontFamily: "Inter",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "16px",
                        lineHeight: "16px",
                        color: "#1F1F1F",
                        letterSpacing: "0.5px",
                      }}
                    >
                      <div
                        className="relative tracking-[0.15px] leading-[16px]"
                        style={{
                          fontFamily: "Inter",
                          fontStyle: "normal",
                          fontWeight: "500",
                          fontSize: "16px",
                          lineHeight: "16px",
                          color: "#000000",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Pack Size
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    position: "absolute",
                    width: "380px",
                    height: "64px",
                    top: "208px",
                    left: "23px",
                  }}
                >
                  <div className="absolute top-[-8px] left-[0px] w-[380px] h-[64px]">
                    <div className="absolute top-[8px] left-[0px] rounded-8xs bg-white box-border w-[380px] h-[64px] overflow-hidden border-[1px] border-solid border-darkgray">
                      <input
                        type="text"
                        className="absolute top-[0px] left-[0px] w-[380px] h-[64px] text-4xl text-dimgray-200 font-p-posts"
                        value={mrp}
                        onChange={(e) => setMrp(e.target.value)}
                        style={{
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: "400",
                          fontSize: "20px",
                          lineHeight: "48px",
                          color: "#717070",
                        }}
                      />
                    </div>
                    <div
                      className="absolute top-[0px] left-[12px] bg-white flex flex-row items-center justify-center py-0 px-1 text-8xl text-dimgray-200 font-inter"
                      style={{
                        width: "127px",
                        height: "16px",
                        fontFamily: "Inter",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "16px",
                        lineHeight: "16px",
                        color: "#1F1F1F",
                        letterSpacing: "0.5px",
                      }}
                    >
                      <div
                        className="relative tracking-[0.15px] leading-[16px]"
                        style={{
                          fontFamily: "Inter",
                          fontStyle: "normal",
                          fontWeight: "500",
                          fontSize: "16px",
                          lineHeight: "16px",
                          color: "#000000",
                          letterSpacing: "0.5px",
                        }}
                      >
                        MRP
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    position: "absolute",
                    width: "380px",
                    height: "64px",
                    top: "208px",
                    left: "425px",
                  }}
                >
                  <div className="absolute top-[-8px] left-[0px] w-[380px] h-[64px]">
                    <div className="absolute top-[8px] left-[0px] rounded-8xs bg-white box-border w-[380px] h-[64px] overflow-hidden border-[1px] border-solid border-darkgray">
                      <div></div>
                      <div>
                        <label>
                          <label
                            for="file-upload"
                            class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>
                              <img src={upload} alt="upload" />
                            </span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              onChange={(e) => setImage(e.target.files[0])}
                              className="sr-only absolute top-[0px] left-[0px] w-[380px] h-[64px] text-4xl text-dimgray-200 font-p-posts"
                              style={{
                                fontFamily: "Poppins",
                                fontStyle: "normal",
                                fontWeight: "400",
                                fontSize: "20px",
                                lineHeight: "48px",
                                color: "#717070",
                              }}
                            />
                          </label>
                        </label>
                      </div>
                    </div>
                    <div
                      className="absolute top-[0px] left-[12px] bg-white flex flex-row items-center justify-center py-0 px-1 text-8xl text-dimgray-200 font-inter"
                      style={{
                        width: "127px",
                        height: "16px",
                        fontFamily: "Inter",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "16px",
                        lineHeight: "16px",
                        color: "#1F1F1F",
                        letterSpacing: "0.5px",
                      }}
                    >
                      <div
                        className="relative tracking-[0.15px] leading-[16px]"
                        style={{
                          fontFamily: "Inter",
                          fontStyle: "normal",
                          fontWeight: "500",
                          fontSize: "16px",
                          lineHeight: "16px",
                          color: "#000000",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Product Image
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    position: "absolute",
                    width: "380px",
                    height: "64px",
                    top: "208px",
                    left: "828px",
                  }}
                >
                  <div className="absolute top-[-8px] left-[0px] w-[380px] h-[64px]">
                    <div className="absolute top-[8px] left-[0px] rounded-8xs bg-white box-border w-[380px] h-[64px] overflow-hidden border-[1px] border-solid border-darkgray">
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        style={{
                          width: "380px",
                          height: "64px",
                          border: "1px solid #686868",
                        }}
                      >
                        <option value={true}>Active</option>
                        <option value={false}>Inactive</option>
                      </select>
                    </div>
                    <div
                      className="absolute top-[0px] left-[12px] bg-white flex flex-row items-center justify-center py-0 px-1 text-8xl text-dimgray-200 font-inter"
                      style={{
                        width: "127px",
                        height: "16px",
                        fontFamily: "Inter",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "16px",
                        lineHeight: "16px",
                        color: "#1F1F1F",
                        letterSpacing: "0.5px",
                      }}
                    >
                      <div
                        className="relative tracking-[0.15px] leading-[16px]"
                        style={{
                          fontFamily: "Inter",
                          fontStyle: "normal",
                          fontWeight: "500",
                          fontSize: "16px",
                          lineHeight: "16px",
                          color: "#000000",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Status
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    position: "absolute",
                    width: "208px",
                    height: "55px",
                    top: "868px",
                    left: "999px",
                    borderRadius: "100px",
                    backgroundColor: "#662671",
                  }}
                >
                  <button
                    type="button"
                    onClick={saveProduct}
                    style={{
                      position: "absolute",
                      width: "66px",
                      height: "32px",
                      top: "11px",
                      left: "71px",
                      borderRadius: "100px",
                      backgroundColor: "#662671",
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: "18px",
                      lineHeight: "32px",
                      alignContent: "center",
                      color: "#FFFFFF",
                    }}
                  >
                    Save
                  </button>
                </div>
                <div
                  style={{
                    position: "absolute",
                    width: "208px",
                    height: "55px",
                    top: "868px",
                    left: "747px",
                    borderRadius: "100px",
                    border: "1px solid #676767",
                  }}
                >
                  <button
                    type="button"
                    onClick={cancelProduct}
                    style={{
                      position: "absolute",
                      width: "66px",
                      height: "32px",
                      top: "11px",
                      left: "71px",
                      borderRadius: "100px",
                      backgroundColor: "white",
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: "500",
                      fontSize: "18px",
                      lineHeight: "32px",
                      alignContent: "center",
                      color: "#676767",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
