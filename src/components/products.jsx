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
        for (let i = 0; i < data.length; i++) {
          buffer.push(
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
                  <p className="card_price">{data[i].attributes.rub_price} ₽</p>
                  <p className="card_description">{data[i].attributes.name}</p>
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
      <div className="grid">{cards}</div>
    </div>
  );
}
export default Products;
