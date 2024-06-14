import React, { useState } from 'react'
import "./HamburgerMenu.css"
import { NavLink } from 'react-router-dom'
const HamburgerMenu = ({hamburgerClicked,setHamburgerClicked}) => {
  
  return (
    <div  className={`menucontainer ${!hamburgerClicked? "displaynone":"displayinlineblock"} `} >
      <img src="src/assets/cross.svg" alt="" className={`menuclose`} 
      onClick={()=>{
        
        setHamburgerClicked(!hamburgerClicked)
      
      }}
      
      />
       <ul>
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
    </div>
  )
}

export default HamburgerMenu