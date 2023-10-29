import { Button } from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
window.GlobalTrackNums = [];
window.GlobalTrackId = null;

function Tracking() {
  const [tracking, setTracking] = useState("");
  const tg = window.Telegram.WebApp;
  let id = "2222";
  if (tg.initDataUnsafe.user != undefined) {
    id = tg.initDataUnsafe.user.id;
  }
  const backButton = tg.BackButton;
  const navigate = useNavigate();
  backButton.show();
  backButton.onClick(() => {
    backButton.hide();
    navigate("/");
  });

  async function getTrack(track_num, initial) {
    const response = await fetch(
      `https://api.track24.ru/tracking.json.php?apiKey=d7bd08383f431cf8913f1eb29585c01a&domain=localhost&pretty=true&code=${track_num}`
    );
    const track = await response.json();
    console.log(track);

    if (track.status == "ok") {
      window.GlobalTrackNums.push(track_num);
      window.GlobalTrackNums = Array.from(new Set(window.GlobalTrackNums));
      let buffer = Array.from(tracking);
      console.log(buffer);
      alert(buffer.length);
      buffer.push(
        <div className="track_info">
          <p className="track_info_header">Заказ номер {track_num}</p>
          <p className="track_info_addrstate">Адрес доставки:</p>
          <p className="track_info_state">
            {track.data.destinationPostalAddress}
          </p>
          <p className="track_info_addrstate">Текущий статус:</p>
          <p className="track_info_state">
            $
            {
              track.data.events[track.data.events.length - 1]
                .operationAttributeTranslated
            }
          </p>
        </div>
      );
      setTracking(buffer);
      if (initial == false) {
        window.GlobalTrackId != null
          ? fetch(
              `https://pop.applepodsblack.ru/api/orders/${window.GlobalTrackId}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  data: {
                    tgid: id,
                    track: window.GlobalTrackNums,
                    delivery: "other",
                  },
                }),
              }
            )
          : fetch(`https://pop.applepodsblack.ru/api/orders`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                data: {
                  tgid: id,
                  track: window.GlobalTrackNums,
                  delivery: "other",
                },
              }),
            });
      }
    } else {
      console.log("так себе трек номер конечно =/");
    }
  }
  useEffect(() => {
    fetch(`https://pop.applepodsblack.ru/api/orders`)
      .then((response) => response.json())
      .then(async (commits) => {
        let data = commits.data;
        console.log(data);
        for (let elem of data) {
          if (elem.attributes.tgid == id) {
            window.GlobalTrackId = elem.id;
            window.GlobalTrackNums = Array.from(new Set(elem.attributes.track));
            let init_tracks = Array.from(new Set(elem.attributes.track));
            for  (let tracking of init_tracks) {
              await getTrack(tracking, true);
            }
            break;
          }
        }
      });
    // ? fetch(`https://pop.applepodsblack.ru/api/carts/${window.GlobalDbId}`, {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       data: {
    //         tgid: id,
    //         orders: window.GlobalShoppingCart,
    //         colors: window.GlobalProductColors,
    //       },
    //     }),
    //   })
    // : fetch(`https://pop.applepodsblack.ru/api/carts`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       data: {
    //         tgid: id,
    //         orders: window.GlobalShoppingCart,
    //         colors: window.GlobalProductColors,
    //       },
    //     }),
    //   });
  }, []);
  return (
    <div id="main_tracking">
      <div class="dostavka_content">
        <div className="main_tracking">
          <h1
            id="dostavka_header"
            style={{ fontSize: "24px", textAlign: "center" }}
          >
            Доставка
          </h1>
          <p id="advance_help">
            Введите трек-номер , чтобы узнать статус доставки.
          </p>
          <Formik
            initialValues={{ track: "" }}
            onSubmit={(values) => {
              if (!window.GlobalTrackNums.includes(values.track))
                getTrack(values.track, false);
            }}
          >
            <Form>
              <Field
                className="gray_input"
                id="track_input"
                type="text"
                name="track"
              />
            </Form>
          </Formik>
          {tracking}
        </div>
      </div>
    </div>
  );
}
export default Tracking;
