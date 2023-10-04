import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import useWindowDimensions from "./GetDimensions";
function TeletypeCarousel() {
  const {height, width} = useWindowDimensions();
  return (
    <div id="teletype_carousel_div">
      <div></div>
      <Swiper slidesPerView={width <= 400 ? 2 : 3} modules={[FreeMode]}>
        <SwiperSlide>
          <div className="teletype_block">
            <div>
              <p>Заголовок статьи в три строки</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="teletype_block">
            <div>
              <p>Заголовок статьи в три строки</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="teletype_block">
            <div>
              <p>Заголовок статьи в три строки</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="teletype_block">
            <div>
              <p>Заголовок статьи в три строки</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="teletype_block">
            <div>
              <p>Заголовок статьи в три строки</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
export default TeletypeCarousel;