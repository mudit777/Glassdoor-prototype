import React, {useState, useEffect, useRef} from 'react';
import Footer from '../Placeholders/Footer';
import {BACKEND} from '../../Config';
import axios from 'axios';
import { Image, Button, Grid, Card } from 'semantic-ui-react';
import CompanyBar from '../CompanyHeaderBar/CompanyBar';
import './Common.css';
import {NotificationManager, NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import UploadPhotosModal from './UploadPhotosModal';
import '../Admin/Placeholders.css';

const AddPhotosByUserForCompany = () => {

  const[photos, setPhotos] = useState([]);
  const[cards, setCards] = useState([]);
  const[modalShow, setModalShow] = useState(false);

  const handleModal = e => {
    e.preventDefault();
    setModalShow(true);
  }

  const handleHide = () => {
    setModalShow(false);
  }

  useEffect(()=>{
    axios.get(`${BACKEND}/getCompanyPhotos/1`)
      .then(res => {
        if(res.status == 200){
          setPhotos(res.data);
        }
      })
      .catch(err=>{
        console.log(err);
      })
  }, []);

  useEffect(()=>{
    let rcards = photos.map(photos=>{
      return (
        <Card key={photos._id}>
          <Image className="card_image" src={photos.photo_path} />
        </Card>
      )      
    });
    setCards(rcards);
  }, [photos]);

  const onSuccess = () => {
    NotificationManager.success('Photos Submitted for Review', '', 1000)
  }

  return(
    <div className="main_div">
      <CompanyBar/>      
      <div className="divider"></div>      
      <div className="photos_body">
      <NotificationContainer/>
        <Grid>
          <Grid.Row>
            <Grid.Column width={13} style={{fontSize:"large"}} verticalAlign="middle" textAlign="left">              
              Amazon Office Photos
            </Grid.Column>
            <Grid.Column width={3}>
              <Button content="Add Photos" className="gd_button Change" style={{border:"1px solid #1861BF "}} onClick={handleModal}/>
              <UploadPhotosModal onHide={handleHide} onSuccess={onSuccess} show={modalShow} url="uploadImageByUserForCompany"/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Card.Group itemsPerRow={3}>
              {cards.length>0?cards:<div className="no_more extra_margin">No Photos to Show, please add some</div>}
            </Card.Group>
          </Grid.Row>
        </Grid>
      </div>
      <Footer/>
    </div>
  );
};

export default AddPhotosByUserForCompany;