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
      <Swiper  modules={[FreeMode]} freeMode={true} slidesPerView={3}>
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
