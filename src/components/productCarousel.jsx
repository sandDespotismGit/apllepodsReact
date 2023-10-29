import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSwiper } from "swiper/react";
import DropDown from "./dropDown";
import TeletypeCarousel from "./teletypeCarousel";
import { useState } from "react";
import { ReactAudioPlayer } from "react-audio-player";
import { useEffect } from "react";
import tutorial from "./../images/tutorial.MP4";
import close from "./../images/Close.svg";
import "swiper/css";
import "swiper/css/free-mode";
function ProductCarousel() {
  const swiperIns = useSwiper();
  const [carouselInfo, setCarouselInfo] = useState([
    "название",
    "цена",
    ["url", "url"],
  ]);
  let swiper = null;
  const [variants, setVariants] = useState("hsda");
  const [watchVar, setWatchVar] = useState("");
  const [info, setInfo] = useState("информация о продукте");
  // const [swiper, setSwiper] = useState(null);
  const [carousel, setCarousel] = useState("");
  const [slider, setSlider] = useState("");
  const [price, setPrice] = useState(0);
  const [currency, setCurrency] = useState("RUB");
  const [story, setStory] = useState(null);
  const [audio, setAudio] = useState("");
  const [curColor, setCurColor] = useState("");
  const [curStrap, setCurStrap] = useState("");
  function swipe(ind) {
    swiper.slideTo(ind);
  }
  useEffect(() => {
    fetch("https://pop.applepodsblack.ru/api/products?populate=deep")
      .then((response) => response.json())
      .then(function (commits) {
        let data = commits.data;
        let product = "";
        for (let elem of data) {
          if (elem.id == window.GlobalProductId) product = elem;
        }
        let buffer = [];
        let urls = [];

        buffer[0] = product.attributes.name;
        buffer[1] = product.attributes.rub_price;
        urls[0] =
          "https://pop.applepodsblack.ru/" +
          product.attributes.main_photo.data.attributes.url;
        let colors = [];
        for (let color of product.attributes.colors.data) {
          urls.push(
            "https://pop.applepodsblack.ru/" +
              color.attributes.photo.data[0].attributes.url
          );
          colors.push(color.attributes.name);
        }

        if (colors.length != 0) {
          window.GlobalProductColor = colors[0];
        } else {
          window.GlobalProductColor = "стандартный цвет";
        }
        buffer[2] = urls;
        buffer[3] = product.attributes.eur_price;
        buffer[4] = product.attributes.byn_price;

        let carousel = [];
        let vars = [];
        window.GlobalProductCategory = product.attributes.category;
        for (let i = 0; i < urls.length; i++) {
          carousel.push(
            <SwiperSlide>
              <img src={urls[i]} className="product_img_carousel"></img>
            </SwiperSlide>
          );
        }
        for (let i = 1; i < urls.length; i++) {
          vars.push(
            <img
              className="variant"
              src={urls[i]}
              onClick={() => {
                window.GlobalProductColor = colors[i - 1];
                setCurColor(window.GlobalProductColor);
                swipe(i);
              }}
            ></img>
          );
        }
        if (product.attributes.category == "headphones") {
          let audio_buff = [];
          let stories_buff = [];
          let counter = 0;
          audio_buff.push(
            <div className="audio_div">
              <audio
                controls
                src={
                  "https://pop.applepodsblack.ru/" +
                  product.attributes.audio.data[1].attributes.url
                }
              ></audio>
            </div>
          );
          for (let story of product.attributes.information.data) {
            stories_buff.push(
              <SwiperSlide>
                <div
                  className="story_block"
                  onClick={() => {
                    setStory(
                      // <p onClick={() => setStory(null)}>закрыть</p>
                      <div id="video_story_back">
                        <img id="video_story_close" src={close} onClick={() => setStory(null)}></img>
                        <video
                          className="video_guide_story"
                          
                          src={
                            "https://pop.applepodsblack.ru/" +
                            story.attributes.url
                          }
                          autoPlay
                        ></video>
                      </div>
                    );
                  }}
                >
                  <div className="story_products">
                    <p>{story.attributes.name}</p>
                  </div>
                </div>
              </SwiperSlide>
            );
          }
          setAudio(audio_buff);
          setSlider(stories_buff);
        }
        window.GlobalWatchColor = "";
        setVariants(vars);
        setCarousel(carousel);
        console.log(urls.length);
        setCarouselInfo(buffer);
        setPrice(buffer[1]);
        setInfo(product.attributes.info);
        setCurColor(window.GlobalProductColor);
      });
  }, []);

  return (
    <div>
      <div>
        <Swiper
          onSwiper={(s) => {
            console.log(s);
            swiper = s;
          }}
          slidesPerView={1}
          modules={[FreeMode]}
          freeMode={true}
        >
          {carousel}
        </Swiper>
      </div>
      <div id="main_product_info">
        <p id="main_info_product_name">{carouselInfo[0]}</p>
        <div className="select_currency">
          <p>Выберите валюту</p>
        </div>
        <div id="main_info_product_price">
          <p id="gold_price">{price}</p>
          <div id="main_info_currencylogo">
            <select
              id="currency_choose"
              onChange={(event) => {
                if (event.target.value == "rub") setPrice(carouselInfo[1]);
                else if (event.target.value == "eur") setPrice(carouselInfo[3]);
                else setPrice(carouselInfo[4]);
              }}
            >
              <option value="rub">RUB</option>
              <option value="eur">EUR</option>
              <option value="byn">Br</option>
            </select>
          </div>
        </div>
        {window.GlobalProductCategory == "watch" ||
        window.GlobalProductCategory == "headphones" ? (
          <div id="choose_color">
            <p>
              Цвет корпуса <p className="current">{curColor}</p>
            </p>
            <div className="color_variants">{variants}</div>
          </div>
        ) : (
          ""
        )}
        {story}
        <div id="info_dropdown">
          <DropDown content={info} header={"Описание"}></DropDown>
        </div>
        {window.GlobalProductCategory == "accessories" ? (
          ""
        ) : window.GlobalProductCategory == "watch" ||
          window.GlobalProductCategory == "dyson" ? (
          <div id="stories">
            <p>Полезная информация</p>
            <TeletypeCarousel />
          </div>
        ) : (
          <div id="stories">
            <p>Полезная информация</p>
            <Swiper slidesPerView={3}>{slider}</Swiper>
          </div>
        )}

        <div id="audio_ex">
          {window.GlobalProductCategory == "headphones" ? (
            <p id="audio_header">Тест микрофона</p>
          ) : (
            ""
          )}
          {audio}
        </div>
      </div>
    </div>
  );
}
export default ProductCarousel;
