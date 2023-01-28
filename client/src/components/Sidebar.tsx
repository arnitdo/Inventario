import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { BsBorderStyle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { BsFillBarChartLineFill } from "react-icons/bs";
import { AiOutlineCalendar } from "react-icons/ai";
import './Sidebar.css'
const Sidebar = () => {
  const [open, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!open);
  };
  const menuItem = [
    {
      
      item: "Home",
      icon: <AiOutlineHome />,
    },
    {
      item: "Dashboard",
      icon: <MdOutlineDashboardCustomize />,
    },
    {
      item: "Orders",
      icon: <BsBorderStyle />,
    },
    {
      item: "Charts",
      icon: <BsFillBarChartLineFill />,
    },
    {
      item: "Calendar",
      icon: <AiOutlineCalendar />,
    },
  ];
  return (
    <div className="container">
      <div
        className="sidebar"
        style={open ? { width: "60px" } : { width: "300px" }}
      >
        <div className="logo-text" >
          <p style={{ fontSize: "35px" ,color:'white'}}>{!open && <p>Inventario</p>}</p>
          <p style={open ? { fontSize: "35px" } : { fontSize: "30px" }}>
            &nbsp;
            <button
              style={{
                backgroundColor: "#1c2536",
                color: "white",
                cursor: "pointer",
                fontSize:'30px',
                paddingRight:'10px',
                paddingTop:'10px'
              }}
              onClick={toggle}
            >
              <GiHamburgerMenu />
            </button>
          </p>
        </div>
        <br />
        <br />
        <ul className="side-items">
          {menuItem.map((val, index) => {
            return (
                <div className="active" key={index}>
                <p
                  style={open ? { fontSize: "40px" } : { fontSize: "30px" }}
                  className="icon-style"
                >
                  {val.icon}
                </p>
                <p style={{ marginTop: "10px" }}>{val.item}</p>
                </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};


export {Sidebar}