import HeaderNotification from "../components/HeaderNotification.jsx";
import HeaderCarousel from "../components/HeaderCarousel.jsx";
import ProfileTgLink from "../components/profileTgLink.jsx";
import TeletypeCarousel from "../components/teletypeCarousel.jsx";
import QuadroBlocks from "../components/QuadroBlocks.jsx";
import OurProducts from "../components/ourProducts.jsx";
import ReviewCarousel from "../components/reviewCarousel.jsx";
import Products from "../components/products.jsx";
import { useEffect } from "react";
import { useState } from "react";

function MainPage() {
  const [notification, setNotification] = useState('')
  useEffect(()=> {
    if (window.GlobalShoppingCart.length != 0) setNotification(<HeaderNotification/>)
  })
  return (
    <div id="main">
      {notification}
      <HeaderCarousel />
      <ProfileTgLink />
      <TeletypeCarousel />
      <QuadroBlocks />
      <OurProducts />
      <Products />
      <ReviewCarousel />
    </div>
  );
}
export default MainPage;
