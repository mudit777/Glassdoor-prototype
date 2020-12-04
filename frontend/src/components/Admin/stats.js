import React, {useState, useEffect} from 'react';
import Footer from '../Placeholders/Footer';
import AdminHeader from './AdminHeader';
import {Line} from 'react-chartjs-2';
import {Bar} from 'react-chartjs-2';
import {Grid} from 'semantic-ui-react';
import axios from 'axios';
import {BACKEND} from '../../Config';
import _ from 'lodash';

const stats = () => {
  const[g1_data, setG1_data] = useState({});
  const[g2_data, setG2_data] = useState({});
  const[g3_data, setG3_data] = useState({});
  const[g4_data, setG4_data] = useState({});
  const[g5_data, setG5_data] = useState({});
  const[g6_data, setG6_data] = useState({});

  //effect to fetch data
  useEffect(()=>{    

    //set data for graph 1
    const d1 = {
      labels: ['11/21', '11/22', '11/23', '11/24', '11/25','11/26'],
      datasets: [
        {
          label: 'No of reviews',
          fill: false,
          lineTension: 0.5,
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: [65, 59, 80, 81, 56, 82]
        }
      ]
    }

    setG1_data(d1);

    //set data for graph 2
    axios.get(`${BACKEND}/getMostReviewedCompanies`)
    .then(response => {
      if(response.status == 200){        
        let companies = [];
        let counts = []
        _.forEach(response.data, company => {
          companies.push(company.company_name)
          counts.push(company.the_count)
        })

        const d2 = {
          labels: companies,
          datasets: [
            {
              label: 'Reviews',
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
              data: counts
            }
          ]
        }
    
        setG2_data(d2);
      }      
    })    

    //set data for graph 3
    axios.get(`${BACKEND}/getMostRatedCompanies`)
    .then(response => {
      if(response.status == 200){

        let l3 = []
        let g3d = []
        _.forEach(response.data.avg_overall_rating, company=>{
          l3.push(company.company_name)
          g3d.push(company.the_rating)
        })

        const d3 = {
          labels: l3,
          datasets: [
            {
              label: 'Reviews',
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
              data: g3d
            }
          ]
        }
    
        setG3_data(d3);
      }
    })
    .catch(err => {
      console.log(err)
    })    

    //set data for graph 4
    axios.get(`${BACKEND}/getTopStudents`)
    .then(response => {
      if(response.status == 200){

        let l4 = []
        let g4d = []

        _.forEach(response.data, student=>{
          l4.push(student.student_first_name+" "+student.student_last_name)
          g4d.push(student.num_of_approved_reviews)
        })
        const d4 = {
          labels: l4,
          datasets: [
            {
              label: 'Students',
              backgroundColor: [
                'rgba(153, 102, 255, 0.2)',            
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',            
              ],
              borderColor: [
                'rgba(153, 102, 255, 1)',            
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
              ],
              borderWidth: 2,
              data: g4d
            }
          ]
        }
    
        setG4_data(d4);
      }
    })
    .catch(err => {
      console.log(err)
    })    

    //set data for graph 4
    axios.get(`${BACKEND}/getTopCEOs`)
    .then(response => {
      console.log(response.data);
      if(response.status == 200){

        let l5 = []
        let g5d = []

        _.forEach(response.data, ceo => {
          if(ceo.company_ceo_first_name == null){
            l5.push("John Doe")
          }
          else{
            l5.push(ceo.company_ceo_first_name+" "+ceo.company_ceo_last_name)
          }
          g5d.push(ceo.company_avg_ceo_approval_rating)
        })

        const d5 = {
          labels: l5,
          datasets: [
            {
              label: 'Company Rating',
              backgroundColor: [
                'rgba(153, 102, 255, 0.2)',            
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                
                'rgba(255, 0, 71, 0.2)',            
                'rgba(17, 0, 255, 0.2)',
                'rgba(0, 255, 195, 0.2)',
                'rgba(255, 33, 10, 0.2)',
                'rgba(0, 40, 10, 0.2)',
              ],
              borderColor: [
                'rgba(153, 102, 255, 1)',            
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255, 0, 71, 1)',
                'rgba(17, 0, 255, 1)',
                'rgba(0, 255, 195, 1)',
                'rgba(255, 33, 10, 1)',
                'rgba(0, 40, 10, 1)',
              ],
              borderWidth: 2,
              data: g5d
            }
          ]
        }
    
        setG5_data(d5);
      }      
    })
    .catch(err => {
      console.log(err);
    })

    //set data for graph 6
    axios.get(`${BACKEND}/getMostViewedCompanies`)
    .then(response => {
      console.log(response.data)
    })
    const d6 = {
      labels: ['Google', 'Foogle', 'Amazon', 'Scamazon', 'Microsoft', 'Macrohard', 'Netflix', 'Letflix', 'Apple', 'Kidney'],
      datasets: [
        {
          label: 'No of views',
          backgroundColor: [
            'rgba(153, 102, 255, 0.2)',            
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            
            'rgba(255, 0, 71, 0.2)',            
            'rgba(17, 0, 255, 0.2)',
            'rgba(0, 255, 195, 0.2)',
            'rgba(255, 33, 10, 0.2)',
            'rgba(0, 40, 10, 0.2)',
          ],
          borderColor: [
            'rgba(153, 102, 255, 1)',            
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 0, 71, 1)',
            'rgba(17, 0, 255, 1)',
            'rgba(0, 255, 195, 1)',
            'rgba(255, 33, 10, 1)',
            'rgba(0, 40, 10, 1)',
          ],
          borderWidth: 2,
          data: [1120, 1022, 1005, 803, 765, 743, 555, 444, 333, 222]
        }
      ]
    }

    setG6_data(d6);

  }, []);

  return (
    <div>
      <AdminHeader/>
      <Grid>
        <Grid.Row>
          <Grid.Column width={1}></Grid.Column>
          <Grid.Column width={7}>
            <Line
              data={g1_data}
              options={{
                title:{
                  display:true,
                  text:'Total reviews per day',
                  fontSize:20
                },
                legend:{
                  display:false,
                  position:'right'
                }
              }}
            />
          </Grid.Column>
          <Grid.Column width={7}>
            <Bar
              data={g2_data}
              options={{
                title:{
                  display:true,
                  text:'Most reviews',
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
          </Grid.Column>
          <Grid.Column width={1}></Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={1}></Grid.Column>
          <Grid.Column width={7}>
            <Bar
              data={g3_data}
              options={{
                title:{
                  display:true,
                  text:'Top 5 companies by average ratings',
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
          </Grid.Column>
          <Grid.Column width={7}>
            <Bar
              data={g4_data}
              options={{
                title:{
                  display:true,
                  text:'Students by most reviews',
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
          </Grid.Column>
          <Grid.Column width={1}></Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={1}></Grid.Column>
          <Grid.Column width={7}>
            <Bar
              data={g5_data}
              options={{
                title:{
                  display:true,
                  text:'Top 10 CEOs by rating',
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
          </Grid.Column>
          <Grid.Column width={7}>
            <Bar
              data={g6_data}
              options={{
                title:{
                  display:true,
                  text:'Companies with most views',
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
          </Grid.Column>
          <Grid.Column width={1}></Grid.Column>
        </Grid.Row>
      </Grid>
      <Footer/>
    </div>
  )
};

export default stats;