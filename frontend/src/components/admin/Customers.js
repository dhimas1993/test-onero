import React, { Component } from 'react';
import axios from 'axios'


class Customers extends Component {

    state = {
        users: [],
        edit: 0,
    }
    
    componentDidMount (){
        this.getUsers()
    }

    getUsers = () => {
        axios.get('http://localhost:2019/users'
            ).then(res => {
            this.setState({users: res.data})
            })
    }
    
    renderList = () => {
        return this.state.users.map( users => {
            if(this.state.edit !== users.id){
                return (
                    <tr>
                        <td>{users.id}</td>
                        <td>{users.username}</td>
                        <td>{users.email}</td>
                        <td>{users.gender}</td>
                        <td> ******* </td>
                        <td>
                        <img className='list' alt='' style={{width: 75}} src={`http://localhost:2019/users/avatar/${users.avatar}`}/>
                        </td>
                    </tr>
                )
            }
        })
    }

    render() {
        return (
            <div>
                <div className="">
                    <h1 className="display-4 text-center">List Customers</h1>
                    <table className="table table-hover mb-5 text-center">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">USERNAME</th>
                                <th scope="col">EMAIL</th>
                                <th scope="col">GENDER</th>                                    
                                <th scope="col">PASSWORD</th>                                    
                                <th scope="col">AVATAR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderList()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Customers