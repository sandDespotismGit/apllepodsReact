import { SwiperSlide, Swiper } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { useState } from "react";
import { useEffect } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import user_def from "./../images/user.png";
function ReviewCarousel() {
  const tg = window.Telegram.WebApp;
  const [review, setReview] = useState("");
  const [swiper, setSwiper] = useState(null);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  // useEffect(() => {
  //   setTimeout(() => {
  //     if (swiper) {
  //       swiper.translateTo(-100, 200, false, false);
  //     }
  //   }, 1000)
  // });

  useEffect(() => {
    fetch("https://pop.applepodsblack.ru/api/reviews?populate=deep")
      .then((response) => response.json())
      .then(function (commits) {
        console.log(commits);
        let data = commits.data;
        let buffer = [];

        for (let elem of data) {
          console.log(elem.attributes.photo);
          let photo_buffer = [];
          {
            for (let photo of elem.attributes.photo.data) {
              photo_buffer.push(
                <img
                  src={"https://pop.applepodsblack.ru/" + photo.attributes.url}
                ></img>
              );
            }
          }
          const date = new Date(elem.attributes.date);

          buffer.push(
            <SwiperSlide>
              <div className="review">
                <div className="review_header">
                  <div style={{ display: "flex", flexDirection: "row", alignItems: 'center' }}>
                    <img
                      className="review_avatar"
                      src={
                        elem.attributes.avatar.data != null
                          ? "https://pop.applepodsblack.ru/" +
                            elem.attributes.avatar.data.attributes.url
                          : user_def
                      }
                    />
                    <div>
                      <p className="review_name">{elem.attributes.name}</p>
                      <p className="review_date">
                        {date.toLocaleDateString("ru-RU", options)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="review_images">{photo_buffer}</div>
                <p className="review_comment">{elem.attributes.text}</p>
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
      <div>
        <Swiper modules={[FreeMode]} freeMode={true} onSwiper={(s)=> setSwiper(s)}>
          {review}
        </Swiper>
        
        </div>
      <div id="review_button_div">
        <button class="leave_review" onClick={()=> tg.sendData('comment')}>Оставить отзыв</button>
      </div>
    </div>
  );
}
export default ReviewCarousel;
