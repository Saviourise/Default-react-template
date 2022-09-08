/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import "./admin.css";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ChangeHomeDisplay from "./tabs/changeHomeDisplay";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Products from "./tabs/product";
import Overview from "./tabs/overview";
import Transactions from "./tabs/transaction";

const Admin = () => {
  const stack = useRef(null);
  let params = useParams();
  const state = useLocation();
  const [token, setToken] = useState("");

  //console.log(state)
  let navigate = useNavigate();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setToken(state.state);
    //console.log(state.state);
    fetch(process.env.REACT_APP_API_URL+"api/admin", {
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
            return navigate(`/admin`, {
              state: "Session expired! Login again to continue",
            });
          }
          return navigate(`/admin`, { state: data.message });
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
        return navigate(`/admin`, { state: error.message });
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
              <Tab
                label="Overview"
                onFocus={() => navigate("/admin/overview", { state: token })}
                value="overview"
              />
              <Tab
                label="Add / Remove product"
                onFocus={() => navigate("/admin/product", { state: token })}
                value="product"
              />
              <Tab
                label="Customer care"
                onFocus={() =>
                  navigate("/admin/customercare", { state: token })
                }
                value="customercare"
              />
              <Tab
                label="Change home display"
                onFocus={() =>
                  navigate("/admin/changehomedisplay", { state: token })
                }
                value="changehomedisplay"
              />
              <Tab
                label="Add / Remove Admin"
                onFocus={() =>
                  navigate("/admin/admincontrol", { state: token })
                }
                value="admincontrol"
              />
              <Tab
                label="Transactions"
                onFocus={() =>
                  navigate("/admin/transactions", { state: token })
                }
                value="transactions"
              />
              <Tab
                label="Affiliates"
                onFocus={() => navigate("/admin/affiliates", { state: token })}
                value="affiliates"
              />
              <Tab
                label="Settings"
                onFocus={() => navigate("/admin/settings", { state: token })}
                value="settings"
              />
              <Tab
                label="Log Out"
                onFocus={() => navigate("/admin", { state: null })}
              />
            </TabList>
          </Box>
          <TabPanel value="changehomedisplay">
            <ChangeHomeDisplay />
          </TabPanel>
          <TabPanel value="overview">
            <Overview />
          </TabPanel>
          <TabPanel value="settings">Settings</TabPanel>
          <TabPanel value="admincontrol">Admin Control</TabPanel>
          <TabPanel value="transactions"><Transactions /> </TabPanel>
          <TabPanel value="affiliates">Affiliates</TabPanel>
          <TabPanel value="customercare">Customercare</TabPanel>
          <TabPanel value="product">
            <Products />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default Admin;
