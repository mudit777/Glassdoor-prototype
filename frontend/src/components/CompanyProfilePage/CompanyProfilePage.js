import React, { Component } from 'react'
import CompanyHeaderBar from '../CompanyHeaderBar/CompanyHeaderBar';
import axios from 'axios'
import {Modal, Button} from 'semantic-ui-react'
import Company from '../Cards/Company'
import Job from '../Cards/Job'
import CompanyBar from '../CompanyHeaderBar/CompanyBar'

class CompanyProfilePage extends Component {

    // handleOpen = () => this.setState({ open: false });

    // handleOpen = () => this.setState({ setOpen: false});

    constructor(){
        super();
        this.state = {  
            firstname : "",
            open: false,
            setOpen: false
        }
    }

    componentDidMount(){
        axios.post('http://localhost:8080/updateDishPhoto')
            .then(response => {
                console.log("Status Code in View Dish : ",response.status);
                if(response.status === 200){
                    console.log("HERE IN ACTIONS - GETTING REST DATA!")
                    console.log(response.data);
                    this.setState(
                    {
                        dishes : response.data,
                        nodishes: false
                    })
                    console.log("DISHES IN VIEW DISH ARE"+this.state.dishes);
                    Object.keys(this.state.dishes).map(i => 
                        console.log(this.state.dishes[i])
                    )
                }else{
                }
            })
            .catch(err => {
                
        })
    }

    render() {

        return (
            <div>
                <CompanyHeaderBar/>
                <CompanyBar/>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                    <Company/>
                    {/* loop the jobs */}
                    <div style={{display:'flex',flexDirection:'column'}}>
                        <Job/>
                        <Job/>
                        <Job/>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default CompanyProfilePage;
