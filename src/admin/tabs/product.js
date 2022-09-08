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
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

const Products = () => {
  const box = useRef(null);
  const [name, setName] = useState("");
  const [delName, setDelName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [specs, setSpecs] = useState("");
  const [categ, setCateg] = useState("");
  const [comm, setComm] = useState("");
  const [progress, setProgress] = useState(0);
  const [type, setType] = useState("");
  const [negotiable, setNegotiable] = useState("");
  const [nameError, setNameError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [specError, setSpecError] = useState(false);
  const [typeError, setTypeError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [mess, setMess] = useState("");
  const [severity, setSeverity] = useState("success");
  const [listItems, setListItems] = useState([]);
  const [listItemName, setListItemName] = useState("");
  const [listItemPrice, setListItemPrice] = useState("");
  const [listItemQuantity, setListItemQuantity] = useState("");
  const [commoditiesListName, setCommoditiesListName] = useState("");
  const [commoditiesList, setCommoditiesList] = useState([]);
  const [commoditiesListPriceOneCup, setCommoditiesListPriceOneCup] = useState(
    ""
  );
  const [
    commoditiesListPriceHalfBasket,
    setCommoditiesListPriceHalfBasket,
  ] = useState("");
  const [
    commoditiesListPriceOneBlackRubber,
    setCommoditiesListPriceOneBlackRubber,
  ] = useState("");
  const [
    commoditiesListPriceOnePaintRubber,
    setCommoditiesListPriceOnePaintRubber,
  ] = useState("");
  const [
    commoditiesListPriceSpecialPack,
    setCommoditiesListPriceSpecialPack,
  ] = useState("");
  const [frozenListName, setFrozenListName] = useState("");
  const [frozenList, setFrozenList] = useState([]);
  const [frozenListPriceOneKilo, setFrozenListPriceOneKilo] = useState("");
  const [frozenListPriceHalfKilo, setFrozenListPriceHalfKilo] = useState("");
  const [frozenListPriceOneKilo3, setFrozenListPriceOneKilo3] = useState("");
  const [frozenListPriceOneKilo4, setFrozenListPriceOneKilo4] = useState("");
  const [oilListName, setOilListName] = useState("");
  const [oilList, setOilList] = useState([]);
  const [oilListOneCup, setOilListOneCup] = useState("");
  const [oilListOneLiter, setOilListOneLiter] = useState("");
  const [oilListThreeLiters, setOilListThreeLiters] = useState("");
  const [oilListTenLiters, setOilListTenLiters] = useState("");

  const addListItem = () => {
    if (
      listItemName !== "" &&
      listItemPrice !== "" &&
      listItemQuantity !== ""
    ) {
      let arr = listItems;
      arr.push({
        name: listItemName,
        price: listItemPrice,
        quantity: listItemQuantity,
      });
      setListItems(arr);
      setListItemName("");
      setListItemPrice("");
      setListItemQuantity("");
      console.log(arr);
    } else {
      console.log("error");
    }
  };

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

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const handleChangeNegotiable = (event) => {
    setNegotiable(event.target.value);
  };

  const addCommoditiesList = () => {
    if (
      commoditiesListName !== "" &&
      commoditiesListPriceOneCup !== "" &&
      commoditiesListPriceOnePaintRubber !== "" &&
      commoditiesListPriceHalfBasket !== "" &&
      commoditiesListPriceOneBlackRubber !== "" &&
      commoditiesListPriceSpecialPack !== ""
    ) {
      let arr = commoditiesList;
      arr.push({
        name: commoditiesListName,
        priceOneCup: commoditiesListPriceOneCup,
        priceOnePaintRubber: commoditiesListPriceOnePaintRubber,
        priceOneBlackRubber: commoditiesListPriceOneBlackRubber,
        priceHalfbasket: commoditiesListPriceHalfBasket,
        priceSpecialPack: commoditiesListPriceSpecialPack,
      });
      setCommoditiesList(arr);
      setListItems(arr);
      setCommoditiesListName("");
      setCommoditiesListPriceHalfBasket("");
      setCommoditiesListPriceOneBlackRubber("");
      setCommoditiesListPriceOneCup("");
      setCommoditiesListPriceOnePaintRubber("");
      setCommoditiesListPriceSpecialPack("");
      // console.log(arr);
    } else {
      console.log("error");
    }
  };

  const addOilList = () => {
    if (
      oilListName !== "" &&
      oilListOneCup !== "" &&
      oilListOneLiter !== "" &&
      oilListThreeLiters !== "" &&
      oilListTenLiters !== ""
    ) {
      let arr = commoditiesList;
      arr.push({
        name: oilListName,
        priceOneCup: oilListOneCup,
        priceOneLiter: oilListOneLiter,
        priceThreeLiters: oilListThreeLiters,
        priceTenLiters: oilListTenLiters,
      });
      setOilList(arr);
      setListItems(arr);
      setOilListName("");
      setOilListOneCup("");
      setOilListOneLiter("");
      setOilListThreeLiters("");
      setOilListTenLiters("");
      // console.log(arr);
    } else {
      console.log("error");
    }
  };

  const addFrozenList = () => {
    if (
      frozenListName !== "" &&
      frozenListPriceOneKilo !== "" &&
      frozenListPriceHalfKilo !== "" &&
      frozenListPriceOneKilo3 !== "" &&
      frozenListPriceOneKilo4 !== ""
    ) {
      let arr = commoditiesList;
      arr.push({
        name: frozenListName,
        priceOneKilo: frozenListPriceOneKilo,
        priceOneHalfKilo: frozenListPriceHalfKilo,
        priceOneKilo3: frozenListPriceOneKilo3,
        priceOneKilo4: frozenListPriceOneKilo4,
      });
      setFrozenList(arr);
      setListItems(arr);
      setFrozenListName("");
      setFrozenListPriceOneKilo("");
      setFrozenListPriceHalfKilo("");
      setFrozenListPriceOneKilo3("");
      setFrozenListPriceOneKilo4("");
      // console.log(arr);
    } else {
      console.log("error");
    }
  };

  const uploadProduct = async () => {
    if (name === "") {
      return setNameError(true);
    }
    if (price === "") {
      return setPriceError(true);
    }
    if (specs === "") {
      return setSpecError(true);
    }
    if (type === "") {
      return setTypeError(true);
    }
    if (image === "") {
      return setImageError(true);
    }
    const formData = new FormData();
    for (let i = 0; i < image.length; i++) {
      formData.append("files", image[i]);
    }
    formData.append("name", name);
    formData.append("category", categ);
    formData.append("price", price);
    formData.append("commission", comm);
    formData.append("specs", specs);
    formData.append("type", type);
    formData.append("negotiable", negotiable);
    formData.append("listItems", JSON.stringify(listItems));
    console.log(listItems);
    await products(formData, singleFileOptions)
      .then((data) => {
        setCateg("");
        setType("");
        setTypeError(false);
        setName("");
        setListItems([]);
        setNameError(false);
        setPrice("");
        setPriceError(false);
        setComm("");
        setImage("");
        setImageError(false);
        setSpecs("");
        setSpecError(false);
        setCommoditiesList([]);
        setFrozenList([]);
        setOilList([]);
        setMess("Product Created Successfully");
        setOpenAlert(true);
        setSeverity("success");
      })
      .catch((error) => {
        //console.log( error );
        setTypeError(false);
        setNameError(false);
        setPriceError(false);
        setImageError(false);
        setSpecError(false);
        //console.log(error)
        setMess(error.message);
        setOpenAlert(true);
        setSeverity("error");
      });
    // setCateg("");
    // setType("");
    // setTypeError(false);
    // setName("");
    // setNameError(false);
    // setPrice("");
    // setPriceError(false);
    // setComm("");
    // setImage("");
    // setImageError(false);
    // setSpecs("");
    // setSpecError(false);
  };

  const singleFileOptions = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percentage = Math.ceil(((loaded / 1000) * 100) / (total / 1000));
      setProgress(percentage);
    },
  };

  const delProduct = async () => {
    // const formData = new FormData();
    // formData.append("name", delName);

    // const formData = {
    //   name: delName,
    // };
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
    // setDelName("");
    // setMess("Product deleted successfully");
    // setOpenAlert(true);
    // handleClose();
    // handleClose2();
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
                required
                onChange={(e) => setName(e.target.value)}
                error={nameError}
                value={name}
              />
              <br></br>
              <TextField
                id="product-price"
                label="Product price"
                placeholder="Product price"
                multiline
                size="small"
                required
                onChange={(e) => setPrice(e.target.value)}
                error={priceError}
                value={price}
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
                  value={negotiable}
                  label="Product type"
                  onChange={handleChangeNegotiable}
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
                onChange={(e) => setSpecs(e.target.value)}
                error={specError}
                value={specs}
              />
              <br></br>
              <FormControl size="small" required error={typeError}>
                <InputLabel id="demo-simple-select-helper-label">
                  Product type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={type}
                  label="Product type"
                  onChange={handleChangeType}
                >
                  <MenuItem value={"electronic"}>Electronic</MenuItem>
                  <MenuItem value={"grocery"}>Grocery</MenuItem>
                </Select>
              </FormControl>

              <br></br>
              <FormControl size="small" required error={typeError}>
                <InputLabel id="product-category">Product category</InputLabel>

                {type === "electronic" ? (
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={categ}
                    label="Product type"
                    onChange={(e) => setCateg(e.target.value)}
                    disabled={type === "" ? true : false}
                  >
                    <MenuItem value={"laptop"}>Laptop</MenuItem>
                    <MenuItem value={"accessory"}>Laptop accessory</MenuItem>
                    <MenuItem value={"gamePad"}>Game pad</MenuItem>
                    <MenuItem value={"parts"}>Laptop Parts</MenuItem>
                    <MenuItem value={"exclusive"}>Exclusive Deals</MenuItem>
                  </Select>
                ) : (
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={categ}
                    label="Product type"
                    onChange={(e) => setCateg(e.target.value)}
                    disabled={type === "" ? true : false}
                  >
                    <MenuItem value={"spice"}>Spices</MenuItem>
                    <MenuItem value={"vegetables"}>Vegetables</MenuItem>
                    <MenuItem value={"commodities"}>Commodities</MenuItem>
                    <MenuItem value={"beverages"}>Beverages</MenuItem>
                    <MenuItem value={"frozen"}>Frozen Food</MenuItem>
                    <MenuItem value={"oil"}>Cooking Oil</MenuItem>
                    <MenuItem value={"listItem"}>List item</MenuItem>
                    <MenuItem value={"commoditiesList"}>
                      Commodities list
                    </MenuItem>
                    <MenuItem value={"frozenList"}>Frozen Food list</MenuItem>
                    <MenuItem value={"oilList"}>Oil list</MenuItem>
                  </Select>
                )}
              </FormControl>
              {categ === "listItem" ? (
                <>
                  <br></br>
                  <h3>List Items</h3>
                  <br></br>
                  {listItems.map((item, index) => {
                    return (
                      <>
                        <p key={index}>
                          {item.name}: ₦{item.price} for {item.quantity}
                        </p>
                        <br></br>
                      </>
                    );
                  })}
                  <br></br>
                  <h3>Enter the list items</h3>
                  <div>
                    <TextField
                      label="Item name"
                      id="filled-start-adornment"
                      size="small"
                      variant="outlined"
                      value={listItemName}
                      onChange={(e) => setListItemName(e.target.value)}
                    />
                    <br></br>
                    <br></br>
                    <TextField
                      label="Price"
                      id="filled-start-adornment"
                      size="small"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">₦</InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      value={listItemPrice}
                      onChange={(e) => setListItemPrice(e.target.value)}
                    />
                    <br></br>
                    <br></br>
                    <TextField
                      label="Quantity"
                      id="filled-start-adornment"
                      size="small"
                      variant="outlined"
                      value={listItemQuantity}
                      onChange={(e) => setListItemQuantity(e.target.value)}
                    />
                    <br></br>
                    <br></br>
                    <Stack>
                      <Button variant="contained" onClick={addListItem}>
                        Add Item to list
                      </Button>
                    </Stack>
                  </div>
                </>
              ) : (
                <></>
              )}

              {categ === "commoditiesList" ? (
                <>
                  <br></br>
                  <h3>Commodities List</h3>
                  <br></br>
                  {commoditiesList.map((item, index) => {
                    return (
                      <>
                        <p key={index}>{item.name}</p>
                        <br></br>
                      </>
                    );
                  })}
                  <br></br>
                  <h3>Enter the list items</h3>
                  <div>
                    <TextField
                      label="Item name"
                      id="filled-start-adornment"
                      size="small"
                      variant="outlined"
                      value={commoditiesListName}
                      onChange={(e) => setCommoditiesListName(e.target.value)}
                    />
                    <br></br>
                    <br></br>
                    <TextField
                      label="Price for one cup"
                      id="filled-start-adornment"
                      size="small"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">₦</InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      value={commoditiesListPriceOneCup}
                      onChange={(e) =>
                        setCommoditiesListPriceOneCup(e.target.value)
                      }
                    />
                    <br></br>
                    <br></br>
                    <TextField
                      label="Price for half basket/big tomato tin"
                      id="filled-start-adornment"
                      size="small"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">₦</InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      value={commoditiesListPriceHalfBasket}
                      onChange={(e) =>
                        setCommoditiesListPriceHalfBasket(e.target.value)
                      }
                    />
                    <br></br>
                    <br></br>
                    <TextField
                      label="Price for one paint rubber"
                      id="filled-start-adornment"
                      size="small"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">₦</InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      value={commoditiesListPriceOnePaintRubber}
                      onChange={(e) =>
                        setCommoditiesListPriceOnePaintRubber(e.target.value)
                      }
                    />
                    <br></br>
                    <br></br>
                    <TextField
                      label="Price for one black rubber"
                      id="filled-start-adornment"
                      size="small"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">₦</InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      value={commoditiesListPriceOneBlackRubber}
                      onChange={(e) =>
                        setCommoditiesListPriceOneBlackRubber(e.target.value)
                      }
                    />
                    <br></br>
                    <br></br>
                    <TextField
                      label="Price for special pack"
                      id="filled-start-adornment"
                      size="small"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">₦</InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      value={commoditiesListPriceSpecialPack}
                      onChange={(e) =>
                        setCommoditiesListPriceSpecialPack(e.target.value)
                      }
                    />
                    <br></br>
                    <br></br>
                    <Stack>
                      <Button variant="contained" onClick={addCommoditiesList}>
                        Add Item to list
                      </Button>
                    </Stack>
                  </div>
                </>
              ) : (
                <></>
              )}

              {categ === "frozenList" ? (
                <>
                  <br></br>
                  <h3>Frozen Foods List</h3>
                  <br></br>
                  {frozenList.map((item, index) => {
                    return (
                      <>
                        <p key={index}>{item.name}</p>
                        <br></br>
                      </>
                    );
                  })}
                  <br></br>
                  <h3>Enter the list items</h3>
                  <div>
                    <TextField
                      label="Item name"
                      id="filled-start-adornment"
                      size="small"
                      variant="outlined"
                      value={frozenListName}
                      onChange={(e) => setFrozenListName(e.target.value)}
                    />
                    <br></br>
                    <br></br>
                    <TextField
                      label="Price for one kilo"
                      id="filled-start-adornment"
                      size="small"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">₦</InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      value={frozenListPriceOneKilo}
                      onChange={(e) =>
                        setFrozenListPriceOneKilo(e.target.value)
                      }
                    />
                    <br></br>
                    <br></br>
                    <TextField
                      label="Price for half kilo"
                      id="filled-start-adornment"
                      size="small"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">₦</InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      value={frozenListPriceHalfKilo}
                      onChange={(e) =>
                        setFrozenListPriceHalfKilo(e.target.value)
                      }
                    />
                    <br></br>
                    <br></br>
                    <TextField
                      label="Price for one kilo"
                      id="filled-start-adornment"
                      size="small"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">₦</InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      value={frozenListPriceOneKilo3}
                      onChange={(e) =>
                        setFrozenListPriceOneKilo3(e.target.value)
                      }
                    />
                    <br></br>
                    <br></br>
                    <TextField
                      label="Price for one kilo"
                      id="filled-start-adornment"
                      size="small"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">₦</InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      value={frozenListPriceOneKilo4}
                      onChange={(e) =>
                        setFrozenListPriceOneKilo4(e.target.value)
                      }
                    />
                    <br></br>
                    <br></br>
                    <Stack>
                      <Button variant="contained" onClick={addFrozenList}>
                        Add Item to list
                      </Button>
                    </Stack>
                  </div>
                </>
              ) : (
                <></>
              )}

              {categ === "oilList" ? (
                <>
                  <br></br>
                  <h3>Oil List</h3>
                  <br></br>
                  {oilList.map((item, index) => {
                    return (
                      <>
                        <p key={index}>{item.name}</p>
                        <br></br>
                      </>
                    );
                  })}
                  <br></br>
                  <h3>Enter the list items</h3>
                  <div>
                    <TextField
                      label="Item name"
                      id="filled-start-adornment"
                      size="small"
                      variant="outlined"
                      value={oilListName}
                      onChange={(e) => setOilListName(e.target.value)}
                    />
                    <br></br>
                    <br></br>
                    <TextField
                      label="Price for one cup"
                      id="filled-start-adornment"
                      size="small"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">₦</InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      value={oilListOneCup}
                      onChange={(e) => setOilListOneCup(e.target.value)}
                    />
                    <br></br>
                    <br></br>
                    <TextField
                      label="Price for One Liter"
                      id="filled-start-adornment"
                      size="small"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">₦</InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      value={oilListOneLiter}
                      onChange={(e) => setOilListOneLiter(e.target.value)}
                    />
                    <br></br>
                    <br></br>
                    <TextField
                      label="Price for three liters"
                      id="filled-start-adornment"
                      size="small"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">₦</InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      value={oilListThreeLiters}
                      onChange={(e) => setOilListThreeLiters(e.target.value)}
                    />
                    <br></br>
                    <br></br>
                    <TextField
                      label="Price for ten liters"
                      id="filled-start-adornment"
                      size="small"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">₦</InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      value={oilListTenLiters}
                      onChange={(e) => setOilListTenLiters(e.target.value)}
                    />
                    <br></br>
                    <br></br>
                    <Stack>
                      <Button variant="contained" onClick={addOilList}>
                        Add Item to list
                      </Button>
                    </Stack>
                  </div>
                </>
              ) : (
                <></>
              )}

              <br></br>
              <TextField
                id="product-commission"
                label="Product commission"
                placeholder="Product commission"
                multiline
                size="small"
                value={comm}
                onChange={(e) => setComm(e.target.value)}
              />
              <br></br>
              <Button
                variant="outlined"
                component="label"
                size="medium"
                color={imageError ? "error" : "primary"}
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
                    setImage(e.target.files);
                  }}
                />
              </Button>
            </div>
          </Box>
          <br></br>

          {image !== "" ? (
            <>
              {" "}
              {image.length} image/images selected <br></br>
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
