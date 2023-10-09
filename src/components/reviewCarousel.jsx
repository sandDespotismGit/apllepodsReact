import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ReactDOM } from "react";
import { useState } from "react";
import { useEffect } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import user_def from "./../images/user.png";
function ReviewCarousel() {
  const [review, setReview] = useState("sBlyaaaaa");
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
          buffer.push(
            <SwiperSlide>
              <div className="review">
                <div className="review_header">
                  <div>
                    <img
                      className="review_avatar"
                      src={
                        elem.attributes.avatar.data != null
                          ? "https://pop.applepodsblack.ru/" +
                            elem.attributes.avatar.data.attributes.url
                          : user_def
                      }
                    />
                    <p className="review_name">{elem.attributes.name}</p>
                  </div>
                  <p className="review_date">{elem.attributes.date}</p>
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
      <div>{review}</div>
      <div id="review_button_div">
        <button class="leave_review">Оставить отзыв</button>
      </div>
    </div>
  );
}
export default ReviewCarousel;
