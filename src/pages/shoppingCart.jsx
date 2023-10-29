import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import delete_cart from "./../images/delete_cart.svg";

function ShoppingCart() {
  const [cart, setCart] = useState([]);
  const [sale, setSale] = useState(
    new Map([
      [10, 50],
      [20, 60],
      [40, 100],
    ])
  );
  const [sale_sum, setSaleSum] = useState(0);
  const [summary, setSummary] = useState(0);
  const [enough, setEnough] = useState(true);
  const tg = window.Telegram.WebApp;
  const id = tg.initDataUnsafe.user ? tg.initDataUnsafe.user.id : null;
  const backButton = tg.BackButton;
  const navigate = useNavigate();
  function back_page() {
    backButton.hide();
    navigate("/");
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
    window.GlobalProductColors.splice(ind, 1);
    setCart(cart_arr);
  }
  useEffect(() => {
    window.GlobalShoppingCart != [] ? setEnough(false) : setEnough(true);
  }, [cart]);
  function deleteSum(ind, arr, current) {
    console.log(ind);
    console.log(current);
    console.log(arr);
    current -= arr[ind];
    return current;
  }
  useEffect(() => {
    fetch("https://pop.applepodsblack.ru/api/discounts")
      .then((response) => response.json())
      .then(function (commits) {
        let data = commits.data;
        let buffer = new Map();
        for (let elem of data) {
          buffer.set(elem.attributes.quantity, elem.attributes.percent);
        }
        setSale(buffer);
      });
  }, []);
  useEffect(() => {
    fetch("https://pop.applepodsblack.ru/api/products?populate=deep")
      .then((response) => response.json())
      .then(function (commits) {
        let data = commits.data;
        let buffer = new Map();
        let sum = 0;
        let store = window.GlobalShoppingCart;
        let colors = window.GlobalProductColors;
        let cart_names = [];
        for (let i = 0; i < window.GlobalShoppingCart.length; i++) {
          let product = '';
          for (let elem of data){
            if (elem.id  == store[i]) product = elem;
          }
          buffer.set(
            <div className="cart_card">
              <img
                src={
                  "https://pop.applepodsblack.ru/" +
                  product.attributes.main_photo.data.attributes.url
                }
                className="cart_card_img"
              />
              <div className="info_cart_card">
                <p className="cart_card_name">
                  {product.attributes.name} {colors[i]}
                </p>
                <div className="cart_card_pricings">
                  <p className="cart_card_price">
                    {" "}
                    {product.attributes.rub_price} ₽
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
            product.attributes.rub_price
          );
          cart_names.push(product.attributes.name);
        }
        window.GlobalCartNames = cart_names;
        sum_arr = Array.from(buffer.values());
        for (let elem of sum_arr) sum += elem;
        cart_arr = Array.from(buffer.keys());

        if (JSON.stringify(cart_arr) != JSON.stringify(cart)) {
          setCart(cart_arr);
        }
        setSummary(sum - sale_sum);
      });
    window.GlobalDbId
      ? fetch(`https://pop.applepodsblack.ru/api/carts/${window.GlobalDbId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              tgid: id,
              orders: window.GlobalShoppingCart,
              colors: window.GlobalProductColors,
            },
          }),
        })
      : fetch(`https://pop.applepodsblack.ru/api/carts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              tgid: id,
              orders: window.GlobalShoppingCart,
              colors: window.GlobalProductColors,
            },
          }),
        });
  }, [cart, summary, sale_sum]);
  useEffect(() => {
    let sale_num = 0;
    for (let elem of Array.from(sale.keys()).sort().reverse()) {
      if (window.GlobalShoppingCart.length >= elem) {
        window.GlobalSale = sale.get(elem);
        sale_num = Math.ceil(summary * (sale.get(elem) / 100));
        setSaleSum(sale_num);
        break;
      } else {
        setSaleSum(0);
        window.GlobalSale = 0;
      }
    }
  });
  return (
    <div id="shopping_cart">
      <div style={{ backgroundColor: "#1C1C1E" }}>
        <div id="sale_notification">
          <p id="gold_sale">
            Получите скидку {Array.from(sale.entries())[0][1]}%
          </p>
          <p id="sale_if">
            При оформлении от {Array.from(sale.entries())[0][0]}-х позиций
            товаров вы получаете скидку {Array.from(sale.entries())[0][1]}%!
          </p>
        </div>
        <div id="cart_header">
          <p>Корзина</p>
          <p
            id="delete"
            onClick={() => {
              window.GlobalShoppingCart = [];
              window.GlobalProductColors = [];
              setCart("");
              setSummary("");
            }}
          >
            Очистить корзину
          </p>
        </div>
        <div id="cart_cards">{cart}</div>
        <div id="result_sale">
          <p>Скидка</p>
          <p>-{sale_sum}</p>
        </div>
        <div id="result_price">
          <p>Итого</p>
          <p>{summary} ₽</p>
        </div>
      </div>
      <div style={{ padding: "16px" }}>
        <button
          className="gold_button order_butt"
          style={{ width: "100%" }}
          disabled={enough}
          onClick={() => {
            window.GlobalSum = summary;
            navigate("/order");
          }}
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );
}
export default ShoppingCart;
