import React,{useState, useEffect} from 'react';
import AdminHeader from './AdminHeader';
const faker = require('faker')
import {NotificationManager, NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import PhotoCard from './PhotoCard';
import Footer from '../Placeholders/Footer';
import {Card} from 'semantic-ui-react';
import './Placeholders.css';
//remove these imports

//till here
var photos_array = []

for(let i=0;i<10;i++){
  let photo = {
    'photo_id':i,
    'photo_path': "i"+(i+5)+".jpg",
    'student_name': faker.name.findName()
  }

  photos_array.push(photo)
}

const ApprovePhotos = () => {

  const[photos, setPhotos] = useState(photos_array);
  const[cards, setCards] = useState([])

  useEffect(() => {
    console.log("Re running")

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
    removePhoto(photo_id);
    NotificationManager.success('Operation performed', 'Photo Approved', 1000)
  }

  const photoRejected = photo_id => {
    removePhoto(photo_id);
    NotificationManager.success('Operation performed', 'Photo Rejected', 1000)
  }

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

export default ApprovePhotos;