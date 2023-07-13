import React, { useState, useRef } from "react";
import "./product.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { products, delProducts } from "../data/api";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

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

const items = [
  "Spices",
  "Bakery",
  "Wine",
  "Snacks",
  "Vegetables",
  "Commodities",
  "Beverages",
  "Frozen Food",
  "Cooking Oil",
];

const Products = () => {
  const box = useRef(null);

  const [product, setProduct] = useState({
    name: "",
    image: [],
    price: "",
    specs: "",
    category: "",
    commission: "",
    type: "",
    negotiable: "",
  });

  const [error, setError] = useState({
    nameError: false,
    priceError: false,
    specError: false,
    typeError: false,
    imageError: false,
  });

  const [delName, setDelName] = useState("");
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [mess, setMess] = useState("");
  const [severity, setSeverity] = useState("success");

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, type) => {
    setProduct({ ...product, [type]: event });
  };

  const uploadProduct = async () => {
    for (let item in product) {
      if (product[item] === "" || product[item].length === 0) {
        setError({ ...error, [item + "Error"]: true });
        return
      }
    }

    console.log(product)

    const formData = new FormData();

    for (let i = 0; i < product.image.length; i++) {
      formData.append("files", product.image[i]);
    }

    for (let item in product) {
      formData.append(item, product[item]);
    }

    await products(formData, singleFileOptions)
      .then((data) => {
        for (let item in product) {
          setProduct({ ...product, [item]: "" });
        }
        for (let item in error) {
          setError({ ...error, [item]: false });
        }
        setMess("Product Created Successfully");
        setOpenAlert(true);
        setSeverity("success");
      })
      .catch((error) => {
        console.log( error );
        for (let item in error) {
          setError({ ...error, [item]: false });
        }
        //console.log(error)
        setMess(error.message);
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

  const delProduct = async () => {
    await delProducts(delName)
      .then((data) => {
        setDelName("");
        setMess("Product deleted successfully");
        setOpenAlert(true);
        setSeverity("success");
        handleClose2();
        handleClose();
      })
      .catch((error) => {
        setDelName("");
        setMess(error.response.data);
        setOpenAlert(true);
        setSeverity("error");
        handleClose2();
      });
  };
  return (
    <>
      <div id="change-home-display-con">
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
              Add a product
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <TextField
                id="product-name"
                label="Product name"
                placeholder="Product name"
                multiline
                size="small"
                value={product.name}
                required
                onChange={(e) => handleChange(e.target.value, "name")}
                error={error.nameError}
              />
              <br></br>
              <TextField
                id="product-price"
                label="Product price"
                placeholder="Product price"
                multiline
                size="small"
                value={product.price}
                required
                onChange={(e) => handleChange(e.target.value, "price")}
                error={error.priceError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">₦</InputAdornment>
                  ),
                }}
              />
              <br></br>
              <FormControl size="small">
                <InputLabel id="demo-simple-select-helper-label">
                  Is this product negotiable?
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={product.negotiable}
                  label="Product type"
                  onChange={(e) => handleChange(e.target.value, "negotiable")}
                >
                  <MenuItem value={"yes"}>Yes</MenuItem>
                  <MenuItem value={"no"}>No</MenuItem>
                </Select>
              </FormControl>
              <br></br>
              <TextField
                id="product-specification"
                label="Product specification"
                placeholder="Product specification"
                multiline
                size="small"
                required
                onChange={(e) => handleChange(e.target.value, "specs")}
                error={error.specError}
                value={product.specs}
              />
              <br></br>
              <FormControl size="small" required error={error.typeError}>
                <InputLabel id="demo-simple-select-helper-label">
                  Product type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  label="Product type"
                  onChange={(e) => handleChange(e.target.value, "type")}
                >
                  <MenuItem value={"electronic"}>Electronic</MenuItem>
                </Select>
              </FormControl>

              <br></br>
              <FormControl size="small" required error={error.typeError}>
                <InputLabel id="product-category">Product category</InputLabel>

                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={product.category}
                  label="Product type"
                  onChange={(e) => handleChange(e.target.value, "category")}
                  disabled={product.type === "" ? true : false}
                >
                  <MenuItem value={"laptop"}>Laptop</MenuItem>
                  <MenuItem value={"accessory"}>Accessory</MenuItem>
                  <MenuItem value={"gamepad"}>Game Pads</MenuItem>
                  <MenuItem value={"parts"}>Parts</MenuItem>
                  <MenuItem value={"exclusive"}>Exclusive</MenuItem>
                </Select>
              </FormControl>

              <br></br>
              <TextField
                id="product-commission"
                label="Product commission"
                placeholder="Product commission"
                multiline
                size="small"
                value={product.commission}
                onChange={(e) => handleChange(e.target.value, "commission")}
              />
              <br></br>
              <Button
                variant="outlined"
                component="label"
                size="medium"
                color={error.imageError ? "error" : "primary"}
              >
                Select images*
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  id="images"
                  multiple
                  webkitdirectory
                  onChange={(e) => {
                    setProgress(0);
                    handleChange(e.target.files, "image");
                  }}
                />
              </Button>
            </div>
          </Box>
          <br></br>

          {product.image.length > 0 ? (
            <>
              {product.image.length} image/images selected <br></br>
            </>
          ) : (
            <></>
          )}

          <br></br>
          <Stack>
            <Button variant="contained" onClick={uploadProduct}>
              Add Product
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
          <Stack>
            <Button variant="contained" onClick={handleClickOpen}>
              Delete a Product
            </Button>
          </Stack>
        </div>
      </div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Delete a product
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => {
                if (delName !== "") {
                  return handleClickOpen2();
                }
              }}
            >
              Delete
            </Button>
          </Toolbar>
        </AppBar>
        <div
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            label="Product name"
            placeholder="Product name"
            size="large"
            variant="filled"
            sx={{ width: 300 }}
            required
            error
            onChange={(e) => setDelName(e.target.value)}
            value={delName}
          />
          <br></br>
          Note: Name is case sensitive
        </div>
      </Dialog>
      <Dialog
        open={open2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Delete ${delName}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete this product?{" "}
            <b style={{ color: "red" }}>Note: This cannot be undone</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2}>Close</Button>
          <Button onClick={delProduct} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
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

export default Products;
