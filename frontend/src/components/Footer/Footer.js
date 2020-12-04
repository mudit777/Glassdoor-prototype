import React from 'react';
import { Divider, Grid, Image, List } from 'semantic-ui-react';
import new_glassdoor from './new-glassdoor.jpg';
import './Footer.css';

const Footer = () => {
  return(
    <div>
      <Divider/>
      <Grid>
        <Grid.Column width={5}>
          <Image src={new_glassdoor} className="grid_top logo_footer"/>
        </Grid.Column>
        <Grid.Column width={2} className="left grid_top">
          <List link>
            <List.Item>
              <List.Header>Glassdoor</List.Header>
            </List.Item>
            <List.Item as="a">About/Press</List.Item>
            <List.Item as="a">Awards</List.Item>
            <List.Item as="a">Blog</List.Item>
            <List.Item as="a">Research</List.Item>
          </List>      
        </Grid.Column>
        <Grid.Column width={2} className="left grid_top">
          <List link>
            <List.Item>
              <List.Header>Employers</List.Header>
            </List.Item>
            <List.Item as="a">Get a Free Employer</List.Item>
            <List.Item as="a">Account</List.Item>
            <List.Item as="a">Employer Center</List.Item>
            <List.Item as="a">Post a Job</List.Item>
          </List>
        </Grid.Column>
        <Grid.Column width={2} className="left grid_top">
          <List link>
            <List.Item>
              <List.Header>Community</List.Header>
            </List.Item>
            <List.Item as="a">Help/Contact Us</List.Item>
            <List.Item as="a">Guidelines</List.Item>
            <List.Item as="a">Terms of Use</List.Item>
            <List.Item as="a">Privacy & Cookies(New)</List.Item>
            <List.Item as="a">Privacy Center</List.Item>
            <List.Item as="a">Do Not Sell My Personal Information</List.Item>
            <List.Item as="a">Cookie Consent Tool</List.Item>
          </List>
        </Grid.Column>
        <Grid.Column width={2} className="left grid_top">
          <List link>
            <List.Item>
              <List.Header>Work With Us</List.Header>
            </List.Item>
            <List.Item as="a">Job Boards</List.Item>
            <List.Item as="a">Advertisers</List.Item>
            <List.Item as="a">Developers</List.Item>
            <List.Item as="a">Careers</List.Item>
          </List>
        </Grid.Column>
      </Grid>
      <Divider/>
      <div className="extreme">Copyright © 2008-2020, Glassdoor, Inc. "Glassdoor" and logo are registered trademarks of Glassdoor, Inc</div>
    </div>
  )
};

export default Footer;