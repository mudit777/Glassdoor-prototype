import React from 'react';
import {Card, Button, Image} from 'semantic-ui-react';
const PhotoCard = ({photo, handleApprove, handleReject}) => {

  const approveReview = () => {
    handleApprove();
  }

  const rejectReview = () => {
    handleReject();  
  }

  return(
    <Card>
      <Image src={photo.photo_path}/>
      <Card.Content>
        <Card.Header>{photo.photo_owner_name}</Card.Header>
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

export default PhotoCard;