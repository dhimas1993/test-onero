import React, { Component } from 'react';
import {Route, BrowserRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import cookies from 'universal-cookie';

import Home from './home/Home'
import Cart from './order/Cart'
import Login from './authentication/Login'
import Register from './authentication/Register'
import ManageProduct from './product/ManageProduct'
import DetailProduct from './product/DetailProduct'
import Profile from './profile/Profile'
import Product from './product/Product'
import ProductItem from './product/productItem'
import Checkout from './order/Checkout'
import confirm from './order/confirm'
import ProductCat from './product/ProductCat'

import LoginAdmin from './admin/Login_admin'
import Sidebar_admin from './admin/Sidebar_admin'

import { keepLogin, keepLoginAdmin } from '../action/'
import Notiflix from 'notiflix-react'

const cookie = new cookies()


class App extends Component {

    componentDidMount() {
        const objCookie = cookie.get('usernameUser')
        const objCookie2 = cookie.get('usernameAdmin')
        if (objCookie !== undefined) {
            this.props.keepLogin(objCookie)
        }
        if (objCookie2 !== undefined) {
            this.props.keepLoginAdmin(objCookie2)
        }

        Notiflix.Loading.Pulse("loading");
        Notiflix.Loading.Remove(1000);
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route path='/' exact component={Home} />
                    <Route path='/cart/:userid' component={Cart}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/manageproduct' component={ManageProduct}/>
                    <Route path='/detailproduct/:id' component={DetailProduct}/>
                    <Route path='/profile' component={Profile}/>
                    <Route path='/test' component={ProductItem}/> 
                    <Route path='/allproduct' component={Product}/>
                    <Route path='/checkout/:userid' component={Checkout}/>
                    <Route path='/confirm/:userid' component={confirm}/>
                    <Route path='/product/:catid' component={ProductCat}/>
                
                    <Route path='/loginadmin' component={LoginAdmin}/>
                    <Route path='/admin' component={Sidebar_admin}/>
                </div>
            </BrowserRouter>
        )
    }
}

export default connect(null, {keepLogin, keepLoginAdmin})(App)