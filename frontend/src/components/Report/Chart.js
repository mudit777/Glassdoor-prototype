import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import './Chart.css';
import {Card, Col, Rate, Row} from 'antd'
import Avatar from 'antd/lib/avatar/avatar';

class Chart extends Component{
  constructor(props){
    super(props);
  }

  
  render(){
    return (
      
      <div className="chart" style={{marginBottom:'2rem'}} >
       
       <Card style={{boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
            <Bar
            data={this.props.chartData}
            options={{
                  title:{
                  display:true,
                  text:this.props.title,
                  fontSize:25,
                  fontColor:'black'
                  },
                  scales: {
                  yAxes: [{
                        ticks: {
                              beginAtZero: true,
                        }
                  }]
                  },
                  legend:{
                  display:this.props.displayLegend,
                  position:this.props.legendPosition
                  }
            }}
            />
        </Card>
       
   
      </div>
    )
  }
}

export default Chart;