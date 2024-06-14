import { NavLink } from "react-router-dom";
import arrow from "../../assets/arrow.png";
import "./Navbar.css";
import { CoinContext } from "../../Context/CoinContext";
import { useContext, useState } from "react";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
const Navbar = () => {
  const { currencyType, setCurrencyType } = useContext(CoinContext);
 const [ hamburgerClicked , setHamburgetClicked ] = useState(false);
 
console.log(hamburgerClicked)
  const handleCurrencyTypeChange = (event) => {
    const currencyType = event.target.value;
    if (currencyType === "inr") {
      setCurrencyType({
        name: "inr",
        symbol: "₹",
      });
      return;
    } else if (currencyType === "eur") {
      setCurrencyType({
        name: "eur",
        symbol: "€",
      });

      return;
    } else {
      setCurrencyType({
        name: "usd",
        symbol: "$",
      });

      return;
    }
  };
  return (
    <div className="borderbottom ">
      <div className="navbar navcontainer">
        <NavLink to={"./"} className="navbarlogo">
          <svg
            viewBox="0 0 200 50"
            width="120"
            style={{
              maxWidth: "100%",
              height: "auto",
              backgroundColor: "transparent",
            }}
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Transparent Background */}
            <rect x="0" y="0" width="200" height="50" fill="none" />

            {/* Crypto Icon */}
            <g transform="translate(20, 25)">
              {/* Outer circle */}
              <circle cx="0" cy="0" r="16" fill="#f7931a" />

              {/* Inner shape (e.g., B) */}
              <path d="M -10,0 A 10,10 0 1,1 10,0 L 0,-5 Z" fill="#2d2d2d" />
            </g>

            {/* Text */}
            <text
              x="60"
              y="35"
              fontFamily="Arial, sans-serif"
              fontSize="16"
              fontWeight="bold"
              fill="#ffffff"
            >
              CryptoNexus
            </text>
          </svg>
        </NavLink>
        <div className="hamburger">
        <div className={`hamburgermenu-icon ${hamburgerClicked?"displaynone":"displayinlineblock"}`} onClick={()=>setHamburgetClicked(!hamburgerClicked)} >
            <img src="src/assets/hamburger.svg" alt="" />
          </div>
         < HamburgerMenu  hamburgerClicked={hamburgerClicked} setHamburgerClicked={setHamburgetClicked}   ></HamburgerMenu>
        </div>
          
        <ul className="navlist">
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink>Feature</NavLink>
          </li>
          <li>
            <NavLink>Pricing</NavLink>
          </li>
          <li>
            <NavLink>Blog</NavLink>
          </li>
        </ul>

        <div className="nav-right">
          <select name="" id="" onChange={(e) => handleCurrencyTypeChange(e)}>
            <option value="" hidden>
              Slect Currency
            </option>
            <option value="inr">₹ IND</option>
            <option value="eur">€ EUR</option>
            <option value="usd">$ USD</option>
          </select>

          <button>
            <img src={arrow} alt="" /> Sign In{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
