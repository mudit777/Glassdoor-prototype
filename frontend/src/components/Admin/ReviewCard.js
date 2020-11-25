import React from 'react';
import {Card, Divider, Button} from 'semantic-ui-react';

const ReviewCard = ({review, handleApprove, handleReject}) => {

  const approveReview = () => {
    handleApprove();
  }

  const rejectReview = () => {
    handleReject();  
  }

  return(
    <Card>
      <Card.Content>
        <Card.Header>{review.review_headline}</Card.Header>
        <Card.Meta>Posted by {review.student_name} for {review.company_name}</Card.Meta>
        <Card.Description>Desc: {review.review_desc}</Card.Description>
        <Divider/>
        <Card.Content>
          <Card.Description>Rating: {review.review_rating}</Card.Description>
          <Card.Description>Pros: {review.review_pros}</Card.Description>
          <Card.Description>Cons: {review.review_cons}</Card.Description>
        </Card.Content>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button basic color="green" onClick={approveReview}>Approve</Button>
          <Button basic color="red" onClick={rejectReview}>Reject</Button>
        </div>
      </Card.Content>
    </Card>
  )
}

export default ReviewCard;