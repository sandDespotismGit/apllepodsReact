import arrow_up from'./../images/arrow_up.svg';
import arrow_down from'./../images/arrow_down.svg';
import { useState } from 'react';
function DropDown({header, content}) {
    const [display , setDisplay] = useState('hide')
    const [arrow, setArrow] = useState(arrow_down);
  return (
    <div className='dropdown_component'>
      <div className="functionality_header" id="functional_header" onClick={() => {
        if (display == 'hide'){setDisplay('show'); setArrow(arrow_up)}
        else {setDisplay('hide'); setArrow(arrow_down)}
      }}>
        <p>{header}</p>
        <img src={arrow} id="functional_arrow" />
      </div>
      <div className={`functionality_content ${display}`} id="functional" >
        {content}
      </div>
    </div>
  );
}
export default DropDown;