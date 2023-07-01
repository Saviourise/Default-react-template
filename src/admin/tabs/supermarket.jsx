import React, { useState, useRef } from "react";
import "./product.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { supermarkets, items } from "../data/api";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

const Supermarket = () => {
  const box = useRef(null);

  const [SupermarketsData, setSupermarketsData] = useState([]);

  const [type, setType] = useState("Supermarket");

  const [Supermarket, setSupermarket] = useState({
    name: "",
    file: "",
    description: "",
  });

  const [item, setItem] = useState({
    name: "",
    images: "",
    price: "",
    quantity: "",
    id: "",
    description: "",
  });

  const [itemError, setItemError] = useState({
    nameError: "",
    imagesError: "",
    priceError: "",
    quantityError: "",
    descriptionError: "",
    idError: "",
  });

  const [error, setError] = useState({
    nameError: false,
    descriptionError: false,
    fileError: false,
  });

  const [progress, setProgress] = useState(0);
  const [openAlert, setOpenAlert] = useState(false);
  const [mess, setMess] = useState("");
  const [severity, setSeverity] = useState("success");

  const apiUrl = "https://a1api.onrender.com/api/";

  const getSupermarketsData = async () => {
    try {
      const data = await axios.get(apiUrl + "get/supermarket");
      if (data.data) {
        console.log(data.data);
        setSupermarketsData(data.data);
      } else {
        setMess("Error in getting Supermarkets, please refresh the page");
        setSeverity("error");
        setOpenAlert(true);

        return;
      }
    } catch (error) {
      setMess("Error in getting Supermarkets, please refresh the page");
      setSeverity("error");
      setOpenAlert(true);

      return;
    }
  };

  React.useEffect(() => {
    getSupermarketsData();
  }, []);

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const handleChange = (event, type) => {
    setSupermarket({ ...Supermarket, [type]: event });
  };

  const handleChangeItem = (event, type) => {
    setItem({ ...item, [type]: event });
  };

  const uploadItem = async () => {
    for (let itm in item) {
      if (item[itm] === "") {
        setError({ ...error, [itm + "Error"]: true });
        return;
      }
    }

    const formData = new FormData();

    for (let itm in item) {
      formData.append(itm, item[itm]);
    }

    for (let i = 0; i < item.images.length; i++) {
      formData.append("files", item.images[i]);
    }

    await items(formData, singleFileOptions)
      .then((data) => {
        for (let itm in item) {
          setItem({ ...item, [itm]: "" });
        }
        for (let itm in itemError) {
          setError({ ...error, [itm]: false });
        }
        setMess("Item Created Successfully");
        setOpenAlert(true);
        setSeverity("success");
      })
      .catch((error) => {
        for (let item in error) {
          setError({ ...error, [item]: false });
        }
        //console.log(error)
        setMess(error.response.data);
        setOpenAlert(true);
        setSeverity("error");
      });
  };

  const uploadSupermarket = async () => {
    for (let item in Supermarket) {
      if (Supermarket[item] === "") {
        setError({ ...error, [item + "Error"]: true });
        return;
      }
    }

    const formData = new FormData();

    for (let item in Supermarket) {
      formData.append(item, Supermarket[item]);
    }

    await supermarkets(formData, singleFileOptions)
      .then((data) => {
        for (let item in Supermarket) {
          setSupermarket({ ...Supermarket, [item]: "" });
        }
        for (let item in error) {
          setError({ ...error, [item]: false });
        }
        setMess("Supermarket Created Successfully");
        setOpenAlert(true);
        setSeverity("success");
      })
      .catch((error) => {
        for (let item in error) {
          setError({ ...error, [item]: false });
        }
        //console.log(error)
        setMess(error.response.data);
        setOpenAlert(true);
        setSeverity("error");
      });
  };

  const singleFileOptions = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percentage = Math.ceil(((loaded / 1000) * 100) / (total / 1000));
      setProgress(percentage);
    },
  };

  return (
    <>
      <div id="change-home-display-con">
        <Stack>
          <Button
            variant="contained"
            onClick={() => {
              type === "Supermarket" ? setType("item") : setType("Supermarket");
            }}
          >
            Upload {type === "Supermarket" ? "Item" : "Supermarket"} instead
          </Button>
        </Stack>
        <br />
        {type === "Supermarket" ? (
          <div id="change-carousels-con">
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 0, width: "40ch" },
              }}
              noValidate
              autoComplete="off"
              ref={box}
              id="box"
            >
              <h2 style={{ textAlign: "center", marginBottom: 30 }}>
                Add a Supermarket
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <TextField
                  id="Supermarket-name"
                  label="Supermarket name"
                  placeholder="Supermarket name"
                  multiline
                  size="small"
                  value={Supermarket.name}
                  required
                  onChange={(e) => handleChange(e.target.value, "name")}
                  error={error.nameError}
                />
                <br></br>
                <TextField
                  id="Supermarket-description"
                  label="Supermarket description"
                  placeholder="Supermarket description"
                  multiline
                  size="small"
                  value={Supermarket.description}
                  required
                  onChange={(e) => handleChange(e.target.value, "description")}
                  error={error.descriptionError}
                />
                <br></br>

                <Button
                  variant="outlined"
                  component="label"
                  size="medium"
                  color={error.fileError ? "error" : "primary"}
                >
                  Select cover Image*
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    id="images"
                    webkitdirectory
                    onChange={(e) => {
                      setProgress(0);
                      handleChange(e.target.files[0], "file");
                    }}
                  />
                </Button>
              </div>
            </Box>
            <br></br>
            {Supermarket.file && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Image Selected
              </div>
            )}
            <br />
            <br />
            <Stack>
              <Button variant="contained" onClick={uploadSupermarket}>
                Add Supermarket
              </Button>
            </Stack>
            <br></br>
            {progress !== 0 ? (
              <>
                {progress !== 100 ? <>Uploading</> : <>Uploaded</>}
                <LinearProgressWithLabel value={progress} />
                <br></br>
              </>
            ) : (
              <></>
            )}
            <br></br>
          </div>
        ) : (
          <div id="change-carousels-con">
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 0, width: "40ch" },
              }}
              noValidate
              autoComplete="off"
              ref={box}
              id="box"
            >
              <h2 style={{ textAlign: "center", marginBottom: 30 }}>
                Add a Item
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <FormControl size="small">
                  <InputLabel id="demo-simple-select-helper-label">
                    Select Supermarket to add a item
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={item.id ? item.id : ""}
                    label="Select Supermarket To Add A Item"
                    onChange={(e) => {
                      handleChangeItem(e.target.value, "id");
                    }}
                    disabled={!Boolean(SupermarketsData)}
                  >
                    {SupermarketsData &&
                      SupermarketsData.map((Supermarket) => (
                        <MenuItem value={Supermarket._id}>
                          {Supermarket.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <br />
                <TextField
                  id="item-name"
                  label="Item name"
                  placeholder="Item name"
                  multiline
                  size="small"
                  value={item.name}
                  required
                  onChange={(e) => handleChangeItem(e.target.value, "name")}
                  error={itemError.nameError}
                />
                <br />
                <TextField
                  id="item-description"
                  label="Item description"
                  placeholder="Item description"
                  multiline
                  size="small"
                  value={item.description}
                  required
                  onChange={(e) =>
                    handleChangeItem(e.target.value, "description")
                  }
                  error={itemError.descriptionError}
                />
                <br />

                <TextField
                  id="item-price"
                  label="Item price"
                  placeholder="Item price"
                  multiline
                  size="small"
                  value={item.price}
                  required
                  onChange={(e) => handleChangeItem(e.target.value, "price")}
                  error={itemError.priceError}
                />
                <br />

                <TextField
                  id="item-quantity"
                  label="Item quantity"
                  placeholder="Item quantity"
                  multiline
                  size="small"
                  value={item.quantity}
                  required
                  onChange={(e) => handleChangeItem(e.target.value, "quantity")}
                  error={itemError.quantityError}
                />

                <br></br>
                <Button
                  variant="outlined"
                  component="label"
                  size="medium"
                  color={itemError.imagesError ? "error" : "primary"}
                >
                  Select item Images*
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    id="images"
                    webkitdirectory
                    multiple
                    onChange={(e) => {
                      setProgress(0);
                      handleChangeItem(e.target.files, "images");
                    }}
                  />
                </Button>
              </div>
            </Box>
            <br></br>
            {item.images.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {item.images.length} item images selected
              </div>
            )}
            <br />
            <br />
            <Stack>
              <Button variant="contained" onClick={uploadItem}>
                Add Item
              </Button>
            </Stack>
            <br></br>
            {progress !== 0 ? (
              <>
                {progress !== 100 ? <>Uploading</> : <>Uploaded</>}
                <LinearProgressWithLabel value={progress} />
                <br></br>
              </>
            ) : (
              <></>
            )}
            <br></br>
          </div>
        )}
      </div>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
        >
          <Alert
            onClose={handleCloseAlert}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {mess}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
};

export default Supermarket;
