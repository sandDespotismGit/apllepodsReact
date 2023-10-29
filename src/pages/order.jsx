import { useState } from "react";
import { useNavigate } from "react-router";
import useWindowDimensions from "../components/GetDimensions";
import cdek from "./../images/cdek.svg";
import russian_post from "./../images/russianPost.svg";
import apple from "./../images/gold_apple.svg";
import { FormControl } from "@chakra-ui/react";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { Formik, Form, Field } from "formik";
import { useEffect } from "react";
import * as yup from "yup";

function OformitPage() {
  const [border, setBorder] = useState([
    "no_border",
    "no_border",
    "no_border",
    "no_border",
  ]);
  const { height, width } = useWindowDimensions();
  const [block, setBlock] = useState("cdek");

  const FormSchema = yup.object().shape({
    last_name: yup.string().required("Обязательное поле"),
    first_name: yup.string().required("Обязательное поле"),
    phone: yup
      .string()
      .matches(/(\+?[\d-\(][\d-\)\s]{6,}\d$)/, "Неверный номер телефона"),
    adress: yup.string().required("Обязательное поле"),
  });

  const handle_submit = (values) => {
    let last_name = values.last_name;
    let first_name = values.first_name;
    let phone = values.phone;
    let pochta = "сдэк";
    let name = values.adress;
    let result = "";
    let a = "";
    for (let i = 0; i < window.GlobalProductColors.length; i++) {
      a += `название ${window.GlobalCartNames[i]}  цвета ${window.GlobalProductColors[i]} \n`;
    }
    result = 
`Здравствуйте , хочу сделать заказ! 
Мои данные для заказа:
ФИО: ${first_name} ${last_name}
ТЕЛЕФОН: ${phone}
АДРЕС: ${name}
ДОСТАВКА: ${window.GlobalPost}
СУММА: ${window.GlobalSum}
ТОВАРЫ: 
${a}

Жду от вас обратной связи`;
    window.GlobalDetails = result;
    console.log(result);
    navigate("/copy");
  };

  const tg = window.Telegram.WebApp;
  const backButton = tg.BackButton;
  const navigate = useNavigate();
  function back_page() {
    navigate("/cart");
  }

  backButton.show();
  backButton.onClick(back_page);

  const initialValues = {
    last_name: "",
    first_name: "",
    phone: "",
    pochta: "сдэк",
    adress: "",
  };
  useEffect(() => {
    if (width <= 410) setBlock("cdek_small");
    else setBlock("cdek");
  });

  return (
    <div id="oformit_main">
      <p id="oformit_header">Оформление заказа</p>
      <div id="oformit_form_div">
        <Formik
          initialValues={initialValues}
          validationSchema={FormSchema}
          onSubmit={handle_submit}
          key="trade-form"
        >
          {(formik) => (
            <Form>
              <Field name="last_name">
                {({ field, form }) => (
                  <FormControl
                    isRequired
                    isInvalid={
                      !!form.values.last_name && !!form.errors.last_name
                    }
                  >
                    <input
                      {...field}
                      placeholder="Фамилия"
                      className="gray_input"
                      type="text"
                      id="last_name"
                      w="100%"
                    />
                    {form.errors.last_name && (
                      <label style={{ color: "red" }}>
                        {form.errors.last_name}
                      </label>
                    )}
                  </FormControl>
                )}
              </Field>
              <Field name="first_name">
                {({ field, form }) => (
                  <FormControl
                    isRequired
                    isInvalid={
                      !!form.values.first_name && !!form.errors.first_name
                    }
                  >
                    <input
                      {...field}
                      placeholder="Имя"
                      className="gray_input"
                      type="text"
                      id="first_name"
                      w="100%"
                    />
                    {form.errors.first_name && (
                      <label style={{ color: "red" }}>
                        {form.errors.first_name}
                      </label>
                    )}
                  </FormControl>
                )}
              </Field>
              <Field name="phone">
                {({ field, form }) => (
                  <FormControl
                    isRequired
                    isInvalid={!!form.values.phone && !!form.errors.phone}
                  >
                    <input
                      {...field}
                      placeholder="Номер телефона"
                      className="gray_input"
                      type="number"
                      id="phone"
                      w="100%"
                    />
                    {form.errors.phone && (
                      <label style={{ color: "red" }}>
                        {form.errors.phone}
                      </label>
                    )}
                  </FormControl>
                )}
              </Field>
              <Swiper
                slidesPerView={3}
                modules={[FreeMode]}
                style={{ padding: "10px 0px" }}
              >
                <SwiperSlide>
                  <div
                    id={block}
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
                      window.GlobalPost = "сдэк";
                    }}
                  >
                    <p>СДЭК</p>
                    <img
                      src={cdek}
                      style={{ width: "90px", height: "30px" }}
                    ></img>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div
                    id={block}
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
                      window.GlobalPost = "почта России";
                    }}
                  >
                    <p>Почта России</p>
                    <img
                      src={russian_post}
                      style={{ width: "90px", height: "30px" }}
                    ></img>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div
                    id={block}
                    className={border[2]}
                    onClick={() => {
                      if (border[2] != "border")
                        setBorder([
                          "no_border",
                          "no_border",
                          "border",
                          "no_border",
                        ]);
                      window.GlobalPost = "почта по миру";
                    }}
                  >
                    <p>Почта по миру</p>
                    <img
                      src={apple}
                      style={{ width: "90px", height: "30px" }}
                    ></img>
                  </div>
                </SwiperSlide>
              </Swiper>
              <p style={{ padding: "0px" }}>Выберите пункт доставки</p>
              <Field name="adress">
                {({ field, form }) => (
                  <FormControl
                    isRequired
                    isInvalid={!!form.values.adress && !!form.errors.adress}
                  >
                    <input
                      {...field}
                      placeholder="Введите адрес"
                      className="gray_input"
                      type="text"
                      id="adress"
                      w="100%"
                    />
                    {form.errors.adress && (
                      <label style={{ color: "red" }}>
                        {form.errors.adress}
                      </label>
                    )}
                  </FormControl>
                )}
              </Field>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                <button
                  className="gold_button"
                  type="submit"
                  disabled={
                    !formik.values.last_name ||
                    !formik.values.first_name ||
                    !formik.values.phone ||
                    !formik.values.adress ||
                    !!formik.errors.last_name ||
                    !!formik.errors.first_name ||
                    !!formik.errors.phone ||
                    !!formik.errors.adress
                  }
                >
                  Оформить заказ
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div>
        <p id="caution">ОПЛАТА ЗАКАЗА ПРОИСХОДИТ ТОЛЬКО У МЕНЕДЖЕРА</p>
      </div>
    </div>
  );
}
export default OformitPage;
