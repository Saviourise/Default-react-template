import React, { useState, useRef } from "react";
import "./changeHomeDisplay.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import { uploadCarousel } from "../data/api";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

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

const ChangeHomeDisplay = () => {
  const box = useRef(null);

  const [progress, setProgress] = useState(0);

  const [image, setImage] = useState("");

  const uploadCarouselData = async () => {
    const formData = new FormData();
    formData.append("file", image);
    await uploadCarousel(formData, singleFileOptions);
  };

  const singleFileOptions = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percentage = Math.ceil(((loaded / 1000) * 100) / (total / 1000));
      setProgress(percentage);
    },
  };

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
  //   }, 800);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);
  return (
    <>
      <div id="change-home-display-con">
        <div id="change-carousels-con">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 0, width: "50ch" },
            }}
            noValidate
            autoComplete="off"
            ref={box}
            id="box"
          >
            <h2 style={{ textAlign: "center", marginBottom: 30 }}>
              Add Carousel Items
            </h2>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Tooltip
                title="Image that will be displayed on the home page"
                placement="right"
                arrow
                followCursor={true}
              >
                <Button
                  variant="outlined"
                  component="label"
                  size="medium"
                  sx={{ marginLeft: 2 }}
                >
                  Select image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    id="image0"
                    onChange={ ( e ) =>
                    {
                      setProgress(0)
                      setImage( e.target.files[ 0 ] );
                    } }
                  />
                </Button>
              </Tooltip>
            </div>
          </Box>
          <br></br>
          <br></br> Image: {image.name}
          <br></br>
          
          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={uploadCarouselData}>
              Submit
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
        </div>
      </div>
    </>
  );
};

export default ChangeHomeDisplay;
