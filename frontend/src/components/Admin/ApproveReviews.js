import React, {useState, useEffect} from 'react';
import {Card, Header} from 'semantic-ui-react';
import './approve.css';
const txtgen = require('txtgen');
const faker = require('faker');
import ReviewCard from './ReviewCard';

var between = (min, max) => {
  return Math.floor(
    Math.random() * (max-min+1)+min
  )
}
var reviews_array = []

for(let i=0;i<10;i++){
  let review = {
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

  useEffect(() => {
    console.log("Called use effect")
    console.log("State: ")
    console.log(reviews)
    let rcards = reviews.map(review => {
      return (
        <ReviewCard review={review}/>
      )
    })
    setCards(rcards);
  })

  return (
    <div>
      <Header as="h1" textAlign="left"><div className="logo">glassdoor</div></Header>
      <Card.Group>
        {cards}
      </Card.Group>
    </div>
  )
};

export default ApproveReviews;