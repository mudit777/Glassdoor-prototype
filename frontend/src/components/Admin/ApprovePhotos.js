import React,{useState, useEffect} from 'react';
import AdminHeader from './AdminHeader';
const faker = require('faker')
import {NotificationManager, NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import PhotoCard from './PhotoCard';
import Footer from '../Placeholders/Footer';
import {Card, Grid} from 'semantic-ui-react';
import './Placeholders.css';
import {BACKEND} from '../../Config';
import axios from 'axios';
//remove these imports

//till here

const ApprovePhotos = () => {

  const[photos, setPhotos] = useState([]);
  const[cards, setCards] = useState([])

  useEffect(()=>{
    console.log("Fetching undecided photos")
    axios.get(`${BACKEND}/getUndecidedPhotos`)
    .then(response=>{
      console.log(response)
      setPhotos(response.data);
    })
    .catch(err=>{
      console.log(err);
    })
  }, [])

  useEffect(() => {
    let rcards = photos.map(photo => {
      return (
        <PhotoCard photo={photo} id={photo.photo_id} handleApprove={() => {photoApproved(photo.photo_id)}} handleReject={() => {photoRejected(photo.photo_id)}} />
      )
    })
    setCards(rcards);
  }, [photos])

  const removePhoto = photo_id => {
    setPhotos(photos.filter((photo)=>(photo.photo_id !== photo_id)))
  }

  const photoApproved = photo_id => {
    axios.post(`${BACKEND}/approvePhoto`, {photo_id})
    .then(response => {      
      if(response.status === 200){
        removePhoto(photo_id);
        NotificationManager.success('Operation performed', 'Photo Approved', 1000)
      }
      else{
        NotificationManager.error('Server error', 'Photo Not Approved. Try Again', 1000)
      }
    })
  }

  const photoRejected = photo_id => {
    axios.post(`${BACKEND}/rejectPhoto`, {photo_id})
    .then(response => {      
      if(response.status === 200){
        removePhoto(photo_id);
        NotificationManager.success('Operation performed', 'Photo Rejected', 1000)
      }
      else{
        NotificationManager.error('Server error', 'Photo Not Rejected. Try Again', 1000)
      }
    })    
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
              {cards.length>0?cards:<div className="no_more">No more images</div>}
            </Card.Group>
          </Grid.Column>
          <Grid.Column width={1}></Grid.Column>
        </Grid.Row>
      </Grid>
      <Footer/>
    </div>
  )
};

export default ApprovePhotos;