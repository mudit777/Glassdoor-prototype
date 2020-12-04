import React, {useState} from 'react';
import './ApproveCard.css';
import {useHistory} from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';

const ApproveCard = ({img_path, type, to}) => {
  const history = useHistory();

  const redirectFunction = () => {
    history.push(to)
  }

  return (
    <Card onClick={redirectFunction}>
      <Image src={img_path} className="approve_image"/>
      <Card.Content>        
        <Card.Header>{type}</Card.Header>        
      </Card.Content>
    </Card>
  )  
}

export default ApproveCard;