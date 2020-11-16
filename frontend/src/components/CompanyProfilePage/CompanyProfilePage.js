import React, { Component } from 'react'
import CompanyHeaderBar from '../CompanyHeaderBar/CompanyHeaderBar';
import axios from 'axios'
import {Modal, Button} from 'semantic-ui-react'

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
                <h3>Company Profile Page</h3>
                <Modal
                    trigger={<Button style ={{backgroundColor:"#00a422", color:"white"}}>Edit Profile</Button>}
                    header='Edit Company Profile'
                    content='Call Benjamin regarding the reports.'
                    actions={['Snooze', { key: 'done', content: 'Done', positive: true }]}
                />
            </div>
        )
    }
}

export default CompanyProfilePage;
