import React, {useState, useEffect} from 'react';
import {Card} from 'semantic-ui-react';
import Footer from '../Placeholders/Footer';
import AdminHeader from './AdminHeader';
import './approve.css';
const txtgen = require('txtgen');
const faker = require('faker');
import ReviewCard from './ReviewCard';
import {NotificationManager, NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import './Placeholders.css';

var between = (min, max) => {
  return Math.floor(
    Math.random() * (max-min+1)+min
  )
}
var reviews_array = []

for(let i=0;i<10;i++){
  let review = {
    'review_id': i,
    'review_headline': txtgen.sentence(),
    'review_desc': txtgen.sentence(),
    'review_rating': between(1,5),
    'review_pros': txtgen.sentence(),
    'review_cons': txtgen.sentence(),
    'review_helpful':1,
    'review_status': 'Undecided',
    'review_marked_by_company':1,
    'company_id': between(1, 10),
    'student_id':between(1, 10),
    'student_name': faker.name.findName(),
    'company_name': faker.company.companyName()
  }

  reviews_array.push(review)
}

const ApproveReviews = () => {

  const[reviews, setReviews] = useState(reviews_array)
  const[cards, setCards] = useState([])

  const removeReview = review_id => {
    setReviews(reviews.filter((review)=>(review.review_id !== review_id)))
  }

  const reviewApproved = review_id => {
    removeReview(review_id);
    NotificationManager.success('Operation performed', 'Review Approved', 1000)
  }

  const reviewRejected = review_id => {
    removeReview(review_id);
    NotificationManager.success('Operation performed', 'Review Rejected', 1000)
  }

  useEffect(() => {
    console.log("Re running")

    let rcards = reviews.map(review => {
      return (
        <ReviewCard review={review} id={review.review_id} handleApprove={() => {reviewApproved(review.review_id)}} handleReject={() => {reviewRejected(review.review_id)}} />
      )
    })
    setCards(rcards);
  }, [reviews])

  return (
    <div>
      <AdminHeader/>
      <NotificationContainer/>
      <div style={{padding:"6px"}}>
        <Card.Group>
          {cards.length>0?cards:<div className="no_more">No more images</div>}
        </Card.Group>
      </div>
      <Footer/>
    </div>
  )
};

export default ApproveReviews;