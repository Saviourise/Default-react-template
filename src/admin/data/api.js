import axios from "axios";

const apiUrl = "https://a1api.onrender.com/api/";

export const uploadCarousel = async (data, options) => {
  try {
    await axios.post(apiUrl + "upload/carousel", data, options);
  } catch (error) {
    throw error;
  }
};

export const products = async (data, options) => {
  try {
    // console.log(data)
    await axios.post(apiUrl + "upload/products", data, options);
  } catch (error) {
    throw error;
  }
};

export const restaurants = async (data, options) => {
  try {
    // console.log(data)
    await axios.post(apiUrl + "upload/restaurant", data, options);
  } catch (error) {
    throw error;
  }
};

export const menus = async (data, options) => {
  try {
    // console.log(data)
    await axios.put(apiUrl + "upload/menu", data, options);
  } catch (error) {
    throw error;
  }
};

export const supermarkets = async (data, options) => {
  try {
    // console.log(data)
    await axios.post(apiUrl + "upload/supermarket", data, options);
  } catch (error) {
    throw error;
  }
};

export const items = async (data, options) => {
  try {
    // console.log(data)
    await axios.put(apiUrl + "upload/item", data, options);
  } catch (error) {
    throw error;
  }
};

export const addBlog = async (data, options) => {
  try {
    await axios.post("https://a1api.onrender.com/blog", data);
  } catch (error) {
    throw error;
  }
};

export const addAds = async (data, options) => {
  try {
    await axios.post("https://a1api.onrender.com/ads", data);
  } catch (error) {
    throw error;
  }
};

export const removeAds = async (id, options) => {
  try {
    await axios.delete(`https://a1api.onrender.com/ads/${id}`);
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
