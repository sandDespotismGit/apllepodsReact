import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import TeletypeCarousel from "./teletypeCarousel";
import profile_test from "./../images/profile_test.jpg";
import useWindowDimensions from "./GetDimensions";
import { useState } from "react";
import { useEffect } from "react";
import "swiper/css";
import "swiper/css/free-mode";

function ProductCarousel() {
  const [carouselInfo, setCarouselInfo] = useState([
    "название",
    "цена",
    ["url", "url"],
  ]);
  const [price , setPrice] = useState(0);
  const [currency, setCurrency] = useState('RUB')
  useEffect(() => {
    fetch("https://pop.applepodsblack.ru/api/products?populate=deep")
      .then((response) => response.json())
      .then(function (commits) {
        let data = commits.data;
        let buffer = [];
        let urls = [];
        buffer[0] = data[window.GlobalProductId - 1].attributes.name;
        buffer[1] = data[window.GlobalProductId - 1].attributes.rub_price;
        urls[0] =
          "https://pop.applepodsblack.ru/" +
          data[window.GlobalProductId - 1].attributes.main_photo.data.attributes.url;
        for (let photo of data[window.GlobalProductId - 1].attributes.photo.data){
          urls.push("https://pop.applepodsblack.ru/" + photo.attributes.url);
        }
        buffer[2] = urls;
        buffer[3] = data[window.GlobalProductId - 1].attributes.eur_price;
        buffer[4] = data[window.GlobalProductId - 1].attributes.byn_price;
        setCarouselInfo(buffer);
        setPrice(buffer[1]);
      });
  }, []);

  return (
    <div>
      <div>
        <Swiper slidesPerView={1} modules={[FreeMode]} freeMode={true}>
          <SwiperSlide>
            <img className="product_img_carousel" src={carouselInfo[2][0]}></img>
          </SwiperSlide>
          <SwiperSlide>
            <img className="product_img_carousel" src={carouselInfo[2][1]}></img>
          </SwiperSlide>
          <SwiperSlide>
            <img className="product_img_carousel" src={carouselInfo[2][2]}></img>
          </SwiperSlide>
        </Swiper>
      </div>
      <div id="main_product_info">
        <p id="main_info_product_name">{carouselInfo[0]}</p>
        <div className="select_currency">
          <p>Выберите валюту</p>
          <select id="currency_choose" onChange={(event) =>{ 
            setCurrency(event.target.value.toUpperCase());
            if (event.target.value == 'rub') setPrice(carouselInfo[1]);
            else if (event.target.value == 'eur') setPrice(carouselInfo[3]);
            else setPrice(carouselInfo[4]);
            }}>
            <option value="rub">RUB</option>
            <option value="eur">EUR</option>
            <option value="byn">BYN</option>
          </select>
        </div>
        <div id="main_info_product_price">
          <p id="gold_price">{price}</p>
          <div id="main_info_currencylogo">{currency}</div>
        </div>
        <div id="choose_color">
          <p>Цвет корпуса</p>
          <div className="color_variants">
            <img className="variant" src={carouselInfo[2][0]}></img>
            <img className="variant" src={carouselInfo[2][1]}></img>
            <img className="variant" src={carouselInfo[2][2]}></img>
          </div>
        </div>
        <div id="stories">
          <p>Полезная информация</p>
          <Swiper slidesPerView={3}>
            <SwiperSlide>
              <div className="story_block">
                <div>
                  <p>Заголовок статьи в три строки</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="story_block">
                <div>
                  <p>Заголовок статьи в три строки</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="story_block">
                <div>
                  <p>Заголовок статьи в три строки</p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
export default ProductCarousel;
