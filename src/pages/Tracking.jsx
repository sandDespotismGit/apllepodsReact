import { useState } from "react";
import { useNavigate } from "react-router";

function Tracking() {
  const [tracking, setTracking] = useState("");
  function handle(str, e) {
    console.log(e);
    alert(str);
  }
  const tg = window.Telegram.WebApp;
  const backButton = tg.BackButton;
  const navigate = useNavigate()
  backButton.show();
  backButton.onClick(() => {
    backButton.hide();
    navigate('/');
  });
  async function getTrack(trackNum, eventObj) {
    eventObj.preventDefault();
    const response = await fetch(
      `https://api.track24.ru/tracking.json.php?apiKey=d7bd08383f431cf8913f1eb29585c01a&domain=localhost&pretty=true&code=${trackNum}`
    );
    const track = await response.json();
    console.log(track);
    if (track.status == "ok") {
      setTracking(
        <div className="track_info">
          <p className="track_info_header">Заказ номер {trackNum}</p>
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
    } else {
      setTracking("Ошибка");
    }
  }
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
          <form
            name="tracking"
            onsubmit={(event) =>
              getTrack(
                document.forms.tracking.elements.track_input.value,
                event
              )
            }
          >
            <input
              placeholder="Введите код"
              className="gray_input"
              type="text"
              name="track_input"
              id="track_input"
            />
          </form>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              paddingTop: "10px",
            }}
          >
            <p
              style={{ color: "white" }}
              onClick={(event) => handle("", event)}
              className="button__track"
            >
              Отправить
            </p>
          </div>
        </div>
        {tracking}
      </div>
    </div>
  );
}
export default Tracking;
