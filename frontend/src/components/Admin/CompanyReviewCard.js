import React from 'react';
import {Card, Divider, Button} from 'semantic-ui-react';

const CompanyReviewCard = ({review}) => {

  return(
    <Card>
      <Card.Content>
        <Card.Header>{review.review_headline}</Card.Header>
        <Card.Meta>Status: {review.review_status}</Card.Meta>
        <Card.Description>Desc: {review.review_desc}</Card.Description>
        <Divider/>
        <Card.Content>
          <Card.Description>Rating: {review.review_rating}</Card.Description>
          <Card.Description>Pros: {review.review_pros}</Card.Description>
          <Card.Description>Cons: {review.review_cons}</Card.Description>
        </Card.Content>
      </Card.Content>      
    </Card>
  )
}

export default CompanyReviewCard;