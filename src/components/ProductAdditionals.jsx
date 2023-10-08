import arrow_up from "./../images/arrow_up.svg";
import arrow_down from "./../images/arrow_down.svg";
import DropDown from "./dropDown";
import { useEffect } from "react";
import { useState } from "react";
function ProductAdditionals() {
  const [add_autonomy, setAutonomy] = useState('');
  const [add_mic_quality, setMicQuality] = useState('');
  const [add_sound_quality, setSoundQuality] = useState('');
  const [equipment, setEquipment] = useState('');
  const [functional, setFunctional] = useState('');
  const [chars, setChars] = useState('');
  useEffect(() => {
    fetch("https://pop.applepodsblack.ru/api/products?populate=deep")
      .then((response) => response.json())
      .then(function (commits) {
        let data = commits.data;
        let autonomy_buffer = [];
        let sound_buffer = [];
        let mic_buffer = [];
        let autonomy = data[window.GlobalProductId - 1].attributes.autonomy;
        let quality_mic = data[window.GlobalProductId - 1].attributes.quality_mic;
        let quality_sound = data[window.GlobalProductId - 1].attributes.quality_sound;
        setEquipment(data[window.GlobalProductId - 1].attributes.equipment)
        setFunctional(data[window.GlobalProductId - 1].attributes.functional)
        setChars(data[window.GlobalProductId - 1].attributes.characteristics)
        for (let i = 0; i < 10; i++) {
          if (autonomy > 0 ){
            autonomy_buffer.push(<div className="stats_point audio" style={{background:`var(--Yellow-gradient, linear-gradient(93deg, #F5EA99 -3.52%, #DB9B45 100%))
            `}}></div>);
            autonomy -= 1;
          } else {
            autonomy_buffer.push(<div className="stats_point audio" style={{backgroundColor:`var(--Gray, #4B4B4B)
            `}}></div>)
          }
          
        }
        setAutonomy(autonomy_buffer);
        for (let i = 0; i < 10; i++) {
          if (quality_mic > 0 ){
            mic_buffer.push(<div className="stats_point audio" style={{background:`var(--Yellow-gradient, linear-gradient(93deg, #F5EA99 -3.52%, #DB9B45 100%))
            `}}></div>);
            quality_mic -= 1;
          } else {
            mic_buffer.push(<div className="stats_point audio" style={{backgroundColor:`var(--Gray, #4B4B4B)
            `}}></div>)
          }
          
        }
        setMicQuality(mic_buffer);
        for (let i = 0; i < 10; i++) {
          if (quality_sound > 0 ){
            sound_buffer.push(<div className="stats_point audio" style={{background:`var(--Yellow-gradient, linear-gradient(93deg, #F5EA99 -3.52%, #DB9B45 100%))
            `}}></div>);
            quality_sound -= 1;
          } else {
            sound_buffer.push(<div className="stats_point audio" style={{backgroundColor:`var(--Gray, #4B4B4B)
            `}}></div>)
          }
          
        }
        setSoundQuality(sound_buffer);
      });
  }, []);
  return (
    <div id="addon_info">
      <p>Дополнительная информация</p>
      <div id="stats">
        <div id="stats_inner">
          <div className="stats_row">
            <div className="stats_points">
              {add_sound_quality}
            </div>
            <p>Качество звука</p>
          </div>
          <div className="stats_row">
            <div className="stats_points">
              {add_mic_quality}
            </div>
            <p>Качество микрофона</p>
          </div>
          <div className="stats_row">
            <div className="stats_points">
              {add_autonomy}
            </div>
            <p>Автономность</p>
          </div>
        </div>
      </div>
      <div id="functionality">
        <DropDown header='Комплектация' content={equipment}/>
        <hr style={{width:'100%', borderColor:'var(--Gray, #4B4B4B)'}}></hr>
        <DropDown header='Функционал' content={functional}/>
        <hr style={{width:'100%', borderColor:'var(--Gray, #4B4B4B)'}}></hr>
        <DropDown header='Технические характеристики' content={chars}/>
      </div>
    </div>
  );
}
export default ProductAdditionals;
