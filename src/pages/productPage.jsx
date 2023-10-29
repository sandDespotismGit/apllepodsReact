import { lazy, Suspense } from "react";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import ProductAdditionals from "./../components/ProductAdditionals";
const ProductCarousel = lazy(() => import("../components/productCarousel"));
function ProductPage() {
  const tg = window.Telegram.WebApp;
  const backButton = tg.BackButton;
  const mainButton = tg.MainButton;
  mainButton.text = "Добавить в корзину";
  mainButton.color = "#F5EA99";
  mainButton.textColor = "#1C1C1E";
  tg.onEvent("mainButtonClicked", addToCart);
  function addToCart() {
    window.GlobalShoppingCart.push(window.GlobalProductId);
    window.GlobalProductColors.push(window.GlobalProductColor + ' ' + window.GlobalWatchColor);
    console.log("привет");
    tg.offEvent("mainButtonClicked", addToCart);
    mainButton.hide();
    navigate("/cart");
  }
  mainButton.show();

  const navigate = useNavigate();
  function back_page() {
    tg.offEvent("mainButtonClicked", addToCart);
    navigate("/");
    backButton.hide();
    mainButton.hide();
  }
  backButton.show();
  backButton.onClick(back_page);
  window.scrollTo(0, 0);
  const [additionals, setAdditionals] = useState("");
  useEffect(() => {
    fetch("https://pop.applepodsblack.ru/api/products?populate=deep")
      .then((response) => response.json())
      .then(function (commits) {
        let data = commits.data;
        let product = '';
        for (let elem of data){
          if (elem.id == window.GlobalProductId) product = elem;
        }
        window.GlobalProductCategory =
          product.attributes.category;
        window.GlobalProductCategory == "accessories"
          ? setAdditionals("")
          : setAdditionals(<ProductAdditionals />);
      });
  }, []);
  return (
    <div id="product_page">
      <Suspense fallback={<div></div>}>
        <ProductCarousel />
      </Suspense>
      {additionals}
    </div>
  );
}
export default ProductPage;
