import React, { useEffect, useState } from "react";
import background from "../Assets/Login/background.png";
import digitalflake from "../Assets/Login/digitalflakeloginlogo.png";
import { Link, useNavigate } from "react-router-dom";
import SideNavBar from "./SideNavBar";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Function to LogIn the user by hitting an API and checking the credentials in Backend
  const submitForm = async () => {
    let result = await fetch("http://localhost:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    result = await result.json();

    setEmail("");
    setPassword("");
    navigate("/home");
    if (result.message) {
      alert(result.message);
      navigate("/");
    } else if (result.result && result.token) {
      localStorage.setItem("user", JSON.stringify(result.result));
      localStorage.setItem("token", JSON.stringify(result.token));
      navigate("/home");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/home");
    }
  });
  return (
    <div
      style={{
        width: "1728px",
        height: "1117px",
        top: "-1699px",
        left: "-2225px",
      }}
    >
      {/* Background Image */}
      <img
        src={background}
        style={{ width: "1807px", height: "1203px", top: "-59px" }}
        alt=""
      />

      {/* Login Form */}
      <form>
        <div
          style={{
            position: "absolute",
            width: "780px",
            height: "950px",
            top: "104px",
            left: "46px",
            borderRadius: "15px",
            backgroundColor: "#FFFFFF",
            boxShadow: "0px 4px 15px 0px #000000BF",
          }}
        >
          <img
            src={digitalflake}
            style={{
              position: "absolute",
              width: "301px",
              height: "158px",
              top: "57px",
              left: "239px",
            }}
            alt=""
          />
          <div
            style={{
              position: "absolute",
              width: "492px",
              height: "48px",
              top: "215px",
              left: "134px",
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: "32px",
              lineHeight: "48px",
              color: "#717070",
            }}
          >
            Welcome to Digitalflake Admin
          </div>
          <div
            style={{
              position: "absolute",
              width: "673px",
              height: "85px",
              top: "354px",
              left: "49px",
            }}
          >
            <div className="absolute top-[-8px] left-[0px] w-[673px] h-[92px]">
              <div className="absolute top-[8px] left-[0px] rounded-8xs bg-white box-border w-[673px] h-[84px] overflow-hidden border-[1px] border-solid border-darkgray">
                <input
                  type="email"
                  className="absolute top-[0px] left-[0px] w-[673px] h-[84px] text-4xl text-dimgray-200 font-p-posts"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <div className="absolute top-[0px] left-[12px] bg-white flex flex-row items-center justify-center py-0 px-1 text-8xl text-dimgray-200 font-poppins">
                <div className="relative tracking-[0.15px] leading-[16px]">
                  Email ID
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              width: "673px",
              height: "85px",
              top: "519px",
              left: "49px",
            }}
          >
            <div className="absolute top-[-8px] left-[0px] w-[673px] h-[92px]">
              <div className="absolute top-[8px] left-[0px] rounded-8xs bg-white box-border w-[673px] h-[84px] overflow-hidden border-[1px] border-solid border-darkgray">
                <input
                  type="password"
                  className="absolute top-[0px] left-[0px] w-[673px] h-[84px] text-4xl text-dimgray-200 font-p-posts"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              <div className="absolute top-[0px] left-[12px] bg-white flex flex-row items-center justify-center py-0 px-1 text-8xl text-dimgray-200 font-poppins">
                <div className="relative tracking-[0.15px] leading-[16px]">
                  Password
                </div>
              </div>
            </div>
          </div>

          {/* Forgot Password Callout  */}
          <div
            style={{
              position: "absolute",
              width: "212px",
              height: "36px",
              top: "635px",
              left: "506px",
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: "24px",
              lineHeight: "36px",
              color: "#A08CB1",
            }}
          >
            <Link
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
              onClick={() => {
                Swal.fire({
                  title: "Did you forget your password?",
                  text: "Enter your email address and we'll send you a link to restore password",
                  input: "email",
                  inputLabel: "Email Address",
                  inputPlaceholder: "Enter your Email",
                  inputAttributes: {
                    maxlength: "80",
                    autocapitalize: "off",
                    autocorrect: "off",
                  },
                  confirmButtonColor: "#662671",
                  confirmButtonText: "Request reset link",
                });
              }}
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="button"
            onClick={submitForm}
            style={{
              position: "absolute",
              width: "673px",
              height: "80px",
              top: "784px",
              left: "49px",
              borderRadius: "8px",
              backgroundColor: "#5C218B",
              boxShadow: "1px 1px 20px 0px #0000001C",
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: "500",
              fontSize: "32px",
              lineHeight: "48px",
              color: "#FFFFFF",
            }}
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}
