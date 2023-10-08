import { createMemoryRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import MainPage from "./pages/mainPage";
import ProductPage from "./pages/productPage";
import ShoppingCart from "./pages/shoppingCart";
import OformitPage from "./pages/oformit";
import CopyPage from "./pages/copyPage";
import Tracking from "./pages/Tracking";
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
    element: <ShoppingCart/>
  },
  {
    path: "/oformit",
    element: <OformitPage/>
  },
  {
    path: "/copy",
    element: <CopyPage/>
  }, 
  {
    path: "/tracking",
    element: <Tracking/>
  }
]);
function App() {
  return (
    <ChakraBaseProvider>
        <RouterProvider router={router} />
    </ChakraBaseProvider>
  );
}
export default App;
