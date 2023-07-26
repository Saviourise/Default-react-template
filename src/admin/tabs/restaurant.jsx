import React, { useState, useRef } from "react";
import "./product.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { restaurants, menus } from "../data/api";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import Select from "@mui/material/Select";
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

const Restaurant = () => {
  const box = useRef(null);

  const [restaurantsData, setRestaurantsData] = useState([]);
  const [whichName, setWhich] = useState("Restaurant");

  const [type, setType] = useState("restaurant");
  const [menuEdit, setMenuEdit] = useState(false);
  const [restaurantEdit, setRestaurantEdit] = useState(false);

  const [restaurant, setRestaurant] = useState({
    name: "",
    file: "",
    position: "",
    location: "",
    openHour: "",
    closeHour: "",
    description: "",
    menu: [],
    open: false,
  });

  const [resToDel, setResToDel] = useState({
    name: "",
    file: "",
    position: "",
    location: "",
    openHour: "",
    closeHour: "",
    description: "",
  });

  const [restaurantToEdit, setRestaurantToEdit] = useState({
    _id: "",
    name: "",
    file: "",
    position: "",
    location: "",
    openHour: "",
    closeHour: "",
    description: "",
    open: false,
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

  const [menu, setMenu] = useState({
    name: "",
    editedName: "",
    images: "",
    price: "",
    quantity: "",
    description: "",
    id: "",
  });

  const [menuError, setMenuError] = useState({
    nameError: "",
    imagesError: "",
    priceError: "",
    quantityError: "",
    descriptionError: "",
    idError: "",
  });

  const [error, setError] = useState({
    nameError: false,
    locationError: false,
    descriptionError: false,
    openHourError: false,
    closeError: false,
    fileError: false,
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

  const editRestaurant = async () => {
    const formData = new FormData();
    for (let i in restaurant) {
      formData.append(i, restaurant[i]);
    }
    try {
      await axios
        .put(`${apiUrl}edit/restaurant/${restaurant._id}`, formData)
        .then((data) => {
          setMess(data.data);
          handleClose2();
          handleClose();
          setSeverity("success");
          setOpenAlert(true);
          getRestaurantsData();
          setRestaurant({
            name: "",
            file: "",
            position: "",
            location: "",
            openHour: "",
            closeHour: "",
            description: "",
            menu: [],
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
    for (let i in menu) {
      data.append(i, menu[i]);
    }

    data.append("files", menu.files);
    try {
      await axios
        .put(`${apiUrl}edit/menu`, data)
        .then((data) => {
          setMess(data.data);
          setSeverity("success");
          setOpenAlert(true);
          getRestaurantsData();
          setMenu({
            name: "",
            editedName: "",
            images: "",
            price: "",
            quantity: "",
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
      setMess("Error in getting, please refresh the page");
      setSeverity("error");
      setOpenAlert(true);

      return;
    }
  };

  const getRestaurantsData = async () => {
    try {
      const data = await axios.get(apiUrl + "get/restaurant");
      if (data.data) {
        setRestaurantsData(data.data);
      } else {
        setMess("Error in getting restaurants, please refresh the page");
        setSeverity("error");
        setOpenAlert(true);

        return;
      }
    } catch (error) {
      setMess("Error in getting restaurants, please refresh the page");
      setSeverity("error");
      setOpenAlert(true);

      return;
    }
  };

  React.useEffect(() => {
    getRestaurantsData();
  }, []);

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const handleChange = (event, type) => {
    setRestaurant({ ...restaurant, [type]: event });
  };

  const handleChangeMenu = (event, type) => {
    setMenu({ ...menu, [type]: event });
  };

  const uploadMenu = async () => {
    console.log(menu);
    for (let item in menu) {
      if (menu[item] === "" && item !== "editedName") {
        setError({ ...error, [item + "Error"]: true });
        return;
      }
    }

    const formData = new FormData();

    for (let item in menu) {
      formData.append(item, menu[item]);
    }

    for (let i = 0; i < menu.images.length; i++) {
      formData.append("files", menu.images[i]);
    }

    await menus(formData, singleFileOptions)
      .then((data) => {
        for (let item in menu) {
          setMenu({ ...menu, [item]: "" });
        }
        for (let item in menuError) {
          setError({ ...error, [item]: false });
        }
        setMess("Menu Created Successfully");
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

  const uploadRestaurant = async () => {
    for (let item in restaurant) {
      if (restaurant[item] === "" && item !== "position") {
        setError({ ...error, [item + "Error"]: true });
        return;
      }
    }

    const formData = new FormData();

    for (let item in restaurant) {
      formData.append(item, restaurant[item]);
    }

    await restaurants(formData, singleFileOptions)
      .then((data) => {
        for (let item in restaurant) {
          setRestaurant({ ...restaurant, [item]: "" });
        }
        for (let item in error) {
          setError({ ...error, [item]: false });
        }
        setMess("Restaurant Created Successfully");
        setOpenAlert(true);
        setSeverity("success");
      })
      .catch((error) => {
        for (let item in error) {
          setError({ ...error, [item]: false });
        }
        console.log(error);
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
              type === "restaurant" ? setType("menu") : setType("restaurant");
            }}
          >
            Upload {type === "restaurant" ? "Menu" : "Restaurant"} instead
          </Button>
        </Stack>
        <br />
        {type === "restaurant" ? (
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
                Add a Restaurant
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {restaurantEdit && (
                  <>
                    <FormControl size="small">
                      <InputLabel id="demo-simple-select-helper-label">
                        Select Restaurant to edit
                      </InputLabel>
                      <Select
                        labelId="demo-simple-helper-label"
                        id="demo-simple-helper"
                        value={restaurantToEdit.name ? restaurantToEdit : ""}
                        label={`Select Restaurant To Edit`}
                        onChange={(e) => {
                          setRestaurantToEdit(e.target.value);
                          setRestaurant({
                            ...restaurant,
                            ...e.target.value,
                          });
                        }}
                        disabled={!Boolean(restaurantsData)}
                      >
                        {restaurantsData &&
                          restaurantsData.map((restaurant) => (
                            <MenuItem key={restaurant.name} value={restaurant}>
                              {restaurant.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                    <br />
                  </>
                )}
                <TextField
                  id="restaurant-name"
                  label="Restaurant name"
                  placeholder="Restaurant name"
                  multiline
                  size="small"
                  value={restaurant.name}
                  required
                  onChange={(e) => handleChange(e.target.value, "name")}
                  error={error.nameError}
                />
                <br></br>
                <TextField
                  id="restaurant-description"
                  label="Restaurant description"
                  placeholder="Restaurant description"
                  multiline
                  size="small"
                  value={restaurant.description}
                  required
                  onChange={(e) => handleChange(e.target.value, "description")}
                  error={error.descriptionError}
                />
                <br></br>
                <FormControl size="small">
                  <InputLabel id="demo-simple-select-helper-label">
                    Restaurant Position
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={restaurant.position}
                    label="Restaurant position"
                    onChange={(e) => handleChange(e.target.value, "position")}
                  >
                    <MenuItem value={"1"}>1</MenuItem>
                    <MenuItem value={"2"}>2</MenuItem>
                    <MenuItem value={"3"}>3</MenuItem>
                    <MenuItem value={"4"}>4</MenuItem>
                    <MenuItem value={"5"}>5</MenuItem>
                  </Select>
                </FormControl>
                <br></br>
                <TextField
                  id="restaurant-location"
                  label="Restaurant location"
                  placeholder="Restaurant location"
                  multiline
                  size="small"
                  required
                  onChange={(e) => handleChange(e.target.value, "location")}
                  error={error.locationError}
                  value={restaurant.location}
                />
                <br></br>
                <TextField
                  id="restaurant-openHour"
                  label="Restaurant openHour"
                  placeholder="Restaurant openHour"
                  multiline
                  size="small"
                  value={restaurant.openHour}
                  onChange={(e) => handleChange(e.target.value, "openHour")}
                />
                <br></br>
                <TextField
                  id="restaurant-closeHour"
                  label="Restaurant closeHour"
                  placeholder="Restaurant closeHour"
                  multiline
                  size="small"
                  value={restaurant.closeHour}
                  onChange={(e) => handleChange(e.target.value, "closeHour")}
                />
                <br></br>
                {restaurantEdit && (
                  <>
                    <FormGroup>
                      <FormControlLabel
                        required
                        control={
                          <Checkbox
                            checked={restaurant.open}
                            onChange={(e) => {
                              handleChange(e.target.checked, "open");
                              console.log(e.target.checked);
                            }}
                          />
                        }
                        label="Restaurant is Open"
                      />
                    </FormGroup>
                    <br />
                  </>
                )}
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
            {restaurant.file && (
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

            <br></br>
            {restaurantEdit && (
              <Stack>
                <Button variant="contained" onClick={editRestaurant}>
                  Save Restaurant
                </Button>
              </Stack>
            )}
            {!restaurantEdit && (
              <Stack>
                <Button variant="contained" onClick={uploadRestaurant}>
                  Add Restaurant
                </Button>
              </Stack>
            )}
            <br />
            <Stack>
              <Button
                variant="contained"
                onClick={() => {
                  setRestaurantEdit(!restaurantEdit);
                }}
              >
                {restaurantEdit ? "Upload" : "Edit"} Restaurant
              </Button>
            </Stack>
            <br />
            <Stack>
              <Button
                variant="contained"
                onClick={() => {
                  handleClickOpen();
                  setWhich("Restaurant");
                }}
              >
                Delete Restaurant
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
                Add a Menu
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
                    Select Restaurant to add a menu
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={menu.id ? menu.id : ""}
                    label="Select Restaurant To Add A Menu"
                    onChange={(e) => {
                      handleChangeMenu(e.target.value, "id");
                    }}
                    disabled={!Boolean(restaurantsData)}
                  >
                    {restaurantsData &&
                      restaurantsData.map((restaurant) => (
                        <MenuItem key={restaurant._id} value={restaurant._id}>
                          {restaurant.name}
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
                      label={`Select Menu To Edit`}
                      onChange={(e) => {
                        setMenuToEdit(e.target.value);
                        setMenu({
                          ...menu,
                          ...e.target.value,
                          editedName: e.target.value.name,
                        });
                      }}
                      disabled={!Boolean(menu.id)}
                    >
                      {menu.id &&
                        restaurantsData
                          .filter((res) => {
                            return res._id === menu.id;
                          })[0]
                          .menu.map((menu) => (
                            <MenuItem key={menu.name} value={menu}>
                              {menu.name}
                            </MenuItem>
                          ))}
                    </Select>
                  </FormControl>
                )}
                <br />
                <TextField
                  id="menu-name"
                  label="Menu name"
                  placeholder="Menu name"
                  multiline
                  size="small"
                  value={menu.name}
                  required
                  onChange={(e) => handleChangeMenu(e.target.value, "name")}
                  error={menuError.nameError}
                />
                <br />
                <TextField
                  id="menu-description"
                  label="Menu description"
                  placeholder="Menu description"
                  multiline
                  size="small"
                  value={menu.description}
                  required
                  onChange={(e) =>
                    handleChangeMenu(e.target.value, "description")
                  }
                  error={menuError.descriptionError}
                />
                <br />

                <TextField
                  id="menu-price"
                  label="Menu price"
                  placeholder="Menu price"
                  multiline
                  size="small"
                  value={menu.price}
                  required
                  onChange={(e) => handleChangeMenu(e.target.value, "price")}
                  error={menuError.priceError}
                />
                <br />

                <TextField
                  id="menu-quantity"
                  label="Menu quantity"
                  placeholder="Menu quantity"
                  multiline
                  size="small"
                  value={menu.quantity}
                  required
                  onChange={(e) => handleChangeMenu(e.target.value, "quantity")}
                  error={menuError.quantityError}
                />

                <br></br>
                <Button
                  variant="outlined"
                  component="label"
                  size="medium"
                  color={menuError.imagesError ? "error" : "primary"}
                >
                  Select menu Images*
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    id="images"
                    webkitdirectory
                    multiple
                    onChange={(e) => {
                      setProgress(0);
                      handleChangeMenu(
                        e.target.files,
                        `${menuEdit ? "files" : "images"}`
                      );
                    }}
                  />
                </Button>
              </div>
            </Box>
            <br></br>
            {menu.images.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {menu.images.length} menu images selected
              </div>
            )}
            <br />
            <br />
            {menuEdit && (
              <Stack>
                <Button variant="contained" onClick={editMenu}>
                  Save Menu
                </Button>
              </Stack>
            )}
            {!menuEdit && (
              <Stack>
                <Button variant="contained" onClick={uploadMenu}>
                  Add Menu
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
                {menuEdit ? "Upload" : "Edit"} Menu
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
                Delete Menu
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
              Delete a {whichName}
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => {
                if (whichName === "Menu" && menuToDel) {
                  return handleClickOpen2();
                }
                if (whichName === "Restaurant" && resToDel) {
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
              Select Restaurant to delete {whichName === "Menu" && "from"}
            </InputLabel>
            <Select
              labelId="demo-simple-helper-label"
              id="demo-simple-helper"
              value={resToDel.name ? resToDel : ""}
              label={`Select ${whichName} To Delete ${
                whichName === "Menu" && "from"
              }`}
              onChange={(e) => {
                setResToDel(e.target.value);
              }}
              disabled={!Boolean(restaurantsData)}
            >
              {restaurantsData &&
                restaurantsData.map((restaurant) => (
                  <MenuItem key={restaurant._id} value={restaurant}>
                    {restaurant.name}
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
                  Select Menu to delete
                </InputLabel>
                <Select
                  labelId="demo-simple-helper-label"
                  id="demo-simple-helper"
                  value={menuToDel.name ? menuToDel : ""}
                  label={`Select ${whichName} To Delete ${
                    whichName === "Menu" && "from"
                  }`}
                  onChange={(e) => {
                    setMenuToDel(e.target.value);
                  }}
                  disabled={!Boolean(resToDel.menu)}
                >
                  {resToDel.menu &&
                    resToDel.menu.map((menu) => (
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
        <DialogTitle id="alert-dialog-title">{`Delete ${
          whichName === "Restaurant" ? resToDel?.name : menuToDel?.name
        }?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete this{" "}
            {whichName === "Restaurant" ? "restaurant" : "menu"}?{" "}
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
                      whichName === "Restaurant" ? "restaurant" : "menu"
                    }/${
                      whichName === "Restaurant" ? resToDel._id : menuToDel.name
                    }${whichName === "Menu" ? `/${resToDel._id}` : ""}`
                  )
                  .then((data) => {
                    setMess(data.data);
                    handleClose2();
                    handleClose();
                    setSeverity("success");
                    setOpenAlert(true);
                    getRestaurantsData();
                  })
                  .catch((err) => {
                    setMess("could not delete, please try again");
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

export default Restaurant;
