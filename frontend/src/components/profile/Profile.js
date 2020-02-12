import React, { Component } from 'react'
import { Jumbotron, Card, CardImg, FormGroup} from 'reactstrap'
import { connect } from 'react-redux'
import { Redirect} from 'react-router-dom'
import axios from 'axios'
import {updateProfile} from '../../action'
import Swal from 'sweetalert2'

import Header from '../navigation/Header'
import Footer from '../navigation/Footer';

class Profile extends Component {

    state = {
        edit : false
    }

    refresh = (reload) => {
        document.location.reload(reload)
    }

    onButtonClikAvatar = (id) => {
        const formData = new FormData()
        const image = this.image.files[0]
        
        formData.append('image', image)
        formData.append('id', id)

        axios.post('http://localhost:2019/users/avatar/', formData
        ).then(res=>{
            console.log(res.data)
            this.props.updateProfile(id)
        })
    }

    onButtonClick = () => {
        const username = this.username.value
        const name = this.name.value
        const email = this.email.value
        const gender = this.gender.value

        console.log(name);
        
        axios.patch(`http://localhost:2019/users/${this.props.user.id}`,
        {username, name,email, gender})
        .then(res=> {
            console.log(res.data)
            this.props.updateProfile(this.props.user.id)
            {this.setState({edit:!this.state.edit})}
            Swal.fire(
                'Good job!',
                'profile successfully changed',
                'success'
              )
        })
    }


    renderEdit = () => {
        const {id, name, username, password, avatar, email,gender} = this.props.user
        console.log(this.props.user);
        
        if(this.state.edit){
            return (
                <div>
                   <Jumbotron>
                   <div className='container mb-5' style={{ marginTop:"10px" }}>
                      <div className='row'>
                         <div className='col-4'>
                            <div>
                               <Card>
                                  <CardImg top width="100%" src={`http://localhost:2019/users/avatar/${avatar}`} alt="Card image cap" className='rounded' />
                               </Card>
                               <input type='file' ref={input => (this.image = input)}></input>
                               <button className="btn btn-default" onClick={() => {this.onButtonClikAvatar(id)}}>Upload</button>
                            </div>
                         </div>


                         <div className='col-8'>
                            <form>
                               <h1>Edit Profile</h1>
                               <div className="form-group">
                                  <label htmlFor="name">Username</label>
                                  <input ref={username => this.username = username} type="text" className="form-control" id="name" defaultValue={username} disabled/>
                               </div>
                               <div className="form-group">
                                  <label htmlFor="name">Name</label>
                                  <input ref={name => this.name = name} type="text" className="form-control" id="name" defaultValue={name}/>
                               </div>
                               <div className="form-group">
                                  <label htmlFor="email">Email address</label>
                                  <input ref={email => this.email = email} type="email" className="form-control" id="email" defaultValue={email} disabled/>
                                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                               </div>
                               <FormGroup>
                                <select className='custom-select' defaultValue="0" ref={(gender) => {this.gender = gender}}>
                                    <option value='male'>Male</option>
                                    <option value='female'>Female</option>
                                </select>
                            </FormGroup>
                            </form>
                            <button className='btn btn-default' onClick={()=> {this.onButtonClick()}}>Done</button>

                            <button className="btn btn-default" onClick={() => {this.setState({edit:!this.state.edit})}}> Back </button>
                         </div>
                      </div>
                   </div>
                   </Jumbotron>
                </div>
             )
        }
    }
    
    render() {
        if(this.props.user.username){
        const {id,name,username,avatar,email, gender} = this.props.user
            return (
                <div>
                    <Header/>
                        <div style={{ marginTop: "150px", marginBottom: "2px"}}>
                            <Jumbotron >
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <img src={`http://localhost:2019/users/avatar/${avatar}`}  alt="Please choose your avatar" key={new Date()} style= {{width: "320px"}} />
                                        </div>
                                        <div className="col-sm-8">
                                            <h1 className="display-3">Hello, {username} </h1>
                                            <h4 className="display-5"> Nama : {name} </h4>
                                            <h4 className="display-5"> Id : {id} </h4>
                                            <h4 className="display-5">Email : {email} </h4>
                                            <h4 className="display-5">Gender : {gender} </h4>
                                            <button className="btn btn-default my-3" onClick={() => {this.setState({edit:!this.state.edit})}}>Edit Profile >></button>
                                        </div>
                                        
                                    </div>
                                </div>
                            </Jumbotron>
                        </div>
                        <div>
                    {this.renderEdit()}
                        </div>
                    <Footer/>
                </div>
            )
        }
        return (
            <div>
                <Redirect to="/"/>
            </div>
        )
    }
}

const mapStatetoProps = state => {
    return {
        user: state.auth
    }
}


export default connect(mapStatetoProps,{updateProfile})(Profile)