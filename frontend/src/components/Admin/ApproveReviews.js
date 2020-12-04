import React, {useState, useEffect} from 'react';
import {Card,  Grid} from 'semantic-ui-react';
import Footer from '../Placeholders/Footer';
import AdminHeader from './AdminHeader';
import './approve.css';
<<<<<<< HEAD
const txtgen = require('txtgen');
const faker = require('faker');
=======
// const txtgen = require('txtgen');
// const faker = require('faker');
>>>>>>> fb6fde92132bbb153f8e1627e3303d7d6fa28740
import ReviewCard from './ReviewCard';
import {NotificationManager, NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import './Placeholders.css';
import axios from 'axios';
import {BACKEND} from '../../Config';

const ApproveReviews = () => {

  const[reviews, setReviews] = useState([])
  const[cards, setCards] = useState([])

  useEffect(()=>{
    axios.get(`${BACKEND}/getUndecidedReviews`)
    .then(response=>{
      setReviews(response.data);
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  const removeReview = review_id => {
    setReviews(reviews.filter((review)=>(review.review_id !== review_id)))
  }

  const reviewApproved = review_id => {
    axios.post(`${BACKEND}/approveReview`, {review_id})
    .then(response => {      
      if(response.status === 200){
        removeReview(review_id);
        NotificationManager.success('Operation performed', 'Review Approved', 1000)
      }
      else{
        NotificationManager.error('Server error', 'Review Not Approved. Try Again', 1000)
      }
    })
  }

  const reviewRejected = review_id => {
    axios.post(`${BACKEND}/rejectReview`, {review_id})
    .then(response => {      
      if(response.status === 200){
        removeReview(review_id);
        NotificationManager.success('Operation performed', 'Review Rejected', 1000)
      }
      else{
        NotificationManager.error('Server error', 'Review Not Rejected. Try Again', 1000)
      }
    })
  }

  useEffect(() => {
    let rcards = reviews.map(review => {
      return (
        <ReviewCard review={review} key={review.review_id} handleApprove={() => {reviewApproved(review.review_id)}} handleReject={() => {reviewRejected(review.review_id)}} />
      )
    })
    setCards(rcards);
  }, [reviews])

  return (
    <div>
      <AdminHeader/>
      <NotificationContainer/>
      <Grid>
        <Grid.Row>
          <Grid.Column width={1}></Grid.Column>
          <Grid.Column width={14}>
            <Card.Group itemsPerRow={3}>
              {cards.length>0?cards:<div className="no_more">No more reviews</div>}
            </Card.Group>
          </Grid.Column>
          <Grid.Column width={1}></Grid.Column>
        </Grid.Row>
      </Grid>
      <Footer/>
    </div>
  )
};

export default ApproveReviews;