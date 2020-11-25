import React, {useEffect} from 'react';
import {Card} from 'semantic-ui-react';
import Footer from '../Placeholders/Footer';
import AdminHeader from './AdminHeader';
import './approve.css'
import ApproveCard from './ApproveCard';
import i1 from './i1.jpg';
import i2 from './i2.jpg';
import i3 from './i3.jpg';
import i4 from './i4.jpg';

const Approve = () => {
  return (
    <div>
      <AdminHeader/>      
      <div className="bodySettings">
        <Card.Group itemsPerRow={2} className="pad_left">
          <ApproveCard img_path={i1} type="Approve Reviews" to="/approveReviews"/>
          <ApproveCard img_path={i2} type="Approve Photos" to="/approvePhotos"/>
          <ApproveCard img_path={i3} type="Manage Companies" to="/showCompanies"/>
          <ApproveCard img_path={i4} type="Analytics Dashboard" to="/showStats"/>
        </Card.Group>
      </div>
      <Footer/>
    </div>
  )
};

export default Approve;