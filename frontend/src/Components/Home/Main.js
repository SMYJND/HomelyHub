import React from "react";
//Outlet is used to render(add) the content of the routes 
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
const Main = () => {
  return (
    <div>
      {/*Rendering the Header, Footer, Outlet Component */}
      <Header />
      <Outlet/>  
      <Footer />
    </div>
  );
};

export default Main;
