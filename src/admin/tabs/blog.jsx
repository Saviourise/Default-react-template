import React from "react";
import {
  Button,
  LinearProgress,
  Snackbar,
  Stack,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import PropTypes from "prop-types";
import LoadingButton from "@mui/lab/LoadingButton";
import { addBlog } from "../data/api";

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

const Blog = () => {
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    author: "",
    file: [],
  });
  const box = React.useRef(null);
  const [loading, setLoading] = React.useState(false);
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

  const upload = async () => {
    setLoading(true);
    if (
      formData.title === "" ||
      formData.description === "" ||
      formData.author === "" ||
      formData.file.length === 0
    ) {
      setAlert({
        open: true,
        message: "Please fill all the fields",
        severity: "error",
      });
      return setLoading(false);
    }

    const blogData = new FormData();

    blogData.append("files", formData.file[0]);

    blogData.append("title", formData.title);
    blogData.append("description", formData.description);
    blogData.append("author", formData.author);
    console.log(blogData.files);

    await addBlog(blogData)
      .then((data) => {
        setAlert({
          open: true,
          message: "Blog added successfully",
          severity: "success",
        });
        setFormData({
          title: "",
          description: "",
          author: "",
          file: [],
        });
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: "Something went wrong",
          severity: "error",
        });
        console.log(error);
      });
    setLoading(false);
  };

  return (
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
        <h3>Upload a blog</h3>
        <br></br>
        <br></br>
        <TextField
          id="title"
          label="Title of Blog"
          placeholder="Title of Blog"
          multiline
          size="small"
          required
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          error={!Boolean(formData.title)}
          value={formData.title}
        />

        <br></br>
        <br></br>

        <TextField
          id="author"
          label="Author"
          placeholder="Author"
          size="small"
          required
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          error={!Boolean(formData.author)}
          value={formData.author}
        />

        <br></br>
        <br></br>

        <TextField
          id="outlined-multiline-static"
          label="Blog Content"
          multiline
          rows={6}
          required
          placeholder="Blog Content"
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          error={!Boolean(formData.description)}
          value={formData.description}
        />

        <br></br>
        <br></br>

        <Button
          variant="outlined"
          component="label"
          size="medium"
          color={formData.file.length < 1 ? "error" : "primary"}
        >
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
          size="medium"
          color={"primary"}
          loading={loading}
          onClick={() => upload()}
        >
          Upload
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
    </Box>
  );
};

export default Blog;
