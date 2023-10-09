import { createMemoryRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import MainPage from "./pages/mainPage";
import ProductPage from "./pages/productPage";
import ShoppingCart from "./pages/shoppingCart";
import OrderPage from "./pages/order";
import CopyPage from "./pages/copyPage";
import TrackingPage from "./pages/Tracking";
import { ChakraBaseProvider } from "@chakra-ui/react";
window.GlobalShoppingCart = [];
const router = createMemoryRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/product",
    element: <ProductPage />,
  },
  {
    path: "/cart",
    element: <ShoppingCart />,
  },
  {
    path: "/order",
    element: <OrderPage />,
  },
  {
    path: "/tracking",
    element: <TrackingPage />,
  },
  {
    path: "/copy",
    element: <CopyPage />,
  },
]);
function App() {
  return (
    <ChakraBaseProvider>
      <RouterProvider router={router} />
    </ChakraBaseProvider>
  );
}
export default App;
