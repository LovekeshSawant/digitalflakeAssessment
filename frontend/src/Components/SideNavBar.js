import React from "react";
import TransLogo from "../Assets/Home/TransLogo.png";
import LogoutLogo from "../Assets/Home/LogoutLogo.png";
import home from "../Assets/Home/home.png";
import category from "../Assets/Home/category.png";
import subcategory from "../Assets/Home/subcategory.png"
import products from "../Assets/Home/products.png";
import arrow from "../Assets/Home/Arrow.png";
import digitalflakelogo from "../Assets/Login/digitalflakeloginlogo.png";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function SideNavBar() {
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
        <div>
          {/* Side Navbar  */}
          <div
            style={{
              position: "absolute",
              width: "448px",
              height: "1117px",
              backgroundColor: "#F4F4F4",
            }}
          >
            {/* Home tab */}
            <Link to="/home">
              <div
                style={{
                  position: "absolute",
                  width: "439px",
                  height: "59px",
                  top: "159px",
                  left: "4px",
                  mixBlendMode: "multiply",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    width: "30px",
                    height: "30px",
                    top: "13px",
                    left: "26px",
                  }}
                >
                  <img src={home}></img>
                </div>
                <div
                  style={{
                    position: "absolute",
                    width: "67px",
                    height: "24px",
                    top: "16px",
                    left: "78px",
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: "400",
                    fontSize: "24px",
                    lineHeight: "24px",
                    color: "#000000",
                    alignContent: "center",
                  }}
                >
                  Home
                </div>
                <div
                  style={{
                    position: "absolute",
                    width: "20px",
                    height: "10px",
                    top: "18px",
                    left: "422px",
                  }}
                >
                  <img src={arrow}></img>
                </div>
              </div>
            </Link>
            {/* Category tab */}
            <Link to="/category">
              <div
                style={{
                  position: "absolute",
                  width: "439px",
                  height: "59px",
                  top: "255px",
                  left: "5px",
                  mixBlendMode: "multiply",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    width: "30px",
                    height: "30px",
                    top: "14px",
                    left: "25px",
                  }}
                >
                  <img src={category}></img>
                </div>
                <div
                  style={{
                    position: "absolute",
                    width: "106px",
                    height: "24px",
                    top: "17px",
                    left: "76px",
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: "400",
                    fontSize: "24px",
                    lineHeight: "24px",
                    color: "#000000",
                    alignContent: "center",
                  }}
                >
                  Category
                </div>
                <div
                  style={{
                    position: "absolute",
                    width: "20px",
                    height: "10px",
                    top: "19px",
                    left: "421px",
                  }}
                >
                  <img src={arrow}></img>
                </div>
              </div>
            </Link>

            {/* SubCategory tab */}
            <Link to="/subCategory">
              <div
                style={{
                  position: "absolute",
                  width: "439px",
                  height: "59px",
                  top: "345px",
                  left: "5px",
                  mixBlendMode: "multiply",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    width: "30px",
                    height: "30px",
                    top: "14px",
                    left: "25px",
                  }}
                >
                  <img src={subcategory}></img>
                </div>
                <div
                  style={{
                    position: "absolute",
                    width: "106px",
                    height: "24px",
                    top: "17px",
                    left: "76px",
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: "400",
                    fontSize: "24px",
                    lineHeight: "24px",
                    color: "#000000",
                    alignContent: "center",
                  }}
                >
                  SubCategory
                </div>
                <div
                  style={{
                    position: "absolute",
                    width: "20px",
                    height: "10px",
                    top: "19px",
                    left: "421px",
                  }}
                >
                  <img src={arrow}></img>
                </div>
              </div>
            </Link>
            
            {/* Products tab */}
            <Link to="/products">
              <div
                style={{
                  position: "absolute",
                  width: "439px",
                  height: "59px",
                  top: "430px",
                  left: "5px",
                  mixBlendMode: "multiply",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    width: "30px",
                    height: "30px",
                    top: "16px",
                    left: "25px",
                  }}
                >
                  <img src={products}></img>
                </div>
                <div
                  style={{
                    position: "absolute",
                    width: "102px",
                    height: "24px",
                    top: "19px",
                    left: "77px",
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: "400",
                    fontSize: "24px",
                    lineHeight: "24px",
                    color: "#000000",
                    alignContent: "center",
                  }}
                >
                  Products
                </div>
                <div
                  style={{
                    position: "absolute",
                    width: "20px",
                    height: "10px",
                    top: "21px",
                    left: "421px",
                  }}
                >
                  <img src={arrow}></img>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Header */}
        <div
          style={{
            position: "absolute",
            width: "1728px",
            height: "118px",
            backgroundColor: "#662671",
            boxShadow: "0px 4px 5px 0px #0000001A",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "296px",
              height: "45.96px",
              top: "36px",
              left: "30px",
            }}
          >
            <img src={TransLogo}></img>
          </div>

          
          {/* Logout Callout*/}
          <div>
            <a href="/"
              type="button"
              style={{
                position: "absolute",
                width: "50px",
                height: "50px",
                top: "31px",
                left: "1621px",
                backgroundColor: "#662671",
              }}
              onClick={(e) => {
                e.preventDefault();
                Swal.fire({
                  title: "Log Out",
                  text: "Are you sure you want to log out ?",
                  icon: "warning",
                  showCancelButton: true,
                  cancelButtonColor: "#676767",
                  confirmButtonColor: "#662671",
                  confirmButtonText: "Confirm",
                }).then((result) => {
                  if (result.isConfirmed) {
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    window.location.reload();
                  }
                });
              }}
            >
              <img src={LogoutLogo}></img>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
