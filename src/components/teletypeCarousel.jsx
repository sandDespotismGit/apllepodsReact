import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect } from "react";
import { useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import useWindowDimensions from "./GetDimensions";
function TeletypeCarousel() {
  const [teletype, setTeletype] = useState("teletype_block");
  const [swiper, setSwiper] = useState(null);
  const [slides, setSlides] = useState(null);
  const [swiper_mount, setSwiperMount] = useState(null);
  const tg = window.Telegram.WebApp;
  useEffect(() => {
    fetch("https://pop.applepodsblack.ru/api/stories")
      .then((response) => response.json())
      .then(function (commits) {
        let data = commits.data;
        let buffer = [];
        for (let elem of data) {
          buffer.push(
            <SwiperSlide>
              <div
                className={window.innerWidth < 420 ? 'teletype_block_small' : 'teletype_block'}
                onClick={() => {
                  tg.openLink(`${elem.attributes.link}`, {
                    try_instant_view: true,
                  });
                }}
              >
                <div>
                  <p>{elem.attributes.name}</p>
                </div>
              </div>
            </SwiperSlide>
          );
        }

        setSlides(buffer);
      });
  }, []);
  // useEffect(() => {
  //   setTimeout(() => {
  //     if (swiper && slides.length >= 4) {
  //       swiper.translateTo(-100, 200, false, false);
  //     }
  //   }, 1000);
  // }, [slides]);
  return (
    <div id="teletype_carousel_div">
      <div></div>
      <Swiper
        modules={[FreeMode]}
        freeMode={true}
        slidesPerView={3}
        height={255}
        onSwiper={(s) => {
          setSwiper(s);
          setSwiperMount(true);
          console.log(s);
        }}
      >
        {slides}
      </Swiper>
    </div>
  );
}
export default TeletypeCarousel;
