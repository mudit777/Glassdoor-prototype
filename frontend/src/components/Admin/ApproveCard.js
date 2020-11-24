import React, {useState} from 'react';
import './ApproveCard.css';
import {useHistory} from 'react-router-dom';

const ApproveCard = ({img_path, type}) => {
  const history = useHistory();
  const [hover, setHover] = useState('');

  const redirectFunction = () => {
    history.push('/approve'+type)
  }

  return (
    <div className={`card_style `+hover} onClick={redirectFunction} onMouseOver={()=>{setHover('hover')}} onMouseOut={()=>{setHover('')}}>
      <img src={img_path} className="center"/>
      <h1 className="card_text">Approve User {type}</h1>
    </div>
  )  
}

export default ApproveCard;