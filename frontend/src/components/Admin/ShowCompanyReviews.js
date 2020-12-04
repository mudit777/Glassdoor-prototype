import React, {useState, useEffect} from 'react';
import AdminHeader from './AdminHeader';
import Footer from '../Placeholders/Footer';
import './Placeholders.css';
import axios from 'axios';
import { BACKEND } from '../../Config';
import CompanyReviewCard from './CompanyReviewCard';
import {Card} from 'semantic-ui-react';

const ShowCompanyReviews = ({location}) => {
  const[reviews, setReviews] = useState([]);
  const[cards, setCards] = useState([]);

  //this effect fetches data on mount
  useEffect(()=>{
    console.log("Fetch data for company_id: "+location.state.company_id)
    if(location.state.company_id !== undefined){
      axios.get(`${BACKEND}/getCompanyReviews/`+location.state.company_id)
      .then(response => {
        setReviews(response.data)
      })
      .catch(err => {
        console.log("Axios err", err);
      })
    }    
  }, [])

  useEffect(() => {
    let rcards = reviews.map(review => {
      return (
        <CompanyReviewCard review={review} key={review.review_id}/>
      )
    })
    setCards(rcards);
  }, [reviews])
  
  return (
    <div>
      <AdminHeader/>
      <div style={{padding:"6px"}}>
        <Card.Group>
          {cards.length>0?cards:<div className="no_more">No more reviews</div>}
        </Card.Group>
      </div>      
      <Footer/>
    </div>
  )
};

export default ShowCompanyReviews;