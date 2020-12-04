import React, {useState, useEffect, useRef} from 'react';
import {BACKEND} from '../../Config';
import axios from 'axios';
import { Image, Button, Grid, Card, Pagination } from 'semantic-ui-react';
import CompanyBar from '../CompanyHeaderBar/CompanyBar';
import './Common.css';
import {NotificationManager, NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import UploadPhotosModal from './UploadPhotosModal';
import Footer from '../Footer/Footer';
import './Placeholders.css';
import CompanyHeaderBar from '../CompanyHeaderBar/CompanyHeaderBar';


const AddPhotosByCompany = ({location}) => {

  const[photos, setPhotos] = useState([]);

  const[company, setCompany] = useState([]);
  const[salary, setSalary] = useState([]);
  const[jobs, setJobs] = useState([]);
  const[reviews, setReviews] = useState([]);
  const[cards, setCards] = useState([]);
  const[uploaded, setUploaded] = useState(0);
  const[modalShow, setModalShow] = useState(false);
  const[current, setCurrent] = useState([]);
  const[totalPages, setTotalPages] = useState(1);

  const handleModal = e => {
    e.preventDefault();
    setModalShow(true);
  }

  const handleHide = () => {
    setModalShow(false);
  }

  useEffect(()=>{
    var company = {
      company_id : sessionStorage.getItem("company_id")
    }
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
    axios.post(`${BACKEND}/getCompanyDetails`, company).then(response => {
        if(response.status === 200)
        {
            console.log(response.data)
           
                setCompany(response.data)
          
        }
    })
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
    axios.post(`${BACKEND}/getCompanySalary`, company).then(response => {
        console.log('salary')
        if(response.status === 200)
        {
            console.log(response.data,'salary')
            setSalary(response.data)
        }
    })
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
    axios.post(`${BACKEND}/getJob`, company).then(response => {
        if(response.status === 200)
        {
            console.log(response.data)
            setJobs(response.data)
        }
    })
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
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
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
    axios.get(`${BACKEND}/getCompanyPhotos/`+location.state.company_id)
      .then(res => {
        if(res.status == 200){
          setPhotos(res.data);
        }
      })
      .catch(err=>{
        console.log(err);
      })
  }, [uploaded]);

  useEffect(()=>{
    var pages = Math.ceil(photos.length/6);
    setTotalPages(pages);
    setCurrent(photos.slice(0,6))

  }, [photos])

  useEffect(()=>{
    let rcards = current.map(photos=>{
      return (
        <Card key={photos._id}>
          <Image className="card_image" src={photos.photo_path} />
        </Card>
      )      
    });

    setCards(rcards);
  }, [current]);


  const selectPage = (e, pageInfo) => {
    console.log(pageInfo.activePage)
    var startIdx;
    var endIdx;

    startIdx = (pageInfo.activePage-1)*6;
    endIdx = pageInfo.activePage*6;

    setCurrent(photos.slice(startIdx, endIdx));
  }

  const onSuccess = () => {
    NotificationManager.success('Photos Uploaded', '', 1000)
    setUploaded(uploaded+1);
  }
  
  return(
    <div style={{paddingTop:"1rem"}}>
    <div className="main_div">
    <CompanyHeaderBar type='company'/>

      <CompanyBar total_reviews = {reviews.length} company_id={sessionStorage.getItem("company_id")} total_salary = {salary.length} total_jobs = {jobs.length} company = {company}/>
      <div className="divider"></div>      
      <div className="photos_body">
      <NotificationContainer/>
        <Grid>
          <Grid.Row>
            <Grid.Column width={13} style={{fontSize:"large"}} verticalAlign="middle" textAlign="left">              
              {location.state.company_name} Office Photos
            </Grid.Column>
            <Grid.Column width={3}>
              <Button content="Add Photos" className="gd_button Change" style={{border:"1px solid #1861BF "}} onClick={handleModal}/>
              <UploadPhotosModal onHide={handleHide} onSuccess={onSuccess} show={modalShow} name={location.state.company_name} student_id='-1' company_id={sessionStorage.getItem('company_id')} url="uploadImageCompany"/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Card.Group itemsPerRow={3}>
            {cards.length>0?cards:<div className="no_more extra_margin">No Photos to Show, please add some</div>}
            </Card.Group>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Pagination defaultActivePage={1} totalPages={totalPages} onPageChange={selectPage}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
    <Footer/>

    </div>
  );
};

export default AddPhotosByCompany;