import React from "react";
import {
  Button,
  LinearProgress,
  Snackbar,
  Stack,
  Box,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
  Slide,
  AppBar,
  Toolbar,
  IconButton,
  FormControl,
} from "@mui/material";
import PropTypes from "prop-types";
import LoadingButton from "@mui/lab/LoadingButton";
import MuiAlert from "@mui/material/Alert";
import { addAds, removeAds } from "../data/api";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";

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

const apiUrl = "https://a1api.onrender.com/";

const Ads = () => {
  const [formData, setFormData] = React.useState({
    description: "",
    file: [],
  });
  const box = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [alert, setAlert] = React.useState({
    open: false,
    message: "",
    severity: "",
  });
  const [ads, setAds] = React.useState(null);
  const [adId, setAdId] = React.useState("");
  const [adPage, setAdPage] = React.useState("upload");

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ ...alert, open: false });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const upload = async () => {
    setLoading(true);
    if (formData.description === "" || formData.file.length === 0) {
      setAlert({
        open: true,
        message: "Please fill all the fields",
        severity: "error",
      });
      return setLoading(false);
    }

    const adsData = new FormData();

    adsData.append("files", formData.file[0]);
    adsData.append("description", formData.description);

    await addAds(adsData)
      .then((data) => {
        setAlert({
          open: true,
          message: "Ads added successfully",
          severity: "success",
        });
        setFormData({
          description: "",
          file: [],
        });
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: "Something went wrong",
          severity: "error",
        });
      });
    setLoading(false);
  };

  const delAd = async () => {
    await removeAds(adId._id)
      .then((data) => {
        setAlert({
          open: true,
          message: "Ads deleted successfully",
          severity: "success",
        });

        setAdId(null);
        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: "Something went wrong",
          severity: "error",
        });
      });
  };

  const getAds = async () => {
    try {
      const data = await axios.get(apiUrl + "ads");
      if (data.data) {
        setAds(data.data);
      } else {
        setAlert({
          open: true,
          message: "Something went wrong while fetching ads, please refresh",
          severity: "error",
        });

        return;
      }
    } catch (error) {
      setAlert({
        open: true,
        message: "Something went wrong while fetching ads, please refresh",
        severity: "error",
      });

      return;
    }
  };

  React.useEffect(() => {
    getAds();
  }, []);

  return (
    <div>
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h3>Upload an Ad</h3>
          <br></br>
          <br></br>

          <TextField
            id="outlined-multiline-static"
            label="Ads description"
            multiline
            rows={6}
            required
            placeholder="Ads description"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            value={formData.description}
          />

          <br></br>
          <br></br>

          <Button variant="outlined" component="label" size="large">
            Select image*
            <input
              type="file"
              hidden
              accept="image/*"
              id="images"
              webkitdirectory
              onChange={(e) => {
                setFormData({ ...formData, file: e.target.files });
              }}
            />
          </Button>

          <br></br>

          <>{formData.file.length} image/images selected</>

          <br></br>
          <br></br>

          <LoadingButton
            variant="contained"
            component="label"
            size="large"
            color={"primary"}
            loading={loading}
            onClick={() => upload()}
          >
            Upload
          </LoadingButton>

          <br></br>

          <Button
            variant="contained"
            component="label"
            size="large"
            color={"primary"}
            onClick={handleClickOpen}
          >
            Remove Ad
          </Button>

          <Stack spacing={2} sx={{ width: "100%" }}>
            <Snackbar
              open={alert.open}
              autoHideDuration={6000}
              onClose={handleCloseAlert}
            >
              <Alert
                onClose={handleCloseAlert}
                severity={alert.severity}
                sx={{ width: "100%" }}
              >
                {alert.message}
              </Alert>
            </Snackbar>
          </Stack>

          <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
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
              <DialogTitle id="alert-dialog-title">Delete an Ad</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <FormControl sx={{ width: 300 }}>
                    <Select
                      labelId="demo-simple-helper-label"
                      id="demo-simple-helper"
                      value={adId ? adId : ""}
                      label={`Select Ad to delete`}
                      onChange={(e) => {
                        setAdId(e.target.value);
                      }}
                      disabled={!Boolean(ads)}
                    >
                      {ads &&
                        ads.map((ad) => (
                          <MenuItem key={ad._id} value={ad}>
                            {ad.description}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                <Button onClick={delAd} autoFocus>
                  Delete
                </Button>
              </DialogActions>
            </div>
          </Dialog>
        </div>
      </Box>
    </div>
  );
};

export default Ads;
