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
import {Pie, Bar} from 'react-chartjs-2';
import _ from 'lodash';

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
  const[g1_data, setG1_data] = useState({});
  const[g2_data, setG2_data] = useState({});
  const[g1, setG1] = useState('');
  const[buttonText, setButtonText] = useState('View Demographics');

  //this effect fetches data on mount
  useEffect(()=>{
    axios.get(`${BACKEND}/getAllCompanies`)
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

  const showCompanyStats = company_id => {
    console.log("Company clicked with id = "+company_id);
    axios.get(`${BACKEND}/getCompanyStats/`+company_id)
    .then(response => {
      console.log(response.data);
      if(response.status == 200){
        let g1l = []
        let g1d = []
        
        _.forOwn(response.data.app_status_and_count, (value, key) => {
          g1l.push(key);
          g1d.push(value);
        });

        const d1 = {
          labels: g1l,
          datasets: [
            {
              label: 'App Status',
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
              ],
              borderWidth: 2,
              data: g1d
            }
          ]
        }

        let d2 = {};
        if(typeof(response.data.demographics) !== 'string'){
          let g2l = []
          let g2d = []
          _.forEach(response.data.demographics, d => {
            g2l.push(Object.keys(d)[0])
            g2d.push(d[Object.keys(d)[0]])
          })
          
          d2 = {
            labels: g2l,
            datasets: [
              {
                label: 'Race',
                backgroundColor: [
                  '#B21F00',
                  '#C9DE00',
                  '#2FDE00',
                  '#00A6B4',
                  '#6800B4'
                ],
                hoverBackgroundColor: [
                '#501800',
                '#4B5000',
                '#175000',
                '#003350',
                '#35014F'
                ],
                data: g2d
              }
            ]
          }
        }
        setG1_data(d1);
        setG2_data(d2);

      }
    })
    .catch(err=>{
      console.log(err);
    })
  }

  //this effect displays cards
  useEffect( () => {
    let rcards = elements.map(company => {
      return (
        <Segment key={company.company_id} raised className="segment_div">
          <div className="link_div">
            <Link className="link_fonts" to={{pathname:"/showCompanyReviews", state:{company_id:company.company_id}}}>{company.company_name}</Link>
          </div>
          <Button style={{backgroundColor:"#0CAA41", color:"white"}} onClick={()=>{showCompanyStats(company.company_id)}}>Show Stats</Button>
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
    axios.post(`${BACKEND}/searchCompany/`, {searchTerm:term})
    .then(response => {
      setCompanies(response.data);
    })
    .catch(err => {
      console.log(err)
    })     
  }

  const changeGraphs = e => {
    e.preventDefault();

    if(g1 === ""){
      setG1("none");
      setButtonText("View Application Stats");
    }
    else{
      setG1("");
      setButtonText("View Demographics");
    }   
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
              <div style={{display:`${g1}`}}>
                <Bar
                  data={g1_data}
                  options={{
                    title:{
                      display:true,
                      text:'Application status and count',
                      fontSize:20
                    },
                    legend:{
                      display:false,
                      position:'right'
                    },
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            beginAtZero: true,
                          },
                        },
                      ],
                    }
                  }}
                />
              </div>
              <div style={{display:`${g1?"":"none"}`}}>
                <Pie
                  data={g2_data}
                  options={{
                    title:{
                      display:true,
                      text:'Applicants Race',
                      fontSize:20
                    },
                    legend:{
                      display:true,
                      position:'right'
                    }
                  }}
                />
              </div>
              <Button content={buttonText} onClick={changeGraphs} style={{backgroundColor:"#0CAA41", color:"white", marginTop:"1rem", marginLeft:"40%"}}/>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Footer/>
    </div>
  )
};

export default ManageCompanies;