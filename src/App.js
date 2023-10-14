import { createMemoryRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import MainPage from "./pages/mainPage";
import ProductPage from "./pages/productPage";
import ShoppingCart from "./pages/shoppingCart";
import OrderPage from "./pages/order";
import CopyPage from "./pages/copyPage";
import TrackingPage from "./pages/Tracking";
import { ChakraBaseProvider } from "@chakra-ui/react";
import { useEffect } from "react";
window.GlobalShoppingCart = [];
const router = createMemoryRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <MainPage/>
  },
  {
    path: "/product",
    element: <ProductPage />,
    errorElement: <MainPage/>
  },
  {
    path: "/cart",
    element: <ShoppingCart />,
    errorElement: <MainPage/>
  },
  {
    path: "/order",
    element: <OrderPage />,
    errorElement: <MainPage/>
  },
  {
    path: "/tracking",
    element: <TrackingPage />,
    errorElement: <MainPage/>
  },
  {
    path: "/copy",
    element: <CopyPage />,
    errorElement: <MainPage/>
  },
  {
    path: '/home',
    element: <MainPage/>,
    errorElement: <MainPage/>
  }
]);
function App() {
  const tg = window.Telegram.WebApp;
  tg.expand();
  useEffect(() => {
    if (!tg.isExpanded) tg.expand();
  }, [tg.viewportHeight]);
  return (
    <ChakraBaseProvider>
      <RouterProvider router={router} />
    </ChakraBaseProvider>
  );
}
export default App;
