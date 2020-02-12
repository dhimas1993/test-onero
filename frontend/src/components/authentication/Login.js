import React, { Component } from 'react';
import { onLoginUser }from '../../action'
import { connect } from 'react-redux'

import {Link, Redirect} from 'react-router-dom'
import {
    Card, CardBody, CardTitle, CardText, Button, InputGroup, InputGroupAddon
} from 'reactstrap'

import Header from '../navigation/Header'


class Login extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          hidden: true,
          password: ""
        };
    
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.toggleShow = this.toggleShow.bind(this);
      }
      
      onButtonClick = () => {
        var username = this.username.value
        var password = this.password.value

        console.log(username);
        console.log(password);
        
        this.props.onLoginUser(username, password)
      }

      // show password 
      handlePasswordChange(e) {
        this.setState({ password: e.target.value });
      }
    
      toggleShow() {
        this.setState({ hidden: !this.state.hidden });
      }
    
      componentDidMount() {
        if (this.props.password) {
          this.setState({ password: this.props.password });
        }
      }

    render () {
        if(this.props.user.username === '') {
          return (
            <div>
              <Header/>
              <div className="" style={{ marginTop: "250px" }}>
                <div className="container col-sm-4">
                    <Card className="justify-content-between border">
                        <CardBody>
                        <CardTitle className="h1">Login</CardTitle>
                        <hr></hr>
                        <CardText className="h4">Username</CardText>
                        <input className='form-control' placeholder="masukan username anda" ref={(username) => {this.username = username}}></input>
                        <CardText className="h4 mt-4">Password</CardText>
                        <InputGroup>
                            <input
                              ref={(password) => (this.password = password)}
                              className='form-control'
                              placeholder="masukan password anda"
                              type={this.state.hidden ? "password" : "text"}
                              value={this.state.password}
                              onChange={this.handlePasswordChange}
                            />
                            <InputGroupAddon addonType="">
                                <Button onMouseEnter={this.toggleShow} onMouseLeave={this.toggleShow}>Show Password</Button>
                            </InputGroupAddon>
                        </InputGroup>
                        <Button className="mt-2" onClick={this.onButtonClick}>Login</Button>
                        <CardText>Belum memiliki akun ? Klik <Link to="/register">Disini</Link></CardText>
                        
                        </CardBody>
                    </Card>
                </div>
            </div>
          </div>
        )
      }
      return <Redirect to='/' />
    }
}

const mapStateToProps = state => {
  return {
    user : state.auth
  }
}

export default connect(mapStateToProps, {onLoginUser}) (Login)