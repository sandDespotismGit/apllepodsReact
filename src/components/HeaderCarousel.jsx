import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { useEffect } from "react";
import "swiper/css";
import { useState } from "react";
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { delay } from "lodash";

function HeaderCarousel() {
  const [message, setMessage] = useState("sBlyaaaaa");
  useEffect(() => {
    fetch("https://pop.applepodsblack.ru/api/notifications")
      .then((response) => response.json())
      .then(function (commits) {
        let data = commits.data;
        let buffer = [];
        for (let elem of data) {
          buffer.push(
            <SwiperSlide>
              <div className="header_message" style={{marginBottom:'28px'}}>
                <div id="header_message_left">
                  <p id="manager_name">Артем</p>
                  <p id="manager_position">Менеджер</p>
                </div>
                <div id="header_message_right">
                  <p>{elem.attributes.text}</p>
                </div>
              </div>
            </SwiperSlide>
          );
        }
        setMessage(buffer);
      });
  }, []);
  return (
    <div className="header_message_carousel">
      <Swiper modules={[FreeMode, Pagination, Autoplay]} freeMode={true} pagination={true} autoplay={{delay:3000, disableOnInteraction: false}}>
        {message}
      </Swiper>
    </div>
  );
}
export default HeaderCarousel;
