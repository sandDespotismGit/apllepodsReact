import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import delete_cart from "./../images/delete_cart.svg";

function ShoppingCart() {
  const [cart, setCart] = useState("");
  const [summary, setSummary] = useState(0);
  const tg = window.Telegram.WebApp;
  const backButton = tg.BackButton;
  const navigate = useNavigate();
  function back_page() {
    if (window.notification) {
      window.notification = false;
      navigate("/");
      backButton.hide();
    } else {
      window.notification = false;
      navigate("/product");
    }
  }
  backButton.show();
  backButton.onClick(back_page);
  let sum_arr = [];
  let cart_arr = [];
  function deleteCard(ind, arr) {
    cart_arr = Array.from(arr);
    console.log(cart_arr);
    console.log(arr);
    cart_arr[ind] = "";
    console.log(cart_arr);
    window.GlobalShoppingCart.splice(ind, 1);
    setCart(cart_arr);
  }
  function deleteSum(ind, arr, current) {
    console.log(ind);
    console.log(current);
    console.log(arr);
    current -= arr[ind];
    return current;
  }
  useEffect(() => {
    fetch("https://pop.applepodsblack.ru/api/products?populate=deep")
      .then((response) => response.json())
      .then(function (commits) {
        let data = commits.data;
        let buffer = new Map();
        let sum = 0;
        let store = window.GlobalShoppingCart;
        for (let i = 0; i < window.GlobalShoppingCart.length; i++) {
          buffer.set(
            <div className="cart_card">
              <img
                src={
                  "https://pop.applepodsblack.ru/" +
                  data[store[i] - 1].attributes.main_photo.data.attributes.url
                }
                className="cart_card_img"
              />
              <div className="info_cart_card">
                <p className="cart_card_name">
                  {data[store[i] - 1].attributes.name}
                </p>
                <div className="cart_card_pricings">
                  <p className="cart_card_price">
                    {" "}
                    {data[store[i] - 1].attributes.rub_price} ₽
                  </p>
                  <img
                    src={delete_cart}
                    onClick={() => {
                      deleteCard(i, cart);
                      setSummary(deleteSum(i, sum_arr, sum));
                    }}
                  />
                </div>
              </div>
            </div>,
            data[store[i] - 1].attributes.rub_price
          );
        }
        sum_arr = Array.from(buffer.values());
        for (let elem of sum_arr) sum += elem;
        console.log(sum);
        setSummary(sum);
        console.log("nothing");
        cart_arr = Array.from(buffer.keys());
        if (JSON.stringify(cart_arr) != JSON.stringify(cart)) {
          setCart(cart_arr);
          console.log(cart_arr);
        }
      });
  }, [cart]);
  return (
    <div id="shopping_cart">
      <div style={{ backgroundColor: "#1C1C1E" }}>
        <div id="cart_header">
          <p>Корзина</p>
          <p
            id="delete"
            onClick={() => {
              setCart("");
              setSummary("");
            }}
          >
            Очистить корзину
          </p>
        </div>
        <div id="cart_cards">{cart}</div>
        <div id="result_price">
          <p>Итого</p>
          <p>{summary} ₽</p>
        </div>
      </div>
      <div style={{ padding: "16px" }}>
        <Link to={"/order"} onClick={() => (window.GlobalSum = summary)}>
          <button className="gold_button" style={{ width: "100%" }}>
            Оформить заказ
          </button>
        </Link>
      </div>
    </div>
  );
}
export default ShoppingCart;
