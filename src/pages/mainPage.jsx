import { Suspense, lazy } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Products from "../components/products.jsx";
const HeaderNotification = lazy(() =>
  import("../components/HeaderNotification.jsx")
);
const HeaderCarousel = lazy(() => import("../components/HeaderCarousel.jsx"));
const ProfileTgLink = lazy(() => import("../components/profileTgLink.jsx"));
const TeletypeCarousel = lazy(() =>
  import("../components/teletypeCarousel.jsx")
);
const QuadroBlocks = lazy(() => import("../components/QuadroBlocks.jsx"));
const OurProducts = lazy(() => import("../components/ourProducts.jsx"));
const ReviewCarousel = lazy(() => import("../components/reviewCarousel.jsx"));

function MainPage() {
  const [notification, setNotification] = useState("");
  useEffect(() => {
    if (window.GlobalShoppingCart.length != 0)
      setNotification(<HeaderNotification />);
  });
  return (
    <div id="main">
      {notification}
      <Suspense fallback={<div></div>}>
        <HeaderCarousel />
      </Suspense>
      <Suspense fallback={<div></div>}>
        <ProfileTgLink />
      </Suspense>
      <Suspense fallback={<div></div>}>
        <TeletypeCarousel />
      </Suspense>
      <Suspense fallback={<div></div>}>
        <QuadroBlocks />
      </Suspense>
      <Suspense fallback={<div></div>}>
        <OurProducts />
      </Suspense>
      <Products />
      <Suspense fallback={<div></div>}>
        <ReviewCarousel />
      </Suspense>
    </div>
  );
}
export default MainPage;
