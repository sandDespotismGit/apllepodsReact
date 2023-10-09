import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
function OformitPage() {
  const [border, setBorder] = useState([
    "no_border",
    "no_border",
    "no_border",
    "no_border",
  ]);
  const [alert, setAlert] = useState("gray_input");
  const [alertName, setAlertName] = useState("gray_input");
  const [alertLastName, setAlertLastName] = useState("gray_input");
  const handle_submit = (event) => {
    event.preventDefault();
    let last_name = event.target.last_name.value;
    let first_name = event.target.first_name.value;
    let phone = event.target.phone.value;
    let pochta = "сдэк";
    let name = event.target.adress.value;
    let result = "";
    result = last_name + first_name + phone + pochta + name + window.GlobalSum;
    window.GlobalDetails = result;
    console.log(result);
    navigate("/copy");
  };
  const validate = (value, regex) => {
    return Array.from(value.matchAll(regex));
  };
  const tg = window.Telegram.WebApp;
  const backButton = tg.BackButton;
  const navigate = useNavigate();
  function back_page() {
    navigate("/cart");
    backButton.hide();
  }
  backButton.show();
  backButton.onClick(back_page);
  return (
    <div id="oformit_main">
      <p id="oformit_header">Оформление заказа</p>
      <div id="oformit_form_div">
        <p>оформление заказа</p>
        <form onSubmit={handle_submit}>
          <input
            placeholder="Фамилия"
            className={alertLastName}
            type="text"
            name="last_name"
            id="track_input"
            pattern=" /^[a-z ,.'-]+$/g"
            // onChange={(event) => {
            //   if (validate(event.target.value, /^[a-z ,.'-]+$/g).length == 0) {
            //     setAlertLastName("gray_input alert");
            //   } else if (
            //     validate(event.target.value, /^[a-z ,.'-]+$/g).length != 0
            //   ) {
            //     setAlertLastName("gray_input");
            //   }
            // }}
          />
          <input
            placeholder="Имя"
            className={alertName}
            type="text"
            name="first_name"
            id="track_input"
            pattern="/^[a-z ,.'-]+$/g"
            // onChange={(event) => {
            //   if (validate(event.target.value, /^[a-z ,.'-]+$/g).length == 0) {
            //     setAlertName("gray_input alert");
            //   } else if (
            //     validate(event.target.value, /^[a-z ,.'-]+$/g).length != 0
            //   ) {
            //     setAlertName("gray_input");
            //   }
            // }}
          />
          <input
            placeholder="Телефон"
            className={alert}
            type="text"
            name="phone"
            id="track_input"
            pattern="/(?:\+|\d)[\d\-\(\) ]{9,}\d/g"
            // onChange={(event) => {
            //   if (
            //     validate(event.target.value, /(?:\+|\d)[\d\-\(\) ]{9,}\d/g)
            //       .length == 0
            //   ) {
            //     setAlert("gray_input alert");
            //   } else if (
            //     validate(event.target.value, /(?:\+|\d)[\d\-\(\) ]{9,}\d/g)
            //       .length != 0
            //   ) {
            //     setAlert("gray_input");
            //   }
            // }}
          />
          <div id="select_post">
            <Swiper slidesPerView={3} modules={[FreeMode]}>
              <SwiperSlide>
                <div
                  id="cdek"
                  className={border[0]}
                  onClick={() => {
                    console.log(border);
                    if (border[0] != "border")
                      setBorder([
                        "border",
                        "no_border",
                        "no_border",
                        "no_border",
                      ]);
                  }}
                >
                  <p>СДЭК</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div
                  id="pochta"
                  className={border[1]}
                  onClick={() => {
                    console.log(border);
                    if (border[1] != "border")
                      setBorder([
                        "no_border",
                        "border",
                        "no_border",
                        "no_border",
                      ]);
                  }}
                >
                  <p>Почта РФ</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div
                  id="cdek"
                  className={border[2]}
                  onClick={() => {
                    if (border[2] != "border")
                      setBorder([
                        "no_border",
                        "no_border",
                        "border",
                        "no_border",
                      ]);
                  }}
                >
                  <p>БелПочта</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div
                  id="cdek"
                  className={border[3]}
                  onClick={() => {
                    if (border[3] != "border")
                      setBorder([
                        "no_border",
                        "no_border",
                        "no_border",
                        "border",
                      ]);
                  }}
                >
                  <p>Международная доставкаф</p>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          <p>Выберите пункт доставки</p>
          <input
            placeholder="Введите адрес"
            className="gray_input"
            type="text"
            name="adress"
            id="track_input"
          />
          <button
            className="gold_button"
            type="submit"
            style={{ width: "100%", marginTop: "32px" }}
          >
            Оформить заказ
          </button>
        </form>
      </div>
    </div>
  );
}
export default OformitPage;
