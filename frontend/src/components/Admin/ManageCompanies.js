import React,{useState, useEffect} from 'react';
import Footer from '../Placeholders/Footer';
import AdminHeader from './AdminHeader';
import axios from 'axios';;
import { BACKEND } from '../../Config';
import './Placeholders.css';
import {Link} from 'react-router-dom';
import './ManageCompanies.css';
import {Grid, Segment, Button, Input} from 'semantic-ui-react';

const ManageCompanies = () => {
  const[companies, setCompanies] = useState([]);
  const[cards, setCards] = useState([]);
  const[term, setTerm] = useState('');

  //this effect fetches data on mount
  useEffect(()=>{
    axios.get(`${BACKEND}/getAllCompaniesAdmin`)
    .then(response => {  
      if(response.status === 200){
        setCompanies(response.data);
      }
      else{
        console.log("Some error occured");
      }
    })
    .catch(err => {
      console.log("Axios err", err);
    })
  }, [])


  //this effect displays cards
  useEffect( () => {
    let rcards = companies.map(company => {
      return (
        <Segment raised className="segment_div">
          <div className="link_div">
            <Link className="link_fonts" to={{pathname:"/showCompanyReviews", state:{company_id:company.company_id}}}>{company.company_name}</Link>
          </div>
          <Button style={{backgroundColor:"#0CAA41", color:"white"}}>Show Stats</Button>
        </Segment>
      )
    })
    setCards(rcards);
  }, [companies])

  const onType = e => {
    setTerm(e.target.value)
  }

  const search = e => {
    e.preventDefault();    
    axios.post(`${BACKEND}/searchCompany/`, {term:term})
    .then(response => {
      console.log(response)
      setCompanies(response.data);
    })
    .catch(err => {
      console.log(err)
    })     
  }

  return(
    <div>
      <AdminHeader/>
      <Grid>
        <Grid.Row className="search_bar_div">
          <Grid.Column width={10}>
            <Input className="search_bar" onChange={onType}/>
          </Grid.Column>
          <Grid.Column>
            <Button style={{backgroundColor:"#0CAA41", color:"white", marginLeft:"2rem"}} onClick={search}>Search</Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>
            <div style={{marginLeft:"10rem"}}>
              {cards.length>0?cards:<div className="no_more">No companies to show</div>}
            </div>
          </Grid.Column>
          <Grid.Column width={8}>
            <div style={{height:"100%", border:"1px solid black"}}>
              See Stats here
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Footer/>
    </div>
  )
};

export default ManageCompanies;