import React from 'react';
import {Grid, Image, Icon, Divider} from 'semantic-ui-react';
import glassdoor_logo from './glassdoor-logo.png';
import {Link} from 'react-router-dom';

const AdminHeader = () => {
  return (
    <div>      
      <Grid>
        <Grid.Column width={3}>
          <Image style={{width:"180px", height:"40px", marginLeft:"2rem", marginTop:"2rem"}} src={glassdoor_logo}/>
        </Grid.Column>
        <Grid.Column width={13}>
          <div style={{marginLeft:"80rem", marginTop:"2rem"}}><Link to="/approve" style={{color:"black"}}><Icon className="home" size="big"></Icon></Link></div>
        </Grid.Column>
      </Grid>
      <Divider/>
    </div>
  )
};

export default AdminHeader;