import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Products() {
  const [cards, setCards] = useState("");
  useEffect(() => {
    fetch("https://pop.applepodsblack.ru/api/products?populate=deep")
      .then((response) => response.json())
      .then(function (commits) {
        let data = commits.data;
        console.log(commits);
        let buffer = [];
        if (data.length % 2 == 0 && data.length != 0) {
          for (let i = 0; i < data.length; i += 2) {
            buffer.push(
              <div className="products_row">
                <div className="card">
                  <div className="card_image">
                    <img
                      src={
                        "https://pop.applepodsblack.ru/" +
                        data[i].attributes.main_photo.data.attributes.url
                      }
                    />
                  </div>
                  <div className="card_info">
                    <div className="card_price_info">
                      <p className="card_price">
                        {data[i].attributes.rub_price} ₽
                      </p>
                      <p className="card_description">
                        {data[i].attributes.name}
                      </p>
                    </div>
                    <Link style={{ width: "100%" }} to={"/product"}>
                      <button
                        className="gold_button"
                        onClick={() => (window.GlobalProductId = data[i].id)}
                      >
                        Купить
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="card">
                  <div className="card_image">
                    <img
                      src={
                        "https://pop.applepodsblack.ru/" +
                        data[i].attributes.main_photo.data.attributes.url
                      }
                    />
                  </div>
                  <div className="card_info">
                    <div className="card_price_info">
                      <p className="card_price">
                        {data[i + 1].attributes.rub_price} ₽
                      </p>
                      <p className="card_description">
                        {data[i + 1].attributes.name}
                      </p>
                    </div>
                    <Link style={{ width: "100%" }} to={"/product"}>
                      <button
                        className="gold_button"
                        onClick={() =>
                          (window.GlobalProductId = data[i + 1].id)
                        }
                      >
                        Купить
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          }
        } else if (data.length == 1) {
          buffer.push(
            <div className="products_row">
              <div className="card">
                <div className="card_image">
                  <img
                    src={
                      "https://pop.applepodsblack.ru/" +
                      data[0].attributes.main_photo.data.attributes.url
                    }
                  />
                </div>
                <div className="card_info">
                  <div className="card_price_info">
                    <p className="card_price">
                      ${data[0].attributes.rub_price} ₽
                    </p>
                    <p className="card_description">
                      {data[0].attributes.name}
                    </p>
                  </div>
                  <Link style={{ width: "100%" }} to={"/product"}>
                    <button
                      className="gold_button"
                      onClick={() => (window.GlobalProductId = data[0].id)}
                    >
                      Купить
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        } else if (data.length % 2 != 0) {
          for (let i = 0; i < data.length - 1; i += 2) {
            buffer.push(
              <div className="products_row">
                <div className="card">
                  <div className="card_image">
                    <img
                      src={
                        "https://pop.applepodsblack.ru/" +
                        data[i].attributes.main_photo.data.attributes.url
                      }
                    />
                  </div>
                  <div className="card_info">
                    <div className="card_price_info">
                      <p className="card_price">
                        {data[i].attributes.rub_price} ₽
                      </p>
                      <p className="card_description">
                        {data[i].attributes.name}
                      </p>
                    </div>
                    <Link style={{ width: "100%" }} to={"/product"}>
                      <button
                        className="gold_button"
                        onClick={() => (window.GlobalProductId = data[i].id)}
                      >
                        Купить
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="card">
                  <div className="card_image">
                    <img
                      src={
                        "https://pop.applepodsblack.ru/" +
                        data[i + 1].attributes.main_photo.data.attributes.url
                      }
                    />
                  </div>
                  <div className="card_info">
                    <div className="card_price_info">
                      <p className="card_price">
                        {data[i + 1].attributes.rub_price} ₽
                      </p>
                      <p className="card_description">
                        {data[i + 1].attributes.name}
                      </p>
                    </div>
                    <Link style={{ width: "100%" }} to={"/product"}>
                      <button
                        className="gold_button"
                        onClick={() =>
                          (window.GlobalProductId = data[i + 1].id)
                        }
                      >
                        Купить
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          }
          buffer.push(
            <div className="products_row">
              <div className="card">
                <div className="card_image">
                  <img
                    src={
                      "https://pop.applepodsblack.ru/" +
                      data[data.length - 1].attributes.main_photo.data
                        .attributes.url
                    }
                  />
                </div>
                <div className="card_info">
                  <div className="card_price_info">
                    <p className="card_price">
                      {data[data.length - 1].attributes.rub_price} ₽
                    </p>
                    <p className="card_description">
                      {data[data.length - 1].attributes.name}
                    </p>
                  </div>
                  <Link style={{ width: "100%" }} to={"/product"}>
                    <button
                      className="gold_button"
                      onClick={() =>
                        (window.GlobalProductId = data[data.length - 1].id)
                      }
                    >
                      Купить
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        }
        setCards(buffer);
      });
  }, []);
  return (
    <div>
      <div className="small_products_header">
        <p>Товары</p>
      </div>
      {cards}
    </div>
  );
}
export default Products;
