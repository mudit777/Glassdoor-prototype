import React,{useState, useRef} from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import {BACKEND} from '../../Config';
import axios from 'axios';

const UploadPhotosModal = ({onHide, show, onSuccess, url}) => {
  const addPhotoRef = useRef();
  const changeText = useRef();
  const [photos, setPhotos] = useState('');

  const addPhotos = e => {
    setPhotos(e.target.files);
  }

  const uploadPhotos = e => {
    e.preventDefault();

    changeText.current.textContent = "Uploading, please wait.....";
    var formData = new FormData();
    for(const key of Object.keys(photos)){
      formData.append('image', photos[key])
    }

    axios.post(`${BACKEND}/${url}`, formData)
      .then(res => {        
        if(res.status == 200){
          onSuccess();
          onHide();
        }
        else{
          changeText.current.textContent = "Some error occured. Please refresh and try again.";
        }
      })
      .catch(err => {
        changeText.current.textContent = "Some error occured. Please refresh and try again.";
      })
  }

  return (
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={show}
      size='small'
    >
      <Header icon>
        <Icon name='images' />
        Upload Photos
      </Header>
      <Modal.Content>
        <h1 ref={changeText} style={{color:"white"}}>
          Select your photos and hit upload!
        </h1>
        <Button content="Select Photos" onClick={()=>{addPhotoRef.current.click()}} />
        <input ref={addPhotoRef} type = 'file' hidden multiple onChange={addPhotos}/>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='red' inverted onClick={() => onHide()}>
          <Icon name='remove' /> Cancel
        </Button>
        <Button color='green' inverted onClick={uploadPhotos} >
          <Icon name='checkmark' /> Upload
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default UploadPhotosModal;