import React, { useState, useRef } from "react";
import "./product.css";
import {
  InputLabel,
  Typography,
  LinearProgress,
  InputAdornment,
  TextField,
  Box,
  Button,
  Stack,
  MenuItem,
  FormControl,
  Snackbar,
  Select,
} from "@mui/material";
import PropTypes from "prop-types";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
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
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

const apiUrl = "https://a1api.onrender.com/api/";

const UpdateProduct = () => {
  const box = useRef(null);
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState(null);
  const [progress, setProgress] = useState(0);
  const [openAlert, setOpenAlert] = useState(false);
  const [mess, setMess] = useState("");
  const [severity, setSeverity] = useState("success");

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (let el in product) {
      if (el === "images") {
        for (let i = 0; i < product[el].length; i++) {
          // console.log(product[el][i]);
          formData.append("imgs", product[el][i]);
        }
      }
      formData.append(el, product[el]);
      // console.log(product[el]);
    }
    try {
      await axios
        .post(apiUrl + "update/products", formData, singleFileOptions)
        .then((data) => {
          setMess(data.data);
          setSeverity("success");
          setOpenAlert(true);
        })
        .catch((err) => {
          setMess("could not update product, please try again");
          setSeverity("error");
          setOpenAlert(true);
          console.log(err);
        });
    } catch (error) {
      setMess("Error in getting, please refresh the page");
      setSeverity("error");
      setOpenAlert(true);

      return;
    }
  };

  const getProductData = async () => {
    try {
      const data = await axios.get(apiUrl + "upload/products");
      if (data.data) {
        setProducts(data.data);
      } else {
        setMess("Error in getting, please refresh the page");
        setSeverity("error");
        setOpenAlert(true);

        return;
      }
    } catch (error) {
      setMess("Error in getting, please refresh the page");
      setSeverity("error");
      setOpenAlert(true);

      return;
    }
  };

  const singleFileOptions = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percentage = Math.ceil(((loaded / 1000) * 100) / (total / 1000));
      setProgress(percentage);
    },
  };

  React.useEffect(() => {
    getProductData();
  }, []);

  React.useEffect(() => {
    if (product && product.negotiable === true) {
      setProduct({ ...product, negotiable: "yes" });
    } else {
      setProduct({ ...product, negotiable: "no" });
    }
  }, [product]);

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
              Edit a product
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
                  Select Product to edit
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={product ? product : ""}
                  label="Select Product To Edit"
                  onChange={(e) => {
                    setProduct(e.target.value);
                  }}
                  disabled={!Boolean(products)}
                >
                  {products &&
                    products.map((product) => (
                      <MenuItem value={product}>{product.name}</MenuItem>
                    ))}
                </Select>
              </FormControl>

              <br />
              <TextField
                id="product-name"
                label="Product name"
                placeholder="Product name"
                multiline
                size="small"
                onChange={(e) => {
                  setProduct({ ...product, name: e.target.value });
                }}
                focused
                value={product && product.name}
                disabled={!Boolean(product)}
              />
              <br></br>
              <TextField
                id="product-price"
                label="Product price"
                placeholder="Product price"
                multiline
                size="small"
                disabled={!Boolean(product)}
                onChange={(e) => {
                  setProduct({ ...product, price: e.target.value });
                }}
                focused
                value={product && product.price}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">₦</InputAdornment>
                  ),
                }}
              />
              <br></br>
              <TextField
                id="product-normal-price"
                label="Product normal price"
                placeholder="Product normal price"
                multiline
                size="small"
                disabled={!Boolean(product)}
                onChange={(e) => {
                  setProduct({ ...product, normalPrice: e.target.value });
                }}
                focused
                value={product && product.normalPrice}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">₦</InputAdornment>
                  ),
                }}
              />
              <br></br>
              <TextField
                id="product-specification"
                label="Product specification"
                placeholder="Product specification"
                multiline
                size="small"
                focused
                disabled={!Boolean(product)}
                onChange={(e) => {
                  setProduct({ ...product, specs: e.target.value });
                }}
                value={product && product.specs}
              />
              <br></br>
              <TextField
                id="product-category"
                label=""
                placeholder=""
                multiline
                size="small"
                focused
                disabled
                onChange={(e) => {
                  setProduct({ ...product, category: e.target.value });
                }}
                value={product && product.category}
              />
              <br></br>
              <TextField
                id="product-type"
                label=""
                placeholder=""
                multiline
                size="small"
                focused
                disabled
                onChange={(e) => {
                  setProduct({ ...product, type: e.target.value });
                }}
                value={product && product.type}
              />
              <br></br>
              <TextField
                id="product-commission"
                label="Product commission"
                placeholder="Product commission"
                multiline
                size="small"
                focused
                value={product && product.commission}
                onChange={(e) => {
                  setProduct({ ...product, commission: e.target.value });
                }}
                disabled={!Boolean(product)}
              />
              <br></br>
              <Button variant="outlined" component="label" size="medium">
                Change images
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  id="images"
                  multiple
                  disabled={!Boolean(product)}
                  webkitdirectory
                  onChange={(e) => {
                    setProgress(0);
                    setProduct({ ...product, images: e.target.files });
                  }}
                />
              </Button>
            </div>
          </Box>
          <br></br>

          {product && product.images ? (
            <>
              {" "}
              {product.images.length} image/images selected <br></br>
            </>
          ) : (
            <></>
          )}

          <br></br>
          <Stack>
            <Button
              variant="contained"
              onClick={updateProduct}
              disabled={!Boolean(product)}
            >
              Update Product
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

export default UpdateProduct;
