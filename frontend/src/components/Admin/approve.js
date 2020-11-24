import React, {useEffect} from 'react';
import {Header} from 'semantic-ui-react';
import './approve.css'
import ApproveCard from './ApproveCard';
import i1 from './i1.jpg';
import i2 from './i2.jpg';

const Approve = () => {
  return (
    <div>
      <Header as="h1" textAlign="left"><div className="logo">glassdoor</div></Header>
      <div className="bodySettings">
        <ApproveCard img_path={i1} type="Reviews"/>
        <ApproveCard img_path={i2} type="Photos"/>
      </div>
    </div>
  )
};

export default Approve;