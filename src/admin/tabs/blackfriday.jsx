import React from "react";
import { Checkbox, FormControlLabel, Stack, Snackbar } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import MuiAlert from "@mui/material/Alert";
import { changeBlackFriday } from "../data/api";
import axios from "axios";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const apiUrl = "https://a1api.onrender.com/";

const blackfriday = () => {
  const [isChecked1, setIsChecked1] = React.useState(false);
  const [isChecked2, setIsChecked2] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleChange1 = (event) => {
    setIsChecked1(event.target.checked);
  };

  const handleChange2 = (event) => {
    setIsChecked2(event.target.checked);
  };

  const handleSave = async () => {
    setLoading(true);

    const blackfridayData = {
      blackfriday: isChecked1,
      marketday: isChecked2,
    };

    await changeBlackFriday(blackfridayData)
      .then((data) => {
        setAlert({
          open: true,
          message: "Changed successfully",
          severity: "success",
        });
        console.log(data);
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

  const [alert, setAlert] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ ...alert, open: false });
  };

  const getBlackFriday = async () => {
    try {
      const data = await axios.get(apiUrl + "blackfriday");
      if (data.data) {
        if (data.data.length === 0) return;

        console.log(data.data);

        setIsChecked1(data.data[0].blackfriday);
        setIsChecked2(data.data[0].marketday);
      } else {
        setAlert({
          open: true,
          message: "Something went wrong while fetching data, please refresh",
          severity: "error",
        });

        return;
      }
    } catch (error) {
      setAlert({
        open: true,
        message: "Something went wrong while fetching data, please refresh",
        severity: "error",
      });

      return;
    }
  };

  React.useEffect(() => {
    getBlackFriday();
  }, []);
  return (
    <div>
      <FormControlLabel
        label="Black Friday"
        control={<Checkbox checked={isChecked1} onChange={handleChange1} />}
      />
      <br />
      <FormControlLabel
        label="Market Day"
        control={<Checkbox checked={isChecked2} onChange={handleChange2} />}
      />

      <br />
      <LoadingButton
        loading={loading}
        variant="contained"
        color="primary"
        onClick={handleSave}
      >
        Save
      </LoadingButton>

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
    </div>
  );
};

export default blackfriday;
