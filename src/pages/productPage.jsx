import { lazy, Suspense } from "react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
const ProductCarousel = lazy(() => import("../components/productCarousel"));
const ProductAdditionals = lazy(() =>
  import("../components/ProductAdditionals")
);
function ProductPage() {
  const tg = window.Telegram.WebApp;
  const backButton = tg.BackButton;
  const mainButton = tg.MainButton;
  mainButton.text = "Добавить в корзину";
  mainButton.color = "#F5EA99";
  mainButton.textColor = "#1C1C1E";
  tg.onEvent("mainButtonClicked", addToCart)
  function addToCart() {
    window.GlobalShoppingCart.push(window.GlobalProductId);
    console.log('привет')
    navigate("/cart");
  }
  mainButton.show();

  const navigate = useNavigate();
  function back_page() {
    navigate("/");
    backButton.hide();
  }
  backButton.show();
  backButton.onClick(back_page);
  window.scrollTo(0, 0);
  return (
    <div>
      <Suspense fallback={<div></div>}>
        <ProductCarousel />
      </Suspense>
      <Suspense fallback={<div></div>}>
        <ProductAdditionals />
      </Suspense>
    </div>
  );
}
export default ProductPage;
