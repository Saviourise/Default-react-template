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

const apiUrl = process.env.REACT_APP_API_URL + "api/";

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
  const [btnText, setBtnText] = React.useState("Complete Order");
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
          console.log(data.data);
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
              <TableCell>Nearest Landmark</TableCell>
              <TableCell>Transaction Ref</TableCell>
              <TableCell>Products ordered</TableCell>
              <TableCell>Date Ordered</TableCell>
              <TableCell>Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              // <Row key={row.name} row={row} />
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
                  <TableCell>{row.landmark}</TableCell>
                  <TableCell>{row.ref}</TableCell>
                  <TableCell>{row.products}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>
                    {row.status === "pending" ? (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                          setBtnText("Confirming...");
                          axios
                            .post(apiUrl + "user/transaction/confirm", {
                              email: row.email,
                              ref: row.ref,
                            })
                            .then((data) => {
                              console.log(data);
                              getUsers();
                              setAlertMessage("Transaction Completed");
                              setAlertSeverity("success");
                              handleClickAlert();
                              setBtnText("Complete Order");
                            })
                            .catch((error) => {
                              setAlertMessage("Error Completing Transaction");
                              setAlertSeverity("error");
                              handleClickAlert();
                              setBtnText("Complete Order");
                            });
                        }}
                      >
                        {btnText}
                      </Button>
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
                              <TableCell align="right">Product Image</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {row.history.map((historyRow) => (
                              <TableRow key={historyRow._id}>
                                <TableCell component="th" scope="row">
                                  {historyRow.name}
                                </TableCell>
                                <TableCell>{historyRow.quantity}</TableCell>
                                <TableCell align="right">
                                  {historyRow.price}
                                </TableCell>
                                <TableCell align="right">
                                  {Number(historyRow.price) *
                                    Number(historyRow.quantity)}
                                </TableCell>
                                <TableCell align="right">
                                  <img
                                    src={`https://a1api.onrender.com/${historyRow.files[0].img}`}
                                    alt=""
                                    style={{ width: "50px", height: "50px" }}
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
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
