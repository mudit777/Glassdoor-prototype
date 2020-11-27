import React, {useState, useEffect} from 'react';
import Footer from '../Placeholders/Footer';
import AdminHeader from './AdminHeader';
import {Line} from 'react-chartjs-2';
import {Bar} from 'react-chartjs-2';
import {Grid} from 'semantic-ui-react';

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
    const d2 = {
      labels: ['Google', 'Amazon', 'Microsoft', 'Apple', 'Facebook'],
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
          data: [800, 700, 650, 625, 610]
        }
      ]
    }

    setG2_data(d2);

    //set data for graph 3
    const d3 = {
      labels: ['Google', 'Amazon', 'Microsoft', 'Apple', 'Facebook'],
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
          data: [4.8, 4.2, 3.9, 3.5, 2.8]
        }
      ]
    }

    setG3_data(d3);

    //set data for graph 4
    const d4 = {
      labels: ['Baburao', 'Raju', 'Shyam', 'Totla', 'Kabira'],
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
          data: [381, 298, 291, 120, 89]
        }
      ]
    }

    setG4_data(d4);

    //set data for graph 4
    const d5 = {
      labels: ['Deviprasad', 'Harshad Mehta', 'Vijay Maliya', 'Nirav Modi', 'Sundar Pichai', 'Tim Cook', 'Bill Gates', 'Lebron James', 'Mark Zuckerberg', 'Xi Jinping'],
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
          data: [4.8, 4.7, 4.7, 4.3, 4.23, 4.1, 3.9, 3.87, 3.5, 3.44]
        }
      ]
    }

    setG5_data(d5);

    //set data for graph 6
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