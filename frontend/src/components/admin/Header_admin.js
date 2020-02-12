import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { connect} from 'react-redux'


import { onLogoutAdmin } from '../../action'

class Header_admin extends Component {

    onButtonClick = () => {
        this.props.onLogoutAdmin()
    }

    render() {
        return (
            <div className="mb-5">
                <nav class="navbar navbar-light bg-dark justify-content-between" style={{ height : "65px" }}>
                    <a className="navbar-brand text-light">Kebunkelapa.id</a>
                    <form class="form-inline">
                        <button class="btn btn-primary mx-2 my-sm-0" type="submit" onClick={this.onButtonClick}>
                            <Link to="./loginadmin"/>Logout
                        </button>
                    </form>
                </nav>
            </div>
        )
    }
}

const mps = state => {
    return {
    user : state.admin_auth
    }
}

export default connect(mps, {onLogoutAdmin}) (Header_admin)