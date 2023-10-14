import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect } from "react";
import { useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import useWindowDimensions from "./GetDimensions";
function TeletypeCarousel() {
  const {height, width} = useWindowDimensions();
  const [teletype, setTeletype] = useState('teletype_block')
  useEffect(() => {
    if (width < 410){
      setTeletype('teletype_block_small')
    } else if ( width >= 410 ){
      setTeletype('teletype_block')
    }
  })
  return (
    <div id="teletype_carousel_div">
      <div></div>
      <Swiper  modules={[FreeMode]} freeMode={true} slidesPerView={3}>
        <SwiperSlide>
          <div className={teletype}>
            <div>
              <p>Заголовок статьи в три строки</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={teletype}>
            <div>
              <p>Заголовок статьи в три строки</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={teletype}>
            <div>
              <p>Заголовок статьи в три строки</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={teletype}>
            <div>
              <p>Заголовок статьи в три строки</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={teletype}>
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
