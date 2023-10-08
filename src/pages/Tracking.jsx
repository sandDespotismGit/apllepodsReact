import { useState } from "react";
import { useEffect } from "react";

function Tracking() {
  const [tracking, setTracking] = useState("");
  function handle(str, e){
    console.log(e);
    alert(str);
  }
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
          <p className="track_info_state">{track.data.destinationPostalAddress}</p>
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
      setTracking('Ошибка')
    }
  }
  return (
    <div id="main_tracking">
      <div class="dostavka_content">
        <div>
          <p id="dostavka_header">Доставка</p>
          <p id="advance_help">
            Введите трек-номер , чтобы узнать статус доставки.
          </p>
          <form
            name="tracking"
            onsubmit={(event) => getTrack(document.forms.tracking.elements.track_input.value, event)}
          >
            <input
              placeholder="Введите код"
              className="gray_input"
              type="text"
              name="track_input"
              id="track_input"
            />
          </form>
        </div>
        {tracking}
        <p onClick={(event) => handle('asas', event)}>бля</p>
      </div>
    </div>
  );
}
export default Tracking;
