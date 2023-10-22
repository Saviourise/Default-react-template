/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import "./admin.css";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Blog from "./tabs/blog";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Products from "./tabs/product";
import Overview from "./tabs/overview";
import Transactions from "./tabs/transaction";
import UpdateProduct from "./tabs/product2";
import Restaurant from "./tabs/restaurant";
import Supermarket from "./tabs/supermarket";
import Ads from "./tabs/Ads";
import BlackFriday from "./tabs/blackfriday";
import Affiliate from "./tabs/Affiliate";

const Admin = () => {
  const stack = useRef(null);
  let params = useParams();
  const state = useLocation();
  const [token, setToken] = useState("");

  //console.log(state)
  let navigate = useNavigate();
  const [value, setValue] = useState("overview");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setToken(state.state);
    //console.log(state.state);
    fetch("https://a1api.onrender.com/api/admin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": state.state,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log( data );
        if (data.error) {
          if (data.error.message) {
            return navigate(`/`, {
              state: "Session expired! Login again to continue",
            });
          }
          return navigate(`/`, { state: data.message });
        }

        if (data.message) {
          return navigate(`/admin`, { state: data.message });
        }

        if (data.admin) {
          setTimeout(() => {
            stack.current.style.display = "none";
          }, 5000);
        }
      })
      .catch((error) => {
        //console.log(error)
        return navigate(`/`, { state: error.message });
      });
    //stack.current.style.display = "none";
  }, [params, state, value]);
  return (
    <>
      <Stack ref={stack} sx={{ width: "100%" }} spacing={1}>
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          Admin Logged in successfully
        </Alert>
      </Stack>
      <Box>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              backgroundColor: "rgba(0, 0, 255, 0.1)",
            }}
          >
            <TabList
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              aria-label="scrollable force tabs example"
              selectionFollowsFocus
            >
              <Tab label="Overview" value="overview" />
              <Tab label="Product" value="product" />
              <Tab label="Update product" value="product2" />
              {/* <Tab
                label="Customer care"
                onFocus={() =>
                  navigate("/admin/customercare", { state: token })
                }
                value="customercare"
              /> */}
              {/* <Tab
                label="Change home display"
                onFocus={() =>
                  navigate("/admin/changehomedisplay", { state: token })
                }
                value="changehomedisplay"
              /> */}
              <Tab label="Restaurant" value="restaurant" />
              <Tab label="Supermarket" value="supermarket" />
              <Tab label="Orders" value="transactions" />
              <Tab label="Ads" value="ads" />
              <Tab label="Black Friday" value="blackfriday" />
              <Tab label="Affiliates" value="affiliates" />
              <Tab
                label="Blog"
                onFocus={() => navigate("/admin/blog", { state: token })}
                value="blog"
              />
              <Tab
                label="Log Out"
                onFocus={() => navigate("/admin", { state: null })}
              />
            </TabList>
          </Box>
          {/* <TabPanel value="changehomedisplay">
            <ChangeHomeDisplay />
          </TabPanel> */}
          <TabPanel value="overview">
            <Overview />
          </TabPanel>
          <TabPanel value="blog">
            <Blog />
          </TabPanel>
          <TabPanel value="ads">
            <Ads />
          </TabPanel>
          <TabPanel value="blackfriday">
            <BlackFriday />
          </TabPanel>
          <TabPanel value="transactions">
            <Transactions />{" "}
          </TabPanel>
          <TabPanel value="restaurant">
            <Restaurant />{" "}
          </TabPanel>
          <TabPanel value="supermarket">
            <Supermarket />{" "}
          </TabPanel>
          <TabPanel value="product2">
            <UpdateProduct />{" "}
          </TabPanel>
          <TabPanel value="affiliates">
            <Affiliate />
          </TabPanel>
          {/* <TabPanel value="customercare">Customercare</TabPanel> */}
          <TabPanel value="product">
            <Products />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default Admin;
