import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL + "api/";

export const uploadCarousel = async (data, options) => {
  try {
    await axios.post(apiUrl + "upload/carousel", data, options);
  } catch (error) {
    throw error;
  }
};

export const products = async (data, options) => {
  try
  {
    // console.log(data)
    await axios.post( apiUrl + "upload/products", data, options );
  } catch (error) {
    throw error;
  }
};

export const addBlog = async (data, options) => {
  try {
    await axios.post(process.env.REACT_APP_API_URL + "/blog",
      data
    );
  } catch (error) {
    throw error;
  }
};

export const delProducts = async (data) => {
  //console.log(data);
  data = JSON.stringify({
    name: data,
  });
  try {
    await axios({
      method: "delete",
      url: apiUrl + "upload/products",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    });
  } catch (error) {
    throw error;
  }
};



// export const userSignUp = async (username, email, password) => {
//   //console.log(data);
//   let data = JSON.stringify({
//     username: username,
//     email: email,
//     password: password,
//   });
//   try {
//     await axios({
//       method: "post",
//       url: apiUrl + "user/register",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       data: data,
//     });
//   } catch (error) {
//     throw error;
//   }
// };

// export const userSignIn = async (email, password) => {
//   //console.log(data);
//   let data = JSON.stringify({
//     email: email,
//     password: password,
//   });
//   try {
//     await axios({
//       method: "post",
//       url: apiUrl + "user/login",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       data: data,
//     })
//       .then((data) => {
//         console.log("success", data);
//       })
//       .catch((error) => {
//         console.log("error", error);
//       });
//   } catch (error) {
//     throw error;
//   }
// };
