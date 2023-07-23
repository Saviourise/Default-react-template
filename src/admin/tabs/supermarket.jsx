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
import Slide from "@mui/material/Slide";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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
  const [whichName, setWhich] = useState("Restaurant");

  const [supermarketEdit, setSupermarketEdit] = useState(false);
  const [menuEdit, setMenuEdit] = useState(false);

  const [Supermarket, setSupermarket] = useState({
    name: "",
    file: "",
    description: "",
  });

  const [menuToDel, setMenuToDel] = useState({
    name: "",
    images: "",
    price: "",
    quantity: "",
    description: "",
    id: "",
  });

  const [menuToEdit, setMenuToEdit] = useState({
    name: "",
    images: "",
    price: "",
    quantity: "",
    description: "",
    id: "",
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

  const [supToDel, setSupToDel] = useState({
    name: "",
    file: "",
    position: "",
    location: "",
    openHour: "",
    closeHour: "",
    description: "",
  });

  const [supermarketToEdit, setSupermarketToEdit] = useState({
    _id: "",
    name: "",
    file: "",
    description: "",
  });

  const [progress, setProgress] = useState(0);
  const [openAlert, setOpenAlert] = useState(false);
  const [mess, setMess] = useState("");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [severity, setSeverity] = useState("success");

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

  const apiUrl = "https://a1api.onrender.com/api/";

  const editSupermarket = async () => {
    const formData = new FormData();
    for (let i in Supermarket) {
      formData.append(i, Supermarket[i]);
    }
    try {
      await axios
        .put(`${apiUrl}edit/supermarket/${Supermarket._id}`, formData)
        .then((data) => {
          setMess(data.data);
          handleClose2();
          handleClose();
          setSeverity("success");
          setOpenAlert(true);
          getSupermarketsData();
          setSupermarket({
            name: "",
            file: "",
            description: "",
          });
        })
        .catch((err) => {
          console.log(err);
          setMess("could not edit, please try again");
          setSeverity("error");
          setOpenAlert(true);
        });
    } catch (error) {
      setMess("Error in editing, please refresh the page");
      setSeverity("error");
      setOpenAlert(true);

      return;
    }
  };

  const editMenu = async () => {
    const data = new FormData();
    for (let i in item) {
      data.append(i, item[i]);
    }

    data.append("files", item.images);
    try {
      await axios
        .put(`${apiUrl}edit/item`, data)
        .then((data) => {
          setMess(data.data);
          setSeverity("success");
          setOpenAlert(true);
          getSupermarketsData();
          setItem({
            name: "",
            images: "",
            price: "",
            quantity: "",
            description: "",
          });
        })
        .catch((err) => {
          setMess("could not edit, please try again");
          setSeverity("error");
          setOpenAlert(true);
        });
    } catch (error) {
      setMess("Error in getting, please refresh the page");
      setSeverity("error");
      setOpenAlert(true);

      return;
    }
  };

  const getSupermarketsData = async () => {
    try {
      const data = await axios.get(apiUrl + "get/supermarket");
      if (data.data) {
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
                {supermarketEdit && (
                  <>
                    <FormControl size="small">
                      <InputLabel id="demo-simple-select-helper-label">
                        Select Supermarket to edit
                      </InputLabel>
                      <Select
                        labelId="demo-simple-helper-label"
                        id="demo-simple-helper"
                        value={supermarketToEdit.name ? supermarketToEdit : ""}
                        label={`Select Restaurant To Edit`}
                        onChange={(e) => {
                          setSupermarketToEdit(e.target.value);
                          setSupermarket({
                            ...Supermarket,
                            ...e.target.value,
                          });
                        }}
                        disabled={!Boolean(SupermarketsData)}
                      >
                        {SupermarketsData &&
                          SupermarketsData.map((Supermarket) => (
                            <MenuItem
                              key={Supermarket.name}
                              value={Supermarket}
                            >
                              {Supermarket.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                    <br />
                  </>
                )}
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
            {supermarketEdit && (
              <Stack>
                <Button variant="contained" onClick={editSupermarket}>
                  Save Supermarket
                </Button>
              </Stack>
            )}
            {!supermarketEdit && (
              <Stack>
                <Button variant="contained" onClick={uploadSupermarket}>
                  Add Supermarket
                </Button>
              </Stack>
            )}
            <br />
            <Stack>
              <Button
                variant="contained"
                onClick={() => {
                  setSupermarketEdit(!supermarketEdit);
                }}
              >
                {supermarketEdit ? "Upload" : "Edit"} Supermarket
              </Button>
            </Stack>
            <br></br>
            <Stack>
              <Button variant="contained" onClick={handleClickOpen}>
                Delete Supermarket
              </Button>
            </Stack>
            <br />
            <br />
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
                {menuEdit && (
                  <FormControl size="small">
                    <InputLabel id="demo-simple-select-helper-label">
                      Select Menu to edit
                    </InputLabel>
                    <Select
                      labelId="demo-simple-helper-label"
                      id="demo-simple-helper"
                      value={menuToEdit.name ? menuToEdit : ""}
                      label={`Select Item To Edit`}
                      onChange={(e) => {
                        setMenuToEdit(e.target.value);
                        setItem({
                          ...item,
                          ...e.target.value,
                          editedName: e.target.value.name,
                        });
                      }}
                      disabled={!Boolean(item.id)}
                    >
                      {item.id &&
                        SupermarketsData.filter((res) => {
                          return res._id === item.id;
                        })[0].items.map((menu) => (
                          <MenuItem key={menu.name} value={menu}>
                            {menu.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                )}
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
            {menuEdit && (
              <Stack>
                <Button variant="contained" onClick={editMenu}>
                  Save Item
                </Button>
              </Stack>
            )}
            {!menuEdit && (
              <Stack>
                <Button variant="contained" onClick={uploadItem}>
                  Add Item
                </Button>
              </Stack>
            )}

            <br />
            <Stack>
              <Button
                variant="contained"
                onClick={() => {
                  setMenuEdit(!menuEdit);
                }}
              >
                {menuEdit ? "Upload" : "Edit"} Item
              </Button>
            </Stack>
            <br />
            <Stack>
              <Button
                variant="contained"
                onClick={() => {
                  handleClickOpen();
                  setWhich("Menu");
                }}
              >
                Delete Item
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
              Delete a Supermarket
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => {
                if (supToDel) {
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
          <FormControl sx={{ width: 300 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Select Supermarket to delete
            </InputLabel>
            <Select
              labelId="demo-simple-helper-label"
              id="demo-simple-helper"
              value={supToDel.name ? supToDel : ""}
              label="Select Supermarket To Delete"
              onChange={(e) => {
                setSupToDel(e.target.value);
              }}
              disabled={!Boolean(SupermarketsData)}
            >
              {SupermarketsData &&
                SupermarketsData.map((supermarket) => (
                  <MenuItem key={supermarket._id} value={supermarket}>
                    {supermarket.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          {whichName === "Menu" && (
            <>
              <br></br>
              <br></br>
              <FormControl sx={{ width: 300 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Select Item to delete
                </InputLabel>
                <Select
                  labelId="demo-simple-helper-label"
                  id="demo-simple-helper"
                  value={menuToDel.name ? menuToDel : ""}
                  label={`Select ${whichName} To Delete ${
                    whichName === "Item" && "from"
                  }`}
                  onChange={(e) => {
                    setMenuToDel(e.target.value);
                  }}
                  disabled={!Boolean(supToDel.items)}
                >
                  {supToDel.items &&
                    supToDel.items.map((menu) => (
                      <MenuItem key={menu._id} value={menu}>
                        {menu.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </>
          )}
        </div>
      </Dialog>
      <Dialog
        open={open2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          `Delete{" "}
          {whichName === "Restaurant" ? supToDel?.name : menuToDel?.name}?`
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete this{" "}
            {whichName === "Restaurant" ? "supermarket" : "item"}? ?{" "}
            <b style={{ color: "red" }}>Note: This cannot be undone</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2}>Close</Button>
          <Button
            autoFocus
            onClick={async (e) => {
              e.target.innerHTML = "Deleting";

              try {
                await axios
                  .delete(
                    `${apiUrl}delete/${
                      whichName === "Restaurant" ? "supermarket" : "item"
                    }/${
                      whichName === "Restaurant" ? supToDel._id : menuToDel.name
                    }${whichName === "Menu" ? `/${supToDel._id}` : ""}`
                  )
                  .then((data) => {
                    setMess(data.data);
                    handleClose2();
                    handleClose();
                    setSeverity("success");
                    setOpenAlert(true);
                    getSupermarketsData();
                  })
                  .catch((err) => {
                    console.log(err);
                    setMess("could not delete supermarket, please try again");
                    setSeverity("error");
                    setOpenAlert(true);
                    e.target.innerHTML = "Delete";
                  });
              } catch (error) {
                setMess("Error in getting, please refresh the page");
                setSeverity("error");
                setOpenAlert(true);
                e.target.innerHTML = "Delete";

                return;
              }
            }}
          >
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

export default Supermarket;
