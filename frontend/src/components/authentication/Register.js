import React, { Component } from 'react';
import axios from 'axios'
import {Link, Redirect} from 'react-router-dom'
import {
    Card, CardBody, CardTitle, CardText, Button, FormGroup
} from 'reactstrap'
import { InputGroup } from 'react-bootstrap';

import Header from '../navigation/Header'
import Footer from '../navigation/Footer'



class Register extends Component {
    state = {
        regis : false
    }

    registerBtn = () => {

        const name = this.name.value
        const username = this.username.value
        const email = this.email.value
        const password = this.password.value
        const gender = this.gender.value
        
        // Register User
        axios.post ('http://localhost:2019/users', 
        {
            username,
            name,
            email,
            password,
            gender,
        }).then((res) => {
            console.log(res.data);
            
            if(res.data.length > 0) {
                alert('berhasil login')
                console.log(res.data);
                this.setState({regis:true})
            } else {
                alert('Username sudah digunakan')
            }
        })
    }

    render () {
        if (this.state.regis) {
            return <Redirect to='/login'/>
        }
        return (
            <div>
                <Header/>
                <div className="container col-sm-4" style={{ marginTop: "170px" }}>
                    <Card className="justify-content-between border">
                        <CardBody>
                        <CardTitle className="h1">Register</CardTitle>
                        <hr></hr>

                        <div className="form">
                            <CardText className="h4">Username</CardText>
                            <input  className='form-control' placeholder="masukan username anda" ref={(username) => {this.username = username}}></input>

                            <CardText className="h4 mt-4">Nama</CardText>
                            <input className='form-control' placeholder="masukan password anda" type="text" ref={(name) => {this.name = name}}></input>
                            
                            <CardText className="h4 mt-4">Email</CardText>
                            <input className='form-control' placeholder="masukan email anda" ref={(email) => {this.email = email}}></input>

                            <CardText className="h4 mt-4">Password</CardText>
                            <input className='form-control' placeholder="masukan password anda" type="password" ref={(password) => {this.password = password}}></input>
                            
                            <CardText className="h4 mt-4">Jenis Kelamin</CardText>
                            <FormGroup>
                                <select className='custom-select' defaultValue="0" ref={(gender) => {this.gender = gender}}>
                                    <option value='male'>Male</option>
                                    <option value='female'>Female</option>
                                </select>
                            </FormGroup>
                        </div>

                        <Button className="mt-1" onClick={this.registerBtn}>Register</Button>
                        <CardText className="mt-2">Sudah memiliki akun ? Klik <Link to="/login">Disini</Link> </CardText>
                        
                        </CardBody>
                    </Card>
                </div>
                <Footer style={{ marginTop: "10px" }}/>
            </div>
        )
        }
}


export default Register