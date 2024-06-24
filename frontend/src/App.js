import React, { useEffect } from "react";
import "./App.css";
import {
  createRoutesFromElements,
  Route,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "./Store/User/user-action";
import { userActions } from "./Store/User/user-slice";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Main from "./Components/Home/Main";
import PropertyList from "./Components/Home/PropertyList";
import PropertyDetails from "./Components/PropertyDetails/PropertyDetails";
import Login from "./Components/User/Login";
import Signup from "./Components/User/Signup";
import Profile from "./Components/User/Profile";
import EditProfile from "./Components/User/EditProfile";
import UpdatePassword from "./Components/User/UpdatePassword";
import ForgotPassword from "./Components/User/ForgotPassword";
import ResetPassword from "./Components/User/ResetPassword";
import MyBookings from "./Components/MyBookings/MyBookings";
import BookingDetails from "./Components/MyBookings/BookingDetails";
import AccomodationForm from "./Components/Accomodation/AccomodationForm";
import Accomodation from "./Components/Accomodation/Accomodation";
import Payment from "./Components/Payment/Payment";

function App() {
  const stripePromise = loadStripe(
    "pk_test_51P6RLaK7frZ5fT4fJHkqL8LlPZTTpSyfdKvSD82q6edp8k8LzSKJRhwWqMOM3Ob1m50VErHq9q4J9SsufY0IodZj00bytfbNt7"
  );
  const dispatch = useDispatch();
  const { errors } = useSelector((state) => state.user);

  useEffect(() => {
    if (errors) {
      dispatch(userActions.clearError());
    }
    dispatch(currentUser());
  }, [errors, dispatch]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Main />} id="main" exact>
        <Route id="home" index element={<PropertyList />} exact />
        <Route
          element={<PropertyDetails />}
          id="PropertyDetails"
          path="propertylist/:id"
          exact
        />
        <Route id="login" path="login" element={<Login />} />
        <Route id="signup" path="signup" element={<Signup />} />
        <Route id="profile" path="profile" element={<Profile />} />
        <Route id="editprofile" path="editprofile" element={<EditProfile />} />
        <Route
          id="updatepassword"
          path="user/updatepassword"
          element={<UpdatePassword />}
        />
        <Route
          id="forgotpassword"
          path="user/forgotpassword"
          element={<ForgotPassword />}
        />
        <Route
          id="resetpassword"
          path="user/resetPassword/:token"
          element={<ResetPassword />}
        />
        <Route
          id="payment"
          path="payment/:propertyId"
          element={
            <Elements stripe={stripePromise}>
              <Payment/>
            
            </Elements>
          }
        />
        <Route id="mybookings" path="user/booking" element={<MyBookings />} />
        <Route
          id="bookingdetails"
          path="user/booking/:bookingId"
          element={<BookingDetails />}
        />

        {/* accomodation */}
        <Route
          id="accomodation"
          path="accommodation"
          element={<Accomodation />}
        />
        <Route
          id="accomodationform"
          path="accomodationform"
          element={<AccomodationForm />}
        />
      </Route>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        draggable={true}
        transition={Flip}
      />
    </div>
  );
}

export default App;
