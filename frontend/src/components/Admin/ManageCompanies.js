import React,{useState, useEffect} from 'react';
import Footer from '../Placeholders/Footer';
import AdminHeader from './AdminHeader';
import axios from 'axios';;
import { BACKEND } from '../../Config';
import './Placeholders.css';
import {Link} from 'react-router-dom';
import './ManageCompanies.css';
import {Grid, Segment, Button, Input} from 'semantic-ui-react';
import {Pagination} from 'antd';
import 'antd/dist/antd.css';

const ManageCompanies = () => {
  const[companies, setCompanies] = useState([]);
  const[cards, setCards] = useState([]);
  const[term, setTerm] = useState('');
  const[offset, setOffset] = useState(0);
  const[elements, setElements] = useState([]);
  const[perPage, setPerPage] = useState(5);
  const[currentPage, setCurrentPage] = useState(1);
  const[pageCount, setPageCount] = useState(1);
  const[paginationElement, setPaginationElement] = useState(null);

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

  const setElementsForCurrentPage = () => {
    let elements1 = companies.slice(offset, offset + perPage);
    setElements(elements1)
  }

  //this effect adds elements
  useEffect(()=>{
    setElementsForCurrentPage()  
  }, [companies])
  
  const handlePageClick = (pageNo) => {
    const selectedPage = pageNo - 1; 
    const offset1 = selectedPage * perPage;
    setCurrentPage(selectedPage);
    setOffset(offset1);
    setElementsForCurrentPage();
  }

  //this effect displays cards
  useEffect( () => {
    let rcards = elements.map(company => {
      return (
        <Segment raised className="segment_div">
          <div className="link_div">
            <Link className="link_fonts" to={{pathname:"/showCompanyReviews", state:{company_id:company.company_id}}}>{company.company_name}</Link>
          </div>
          <Button style={{backgroundColor:"#0CAA41", color:"white"}}>Show Stats</Button>
        </Segment>
      )
    })

    if(pageCount>0){
      let paginationElement1 = (<Pagination
        defaultCurrent={1}
        onChange={handlePageClick}
        size="small"
        total={companies.length}
        showTotal={(total, range) => 
        `${range[0]}-${range[1]} of ${total} items`}
          defaultPageSize={perPage}
      />)
      setPaginationElement(paginationElement1);
    }
    setCards(rcards);

  }, [elements])


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
            <div style={{marginLeft:"10rem"}}>
              {paginationElement}
            </div>
          </Grid.Column>
          <Grid.Column width={8}>
            <div className="stats">
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