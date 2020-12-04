import React, {useState, useEffect} from 'react';
import {Card,  Grid, Pagination} from 'semantic-ui-react';
import Footer from '../Placeholders/Footer';
import AdminHeader from './AdminHeader';
import './approve.css';
// const txtgen = require('txtgen');
// const faker = require('faker');
import ReviewCard from './ReviewCard';
import {NotificationManager, NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import './Placeholders.css';
import axios from 'axios';
import {BACKEND} from '../../Config';

const ApproveReviews = () => {

  const[reviews, setReviews] = useState([])
  const[cards, setCards] = useState([])
  const[current, setCurrent] = useState([]);
  const[totalPages, setTotalPages] = useState(1);

  useEffect(()=>{
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
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
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
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
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
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

  useEffect(()=>{
    var pages = Math.ceil(reviews.length/6);
    setTotalPages(pages);
    setCurrent(reviews.slice(0,6))
  }, [reviews])

  useEffect(() => {
    let rcards = current.map(review => {
      return (
        <ReviewCard review={review} key={review.review_id} handleApprove={() => {reviewApproved(review.review_id)}} handleReject={() => {reviewRejected(review.review_id)}} />
      )
    })
    setCards(rcards);
  }, [current])


  const selectPage = (e, pageInfo) => {
    console.log(pageInfo.activePage)
    var startIdx;
    var endIdx;

    startIdx = (pageInfo.activePage-1)*6;
    endIdx = pageInfo.activePage*6;

    setCurrent(reviews.slice(startIdx, endIdx));
  }

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
        <Grid.Row>
          <Grid.Column width={1}></Grid.Column>
            <Grid.Column>
              <Pagination defaultActivePage={1} totalPages={totalPages} onPageChange={selectPage}/>
            </Grid.Column>
          </Grid.Row>
      </Grid>
      <Footer/>
    </div>
  )
};

export default ApproveReviews;