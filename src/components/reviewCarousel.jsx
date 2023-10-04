import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ReactDOM } from "react";
import { useState } from "react";
import { useEffect } from "react";
import "swiper/css";
import "swiper/css/free-mode";
function ReviewCarousel() {
  const [review, setReview] = useState("sBlyaaaaa");
  useEffect(() => {
    fetch("https://pop.applepodsblack.ru/api/reviews")
      .then((response) => response.json())
      .then(function (commits) {
        console.log(commits);
        let data = commits.data;
        let buffer = [];

        for (let elem of data) {
          buffer.push(
            <SwiperSlide>
              <div>
                <div className="review">
                  <p className="review_name">{elem.attributes.name}</p>
                  <p className="review_comment">{elem.attributes.text}</p>
                </div>
              </div>
            </SwiperSlide>
          );
        }
        setReview(buffer);
      });
  }, []);

  return (
    <div>
      <div id="header_production">
        <p>Отзывы о нашем магазине</p>
      </div>
      <Swiper slidesPerView={1} modules={[FreeMode]}>
        {review}
      </Swiper>
      <div id="review_button_div">
        <button class="leave_review">Оставить отзыв</button>
      </div>
    </div>
  );
}
export default ReviewCarousel;
