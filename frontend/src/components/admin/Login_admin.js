import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom'
import { connect} from 'react-redux'
import {
    Card, CardBody, CardTitle, CardText, Button, InputGroup, InputGroupAddon
} from 'reactstrap'

import { onLoginAdmin } from '../../action'

class Login_admin extends Component {

    onButtonClick = () => {
        const username = this.username.value
        const password = this.password.value

        console.log(username)
        console.log(password);
  
        this.props.onLoginAdmin(username, password)
     }

     render () {
        if(this.props.user.username === '') {
            return (
                <div className="" style={{ marginTop: "120px" }}>
                    <div className="container col-sm-5">
                        <Card className="justify-content-between border">
                            <CardBody>
                            <CardTitle className="h1">Login Admin</CardTitle>
                            <hr></hr>
                            <CardText className="h4">Username</CardText>
                            <input className='form-control' placeholder="masukan username anda" ref={(username) => {this.username = username}}></input>
                            <CardText className="h4 mt-4">Password</CardText>
                            <InputGroup>
                                <input type="password"
                                ref={(password) => (this.password = password)}
                                className='form-control'
                                placeholder="masukan password anda"
                                />
                            </InputGroup>
                            <Button className="mt-2" onClick={() => {this.onButtonClick()}}>Login</Button>
                            <CardText>Belum memiliki akun ? Klik <Link to="/register">Disini</Link></CardText>
                            
                            </CardBody>
                        </Card>
                    </div>
                </div>
            )
        }
        return <Redirect to='/admin' />
    }
}

const mps = state => {
    return {
    user : state.admin_auth
    }
}
  
export default connect(mps, {onLoginAdmin}) (Login_admin)