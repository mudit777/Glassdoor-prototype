import React, {useState, useEffect, useRef} from 'react';
<<<<<<< HEAD
import Footer from '../Placeholders/Footer';
=======
>>>>>>> fb6fde92132bbb153f8e1627e3303d7d6fa28740
import {BACKEND} from '../../Config';
import axios from 'axios';
import { Image, Button, Grid, Card } from 'semantic-ui-react';
import CompanyBar from '../CompanyHeaderBar/CompanyBar';
import './Common.css';
import {NotificationManager, NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import UploadPhotosModal from './UploadPhotosModal';
<<<<<<< HEAD
import '../Admin/Placeholders.css';

const AddPhotosByUserForCompany = () => {

  const[photos, setPhotos] = useState([]);
=======
import Footer from '../Footer/Footer';
import './Placeholders.css';
import CompanyHeaderBar from '../CompanyHeaderBar/CompanyHeaderBar';


const AddPhotosByUserForCompany = ({location}) => {

  const[photos, setPhotos] = useState([]);

  const[company, setCompany] = useState([]);
  const[salary, setSalary] = useState([]);
  const[jobs, setJobs] = useState([]);
  const[reviews, setReviews] = useState([]);
>>>>>>> fb6fde92132bbb153f8e1627e3303d7d6fa28740
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
<<<<<<< HEAD
    axios.get(`${BACKEND}/getCompanyPhotos/1`)
=======
    var company = {
      company_id : location.state.company_id
    }
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
    axios.post(`${BACKEND}/getCompanyDetails`, company).then(response => {
        if(response.status === 200)
        {
            console.log(response.data)
           
                setCompany(response.data)
          
        }
    })
    axios.post(`${BACKEND}/getCompanySalary`, company).then(response => {
        console.log('salary')
        if(response.status === 200)
        {
            console.log(response.data,'salary')
            setSalary(response.data)
        }
    })
    axios.post(`${BACKEND}/getJob`, company).then(response => {
        if(response.status === 200)
        {
            console.log(response.data)
            setJobs(response.data)
        }
    })
    axios.post(`${BACKEND}/getCompanyReviews`,company)
    .then(response => {
        console.log("Status Code in Getting Reviews : ",response.status);
        if(response.status === 200){
            console.log("HERE IN ACTIONS - GETTING REVIEWS!")
            console.log(response.data);
            setReviews(response.data)
            // Object.keys(this.state.reviews).map(i=>{
            //     console.log("REVIEW IS",this.state.reviews[i].review_cons)
            // })
        }else{
        }
    })
    .catch(err => {
        
    })
  },[])

  useEffect(()=>{
    axios.get(`${BACKEND}/getCompanyPhotos/`+location.state.company_id)
>>>>>>> fb6fde92132bbb153f8e1627e3303d7d6fa28740
      .then(res => {
        if(res.status == 200){
          setPhotos(res.data);
        }
      })
      .catch(err=>{
        console.log(err);
      })
<<<<<<< HEAD
  }, []);
=======
  },[]);
>>>>>>> fb6fde92132bbb153f8e1627e3303d7d6fa28740

  useEffect(()=>{
    let rcards = photos.map(photos=>{
      return (
        <Card key={photos._id}>
          <Image className="card_image" src={photos.photo_path} />
        </Card>
      )      
    });
<<<<<<< HEAD
    setCards(rcards);
  }, [photos]);

  const onSuccess = () => {
    NotificationManager.success('Photos Submitted for Review', '', 1000)
  }

  return(
    <div className="main_div">
      <CompanyBar/>      
=======

    setCards(rcards);
  }, [photos]);

  

const onSuccess = () => {
  NotificationManager.success('Photos Submitted for Review', '', 1000)
}
  
  return(
    <div style={{paddingTop:'1rem'}}>
    <div className="main_div">
    <CompanyHeaderBar type='student'/>

      <CompanyBar total_reviews = {reviews.length} company_id={sessionStorage.getItem("company_id")} total_salary = {salary.length} total_jobs = {jobs.length} company = {company}/>
>>>>>>> fb6fde92132bbb153f8e1627e3303d7d6fa28740
      <div className="divider"></div>      
      <div className="photos_body">
      <NotificationContainer/>
        <Grid>
          <Grid.Row>
            <Grid.Column width={13} style={{fontSize:"large"}} verticalAlign="middle" textAlign="left">              
<<<<<<< HEAD
              Amazon Office Photos
            </Grid.Column>
            <Grid.Column width={3}>
              <Button content="Add Photos" className="gd_button Change" style={{border:"1px solid #1861BF "}} onClick={handleModal}/>
              <UploadPhotosModal onHide={handleHide} onSuccess={onSuccess} show={modalShow} url="uploadImageByUserForCompany"/>
=======
              {location.state.company_name} Office Photos
            </Grid.Column>
            <Grid.Column width={3}>
              <Button content="Add Photos" className="gd_button Change" style={{border:"1px solid #1861BF "}} onClick={handleModal}/>
              <UploadPhotosModal onHide={handleHide} onSuccess={onSuccess} show={modalShow} name={location.state.company_name} company_id={location.state.company_id} student_id={sessionStorage.getItem('student_id')} url="uploadImageByUserForCompany"/>
>>>>>>> fb6fde92132bbb153f8e1627e3303d7d6fa28740
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Card.Group itemsPerRow={3}>
<<<<<<< HEAD
              {cards.length>0?cards:<div className="no_more extra_margin">No Photos to Show, please add some</div>}
=======
            {cards.length>0?cards:<div className="no_more extra_margin">No Photos to Show, please add some</div>}
>>>>>>> fb6fde92132bbb153f8e1627e3303d7d6fa28740
            </Card.Group>
          </Grid.Row>
        </Grid>
      </div>
<<<<<<< HEAD
      <Footer/>
=======
    </div>
    <Footer/>

>>>>>>> fb6fde92132bbb153f8e1627e3303d7d6fa28740
    </div>
  );
};

<<<<<<< HEAD
export default AddPhotosByUserForCompany;
=======
export default AddPhotosByUserForCompany;
>>>>>>> fb6fde92132bbb153f8e1627e3303d7d6fa28740
