import React,{useState, useEffect} from 'react';
import AdminHeader from './AdminHeader';
import {NotificationManager, NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import PhotoCard from './PhotoCard';
import Footer from '../Placeholders/Footer';
import {Card, Grid, Pagination} from 'semantic-ui-react';
import './Placeholders.css';
import {BACKEND} from '../../Config';
import axios from 'axios';
//remove these imports

//till here

const ApprovePhotos = () => {

  const[photos, setPhotos] = useState([]);
  const[cards, setCards] = useState([])
  const[current, setCurrent] = useState([]);
  const[totalPages, setTotalPages] = useState(1);

  useEffect(()=>{
    console.log("Fetching undecided photos")
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
    axios.get(`${BACKEND}/getUndecidedPhotos`)
    .then(response=>{
      setPhotos(response.data);
    })
    .catch(err=>{
      console.log(err);
    })
  }, [])

  useEffect(()=>{
    var pages = Math.ceil(photos.length/6);
    setTotalPages(pages);
    setCurrent(photos.slice(0,6))
  }, [photos])

  useEffect(() => {
    let rcards = current.map(photo => {
      return (
        <PhotoCard photo={photo} key={photo._id} handleApprove={() => {photoApproved(photo._id)}} handleReject={() => {photoRejected(photo._id)}} />
      )
    })
    setCards(rcards);
  }, [current])

  const removePhoto = photo_id => {
    setPhotos(photos.filter((photo)=>(photo._id !== photo_id)))
  }

  const selectPage = (e, pageInfo) => {
    console.log(pageInfo.activePage)
    var startIdx;
    var endIdx;

    startIdx = (pageInfo.activePage-1)*6;
    endIdx = pageInfo.activePage*6;

    setCurrent(photos.slice(startIdx, endIdx));
  }

  const photoApproved = photo_id => {
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
    axios.post(`${BACKEND}/approvePhoto`, {_id:photo_id})
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
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
    axios.post(`${BACKEND}/rejectPhoto`, {_id:photo_id})
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
        <Grid.Row>
          <Grid.Column width={1}></Grid.Column>
          <Grid.Column>
            {cards.length>0?<Pagination defaultActivePage={1} totalPages={totalPages} onPageChange={selectPage}/>:""}
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Footer/>
    </div>
  )
};

export default ApprovePhotos;