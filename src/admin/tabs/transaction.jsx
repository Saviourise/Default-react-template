import React, { useState, useEffect } from "react";
import "./transaction.css";
import axios from "axios";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import SearchIcon from "@mui/icons-material/Search";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const apiUrl = "https://a1api.onrender.com/api/";

const Transactions = () => {
  const [, setTransactions] = useState([]);
  const [, setPendingTransactions] = useState([]);
  const [, setConfirmedTransactions] = useState([]);
  const [rows, setRows] = useState([]);
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [alertSeverity, setAlertSeverity] = React.useState("success");
  const [searchRef, setSearchRef] = React.useState("");

  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const search = (ref) => {
    if (searchRef === "") {
      return;
    }
    let searchItem;
    ref ? (searchItem = ref) : (searchItem = searchRef);
    let result = data.filter((row) => {
      return (
        row.ref.toLowerCase().includes(searchItem.toLowerCase()) ||
        searchItem.toLowerCase().includes(row.ref.toLowerCase())
      );
    });
    setRows(result);
  };

  // console.log(rows);

  const getUsers = async () => {
    let pendingArray = [];
    let confirmedArray = [];
    let array = [];
    let address;
    let state;
    let landmark;
    let products;
    let status;
    let email;
    let phone;
    let ref;
    let history = [];
    let date;
    try {
      await axios
        .get(apiUrl + "user/transaction/output")
        .then((data) => {
          // console.log(data.data);
          setTransactions(data.data);

          for (let j of data.data) {
            for (let k of j.transaction) {
              let conDate = new Date(k.date);
              email = k.email;
              phone = k.phone;
              ref = k.ref;
              products = k.product.length;
              address = k.address;
              state = k.state;
              landmark = k.landmark;
              status = k.status;
              history = k.product;
              date = conDate.toLocaleDateString();
            }
            array.push({
              email: email,
              address: address,
              state: state,
              landmark: landmark,
              products: products,
              status: status,
              history: history,
              phone: phone,
              ref: ref,
              date: date,
            });
          }
          for (let i of data.data) {
            if (i.transaction[0].status === "pending") pendingArray.push(i);
            if (i.transaction[0].status === "confirmed") confirmedArray.push(i);
          }
          setPendingTransactions(pendingArray);
          setConfirmedTransactions(confirmedArray);
          setData(array);
          setRows(array);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      throw error;
    }
  };

  //console.log(pendingTransactions);

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      {/* {pendingTransactions.length !== 0 ? (
        pendingTransactions.map((trx, index) => {
          return (
            <div key={index}>
              <p>{trx.transaction[0].ref}</p>
            </div>
          );
        })
      ) : (
        <></>
      )} */}
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
        >
          <Alert
            onClose={handleCloseAlert}
            severity={alertSeverity}
            sx={{ width: "100%" }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
      </Stack>

      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          search();
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search With Reference"
          inputProps={{ "aria-label": "search with reference" }}
          onChange={(e) => {
            setSearchRef(e.target.value);
            search(e.target.value);
          }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={search}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <br />

      <h3>All Orders</h3>
      <br />

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead id="thead">
            <TableRow>
              <TableCell />
              <TableCell>Email</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Transaction Ref</TableCell>
              <TableCell>Products ordered</TableCell>
              <TableCell>Date Ordered</TableCell>
              <TableCell>Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .sort(function (a, b) {
                var dateA = new Date(a.date),
                  dateB = new Date(b.date);
                return dateB - dateA;
              })
              .map((row, index) => (
                <React.Fragment key={index}>
                  <TableRow
                    sx={{ "& > *": { borderBottom: "unset" } }}
                    id="tbrow"
                  >
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                      >
                        {open ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>
                      {row.address}, {row.state}
                    </TableCell>
                    <TableCell>{row.ref}</TableCell>
                    <TableCell>{row.products}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>
                      {row.status === "pending" ? (
                        <>
                          <Button
                            sx={{ fontSize: "10px", margin: "0 5px" }}
                            variant="contained"
                            color="info"
                            onClick={(e) => {
                              e.target.innerHTML = "Processing...";
                              axios
                                .post(apiUrl + "user/transaction/processing", {
                                  email: row.email,
                                  ref: row.ref,
                                })
                                .then((data) => {
                                  e.target.innerHTML = "Confirm";

                                  getUsers();
                                  setAlertMessage("Transaction Processed");
                                  setAlertSeverity("success");
                                  handleClickAlert();
                                })
                                .catch((error) => {
                                  e.target.innerHTML = "Process";

                                  setAlertMessage(
                                    "Error Completing Transaction"
                                  );
                                  setAlertSeverity("error");
                                  handleClickAlert();
                                });
                            }}
                          >
                            Process
                          </Button>
                          <Button
                            sx={{ fontSize: "10px", margin: "0 5px" }}
                            variant="contained"
                            color="error"
                            onClick={(e) => {
                              e.target.innerHTML = "Canceling...";
                              axios
                                .post(apiUrl + "user/transaction/cancel", {
                                  email: row.email,
                                  ref: row.ref,
                                })
                                .then((data) => {
                                  e.target.innerHTML = "Canceled";

                                  getUsers();
                                  setAlertMessage("Transaction Canceled");
                                  setAlertSeverity("success");
                                  handleClickAlert();
                                })
                                .catch((error) => {
                                  e.target.innerHTML = "Cancel";

                                  setAlertMessage(
                                    "Error Completing Transaction"
                                  );
                                  setAlertSeverity("error");
                                  handleClickAlert();
                                });
                            }}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : row.status === "processing" ? (
                        <>
                          <Button
                            sx={{ fontSize: "10px", margin: "0 5px" }}
                            variant="contained"
                            color="success"
                            onClick={(e) => {
                              e.target.innerHTML = "Confirming...";
                              axios
                                .post(apiUrl + "user/transaction/confirm", {
                                  email: row.email,
                                  ref: row.ref,
                                })
                                .then((data) => {
                                  e.target.innerHTML = "Confirmed";

                                  getUsers();
                                  setAlertMessage("Transaction Completed");
                                  setAlertSeverity("success");
                                  handleClickAlert();
                                })
                                .catch((error) => {
                                  e.target.innerHTML = "Confirm";

                                  setAlertMessage(
                                    "Error Completing Transaction"
                                  );
                                  setAlertSeverity("error");
                                  handleClickAlert();
                                });
                            }}
                          >
                            Confirm
                          </Button>
                          <Button
                            sx={{ fontSize: "10px", margin: "0 5px" }}
                            variant="contained"
                            color="error"
                            onClick={(e) => {
                              e.target.innerHTML = "Canceling...";
                              axios
                                .post(apiUrl + "user/transaction/cancel", {
                                  email: row.email,
                                  ref: row.ref,
                                })
                                .then((data) => {
                                  e.target.innerHTML = "Canceled";

                                  getUsers();
                                  setAlertMessage("Transaction Completed");
                                  setAlertSeverity("success");
                                  handleClickAlert();
                                })
                                .catch((error) => {
                                  e.target.innerHTML = "Cancel";

                                  setAlertMessage(
                                    "Error Completing Transaction"
                                  );
                                  setAlertSeverity("error");
                                  handleClickAlert();
                                });
                            }}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <></>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={6}
                    >
                      <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                          <Typography variant="h6" gutterBottom component="div">
                            All Products Details
                          </Typography>
                          <Table size="small" aria-label="purchases">
                            <TableHead>
                              <TableRow>
                                <TableCell>Product Name</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell align="right">Amount (₦)</TableCell>
                                <TableCell align="right">
                                  Total price (₦)
                                </TableCell>
                                <TableCell align="right">
                                  Product Image
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {row.history.map((historyRow) => {
                                return (
                                  <TableRow key={historyRow.product._id}>
                                    <TableCell component="th" scope="row">
                                      {historyRow.product.name}
                                    </TableCell>
                                    <TableCell>
                                      {historyRow.product.restaurant
                                        ? historyRow.product.restaurant
                                        : historyRow.product.supermarket
                                        ? historyRow.product.supermarket
                                        : ""}
                                    </TableCell>
                                    <TableCell>{historyRow.quantity}</TableCell>
                                    <TableCell align="right">
                                      {Number(
                                        historyRow.product.price
                                      ).toLocaleString()}
                                    </TableCell>
                                    <TableCell align="right">
                                      {(
                                        Number(historyRow.product.price) *
                                        Number(historyRow.quantity)
                                      ).toLocaleString()}
                                    </TableCell>
                                    <TableCell align="right">
                                      <img
                                        src={`https://a1api.onrender.com/${historyRow.product.files[0].img}`}
                                        alt=""
                                        style={{
                                          width: "50px",
                                          height: "50px",
                                        }}
                                      />
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Transactions;
