import arrow_up from "./../images/arrow_up.svg";
import arrow_down from "./../images/arrow_down.svg";
import DropDown from "./dropDown";
import { useEffect } from "react";
import { useState } from "react";
function ProductAdditionals() {
  const [add_autonomy, setAutonomy] = useState("");
  const [add_mic_quality, setMicQuality] = useState("");
  const [add_sound_quality, setSoundQuality] = useState("");
  const [equipment, setEquipment] = useState("");
  const [functional, setFunctional] = useState("");
  const [dropInf, setDropInf] = useState([
    "Качество звука",
    "Качество микрофона",
  ]);
  const [chars, setChars] = useState("");
  useEffect(() => {
    fetch("https://pop.applepodsblack.ru/api/products?populate=deep")
      .then((response) => response.json())
      .then(function (commits) {
        let data = commits.data;
        let autonomy_buffer = [];
        let sound_buffer = [];
        let mic_buffer = [];
        let product = "";
        for (let elem of data) {
          if (elem.id == window.GlobalProductId) product = elem;
        }
        let autonomy = product.attributes.autonomy;
        let quality_mic = product.attributes.quality_mic;
        let quality_sound = product.attributes.quality_sound;
        setEquipment(product.attributes.equipment);
        setFunctional(product.attributes.functional);
        setChars(product.attributes.characteristics);
        for (let i = 0; i < 10; i++) {
          if (autonomy > 0) {
            autonomy_buffer.push(
              <div
                className="stats_point audio"
                style={{
                  background: `var(--Yellow-gradient, linear-gradient(93deg, #F5EA99 -3.52%, #DB9B45 100%))
            `,
                }}
              ></div>
            );
            autonomy -= 1;
          } else {
            autonomy_buffer.push(
              <div
                className="stats_point audio"
                style={{
                  backgroundColor: `var(--Gray, #4B4B4B)
            `,
                }}
              ></div>
            );
          }
        }
        if (window.GlobalProductCategory == "watch")
          setDropInf(["Скорость меню", "Цветопередача"]);
        setAutonomy(autonomy_buffer);
        for (let i = 0; i < 10; i++) {
          if (quality_mic > 0) {
            mic_buffer.push(
              <div
                className="stats_point audio"
                style={{
                  background: `var(--Yellow-gradient, linear-gradient(93deg, #F5EA99 -3.52%, #DB9B45 100%))
            `,
                }}
              ></div>
            );
            quality_mic -= 1;
          } else {
            mic_buffer.push(
              <div
                className="stats_point audio"
                style={{
                  backgroundColor: `var(--Gray, #4B4B4B)
            `,
                }}
              ></div>
            );
          }
        }
        setMicQuality(mic_buffer);
        for (let i = 0; i < 10; i++) {
          if (quality_sound > 0) {
            sound_buffer.push(
              <div
                className="stats_point audio"
                style={{
                  background: `var(--Yellow-gradient, linear-gradient(93deg, #F5EA99 -3.52%, #DB9B45 100%))
            `,
                }}
              ></div>
            );
            quality_sound -= 1;
          } else {
            sound_buffer.push(
              <div
                className="stats_point audio"
                style={{
                  backgroundColor: `var(--Gray, #4B4B4B)
            `,
                }}
              ></div>
            );
          }
        }
        setSoundQuality(sound_buffer);
      });
  }, []);
  return (
    <div id="addon_info">
      <p>Дополнительная информация</p>
      {window.GlobalProductCategory == "dyson" ? (
        ''
      ) : (
        <div id="stats">
          <div id="stats_inner">
            <div className="stats_row">
              <div className="stats_points">{add_sound_quality}</div>
              <p>{dropInf[0]}</p>
            </div>
            <div className="stats_row">
              <div className="stats_points">{add_mic_quality}</div>
              <p>{dropInf[1]}</p>
            </div>
            <div className="stats_row">
              <div className="stats_points">{add_autonomy}</div>
              <p>Автономность</p>
            </div>
          </div>
        </div>
      )}
      <div id="functionality">
        <DropDown header="Комплектация" content={equipment} />
        <hr style={{ width: "100%", borderColor: "var(--Gray, #4B4B4B)" }}></hr>
        <DropDown header="Функционал" content={functional} />
        <hr style={{ width: "100%", borderColor: "var(--Gray, #4B4B4B)" }}></hr>
        <DropDown header="Технические характеристики" content={chars} />
      </div>
    </div>
  );
}
export default ProductAdditionals;
