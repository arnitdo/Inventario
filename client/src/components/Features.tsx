import React from "react";
import "./Features.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import PieChartIcon from "@mui/icons-material/PieChart";
import BarChartIcon from "@mui/icons-material/BarChart";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { TextField, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { fontWeight } from "@mui/system";
const Features = () => {
  const ana = require("../assets/ana.jpg");
  const fimg = require("../assets/fimg.png");
  const one = require("../assets/one.jpg");
  const two = require("../assets/two.jpg");
  const three = require("../assets/three.jpg");
  const four = require("../assets/four.jpg");
  const ana2 = require("../assets/ana2.jfif");
  const track = require("../assets/track.jfif");
  const a1 = require("../assets/a1.jfif");
  const a2 = require("../assets/a2.jpg");
  const multiple=require('../assets/multiple.jpg')
  const avatarStyle = {
    backgroundColor: "#000",
    marginTop: "15px",
    marginLeft: "10px",
    marginBottom: "10px",
  };

  return (
    <div>
      <div className="front">
        <img
          style={{ height: "850px" }}
          src={fimg}
          alt="front"
          className="front-img"
        />
        <div className="text-front">
          <span>
            <p style={{ fontSize: "16px", color: "grey" }}>
              EXCELLENCE IN EVERYTHING
            </p>
            <Typography variant="h2" sx={{ fontWeight: "bolder" }}>
              Optimizing your
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: "bolder" }}>
              inventory, streamlining{" "}
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: "bolder" }}>
              your operations.{" "}
            </Typography>
          </span>
          <br></br>
          <div className="btn-style">
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "white" }}
            >
              <div className="btnlogin">Login</div>
            </Link>
          </div>
        </div>
      </div>
    
      <div className="analytics">
        <div className="left-portion">
          <Typography variant="h2" sx={{ fontWeight: "bolder" }}>
            Warehouse
            <br />
            Analytics
          </Typography>
          <Typography sx={{ fontSize: "20px", marginTop: "20px" }}>
            Warehouse analytics is the process of collecting, analyzing and
            interpreting data from warehouse operations in order to improve
            efficiency, productivity and profitability. This can include data on
            inventory levels, shipping and receiving, labor productivity,
            equipment utilization, and more. The use of warehouse analytics can
            help warehouse managers make data-driven decisions, identify areas
            for improvement, and track the success of implemented changes. Some
            key metrics that are commonly tracked in warehouse analytics include
            inventory turnover rate, order fill rate, and picking accuracy.
          </Typography>
        </div>
        <div className="right-portion">
          <img src={ana} className="ware1" />
          <img src={ana2} className="ware2" />
        </div>
      </div>

      <div className="inventory">
        <div className="left-portion-1">
          <img src={track} className="ware3" />
        </div>
        <div className="right-portion-1">
          <Typography variant="h2" sx={{ fontWeight: "bolder" }}>
            Inventory
            <br />
            Tracking
          </Typography>
          <Typography sx={{ fontSize: "20px", marginTop: "20px" }}>
            Allows you to track the quantity and value of items in your
            warehouse in real-time, including items that are on order, in
            transit, or in multiple locations. It?? typically involve storing
            data on inventory levels in a database, and using a user interface
            to display the data in an easy-to-understand format. The data would
            be updated in real-time as items are added to or removed from the
            warehouse.
          </Typography>
        </div>
      </div>
      <div className="analytics">
        <div className="left-portion-2">
          <Typography variant="h2" sx={{ fontWeight: "bolder" }}>
            W2W Transfer
          </Typography>
          <Typography sx={{ fontSize: "20px", marginTop: "20px" }}>
            A warehouse-to-warehouse transfer is a crucial component of supply
            chain management and logistics. It allows businesses to move
            inventory from one warehouse location to another in order to meet
            changing demand patterns, redistribute inventory, or reduce costs.
            This type of transfer typically involves several steps, including:
          </Typography>
          <img
            style={{
              width: "450px",
              height: "450px",
              marginTop: "10px",
              objectFit: "cover",
            }}
            src={a1}
          ></img>
        </div>
        <div className="right-portion">
          <img
            style={{
              marginTop: "150px",
              height: "600px",
              width: "800px",
              marginRight: "100px",
            }}
            src={a2}
          ></img>
        </div>
      </div>
      <div className="img-container">
          <div className="image">
            <img
              src={multiple}
              alt="image"
              style={{
                marginTop: "50px",
                marginLeft: "40px",
                borderRadius: "2cm",
                width: "400px",
                height: "500px"
              }}
            ></img>
          </div>
          <div className="text">
             <Typography variant="h2" sx={{fontWeight: "bolder", marginLeft: "20px"}}>Multi Location Inventory</Typography> 
            <p style={{marginRight: "250px", marginLeft: "20px", fontWeight: "normal"}}>
              Allows users to manage inventory accross multiple locations and
              transfer stock between them. Multi-location inventory management
              is the process of managing and tracking invenstory accross
              multiple warehouse or store locations. It involves maintaining
              accurate and up-to-date records of inventory levels, movements,
              and transactions at each locations.
            </p>
          </div>
        </div>
      <div className="notifications">
        <div className="left-content">
          <Typography variant="h2" sx={{ fontWeight: "bolder" }}>Notifications & Alerts</Typography>
        </div>
        <div className="right-content">
          <Typography variant="h6">
            Allows you to set up notifications and alerts for low stock levels,
            stockouts, and other inventory-related events. They allow you to
            stay informed about important events related to your inventory. This
            feature would typically involve setting up rules or thresholds for
            certain inventory levels or events, and then sending notifications
            or alerts when those rules or thresholds are met.
          </Typography>
        </div>
      </div>
      <div className="reports">
        <div className="report-text">
          <Typography variant="h2" sx={{ fontWeight: "bolder" }}>
            Inventory Reports
          </Typography>
          Inventory reports are a type of financial report that provide detailed
          information about the inventory levels and value of a business. These
          reports can include a wide range of information such as inventory
          turnover rate, stock aging, and sales by item. They can help
          businesses to gain insights into their inventory data and make
          informed decisions about inventory management, purchasing, and sales.
        </div>
        <div className="steps">
          <div className="step-1">
            <img
              style={{
                height: "60px",
                width: "60px",
              }}
              src={one}
            ></img>
            <Typography variant="h5">Inventory Turnover Rate Export</Typography>
            <Typography variant="body2">
              It shows how many times a company has sold and replaced inventory
              during a certain period, it can be used to measure efficiency of
              inventory management and how well the company is selling its
              products.
            </Typography>
          </div>
          <div className="step-2">
            <img
              style={{
                height: "60px",
                width: "60px",
              }}
              src={two}
            ></img>
            <Typography variant="h5">Stock Aging Export</Typography>
            <Typography variant="body2">
              Stock aging report shows how long items have been held in
              inventory, it can be used to identify slow-moving or obsolete
              items that need to be marked down or written off.
            </Typography>
          </div>
          <div className="step-3">
            <img
              style={{
                height: "60px",
                width: "60px",
              }}
              src={three}
            ></img>
            <Typography variant="h5">Sales by Item report</Typography>
            <Typography variant="body2">
              Sales by item report shows the sales of each item in a certain
              period, it can be used to identify the best-selling items and
              allocate resources accordingly.
            </Typography>
          </div>
          <div className="step-4">
            <img
              style={{
                height: "60px",
                width: "60px",
              }}
              src={four}
            ></img>
            <Typography variant="h5">Current Stock Valuation</Typography>
            <Typography variant="body2">
              Stock valuation is the process of determining the value of a
              company's stock. There are several methods that can be used to
              value a stock.
            </Typography>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "3rem",
            marginLeft: "450px",
            marginTop: "50px",
          }}
        >
          <Card
            sx={{
              width: "300px",
              height: "250px",
              borderRadius: "1cm",
              backgroundColor: "#dddbdb",
            }}
          >
            <CardContent>
              <Avatar style={avatarStyle}>
                <BackupTableIcon />
              </Avatar>
              <h1 style={{ fontFamily: "sans-serif", marginLeft: "10px" }}>
                Tables
              </h1>
              <p
                style={{
                  fontFamily: "sans-serif",
                  marginLeft: "10px",
                  marginTop: "10px",
                  fontSize: "0.875rem",
                }}
              >
                A simple and easy-to-read format that displays data in a tabular
                format with rows and columns
              </p>
            </CardContent>
          </Card>

          <Card
            sx={{
              width: "300px",
              height: "250px",
              borderRadius: "1cm",
              backgroundColor: "#dddbdb",
            }}
          >
            <CardContent>
              <Avatar style={avatarStyle}>
                <PieChartIcon />
              </Avatar>
              <h1 style={{ fontFamily: "sans-serif", marginLeft: "10px" }}>
                Charts
              </h1>
              <p
                style={{
                  fontFamily: "sans-serif",
                  marginLeft: "10px",
                  marginTop: "10px",
                  fontSize: "0.875rem",
                }}
              >
                A grphical representation of data that can be used used to
                visualize trends and patterns in the data
              </p>
            </CardContent>
          </Card>

          <Card
            sx={{
              width: "300px",
              height: "250px",
              borderRadius: "1cm",
              backgroundColor: "#dddbdb",
            }}
          >
            <CardContent>
              <Avatar style={avatarStyle}>
                <BarChartIcon />
              </Avatar>
              <h1 style={{ fontFamily: "sans-serif", marginLeft: "10px" }}>
                Graphs
              </h1>
              <p
                style={{
                  fontFamily: "sans-serif",
                  marginLeft: "10px",
                  marginTop: "10px",
                  fontSize: "0.875rem",
                }}
              >
                A virtual representation of data that uses lines, bars, or
                points, to show the relationship between different data points
              </p>
            </CardContent>
          </Card>
        </div>
     
        <div className="contact">
          <div className="left-content-1">
            <Typography variant="h2" sx={{fontWeight:"bold"}}>
              Email us, we would love to hear form you
            </Typography>
          </div>
          <div className="right-content-1">
            <p>
              <Typography variant="h6">Name</Typography>
              <input type="text" size={60} style={{ height: "50px" }} />
              <Typography variant="h6">Email</Typography>
              <input type="text" size={60} style={{ height: "50px" }} />
            </p>
            <Typography variant="h6">Message</Typography>
            <textarea
              inputMode="text"
              style={{ height: "150px", width: "400px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Features };
