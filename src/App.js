import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./admin/admin";
import AdminSignin from "./admin/adminSignin";
// import ProductPage from "./components/productPage";
// import SignIn from "./components/signin";
// import Signup from "./components/signup";
// import SingleProduct from "./components/singleProduct";

function App() {
  return (
    <Router className="App">
      <Routes>
        <Route path="/" element={<AdminSignin />} />
        {/* <Route path="/" exact element={<AdminSignin />} /> */}
        {/* <Route path="/signup" exact element={<Signup />} />
        <Route path="/signin" exact element={<SignIn />} /> */}
        {/* <Route path="/products" exact element={<ProductPage />} />
        <Route path="/products/:productId" exact element={<SingleProduct />} />
        <Route
          path="/products/:productId/:affiliateId"
          exact
          element={<SingleProduct />}
        /> */}
        <Route path="/admin" exact element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
