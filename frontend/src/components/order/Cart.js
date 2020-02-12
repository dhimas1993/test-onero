import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

import Header from '../navigation/Header'
import Footer from '../navigation/Footer'

class Cart extends Component {

    state = {
        product: [],
        cart: []
    }

    componentDidMount(){
        this.getProduct()
        this.getCart()
    }

    getProduct = () => {
        axios.get('http://localhost:2019/product')
            .then(res => {
               this.setState({product: res.data})
            })
    }

    getCart = () => {
        axios.get('http://localhost:2019/cart')
            .then(res => {
                this.setState({cart: res.data})
            })
    }

    deleteCart = (id) => {
        axios.delete('http://localhost:2019/cart/'+id)
        .then(res=>{
            this.getCart()
            Swal.fire(
                'Delete!',
                'You Deleted the product',
                'success'
              )
        })
    }

    minQty = (cart) => {
        const user_id = this.props.user.id
        const {products_id} = cart

        axios.get(
            'http://localhost:2019/cart/' + user_id + '/' + products_id
        ).then( res => {
            const totalQty = parseInt(res.data[0].qty) - 1  
            if (totalQty === 0) { // mengecek apakah qty yg dibeli melebihi stock barang
                axios.delete('http://localhost:2019/cart/'+res.data[0].id)
                .then(res=>{
                    this.getCart() 
                })                
            } else {
                axios.patch('http://localhost:2019/cart/'+res.data[0].id,
                { // jika user tsb telah memasukan product tersebut maka jumlah qty akan di update
                    qty : totalQty
                }).then(res=>{
                    this.getCart()
                })
            }
        })
    }

    addQty = (product, cart) => {
        const user_id = this.props.user.id
        const {products_id} = cart
        const {stock} = product

        axios.get(
            'http://localhost:2019/cart/' + user_id + '/' + products_id
        ).then( res => {
            const totalQty = parseInt(res.data[0].qty) + 1  
            if (totalQty<=stock) { // mengecek apakah qty yg dibeli melebihi stock barang
                axios.patch('http://localhost:2019/cart/'+res.data[0].id,
                { // jika user tsb telah memasukan product tersebut maka jumlah qty akan di update
                    qty : totalQty
                }).then(res=>{
                    this.getCart()
                })
            } else {
                alert('Stock yang tersedia tidak mencukupi')
            }
        })
    }

    totalCart = () => {
        var total = 0

        for (let i = 0; i < this.state.cart.length; i++) {
            if (this.state.cart[i].users_id === this.props.user.id) {
                for (let j = 0; j < this.state.product.length; j++) {
                    if (this.state.cart[i].products_id === this.state.product[j].id) {
                    const jumlah = this.state.cart[i].qty * this.state.product[j].price
                    total = total + jumlah
                    }
                }                
            }
        }
        return (
            total
        )
    }

    totalQty = () => { // Menjumlahkan Harga barang yang dibeli user
        var total = 0

        for (let i = 0; i < this.state.cart.length; i++) {
            if (this.state.cart[i].users_id === this.props.user.id) {
                const jumlah = this.state.cart[i].qty
                total = total + jumlah                      
            }
        }return (
            total
        )
    }

    renderList = () => {
        return this.state.product.map(item=>{
            return this.state.cart.map(cart => {
                if(cart.users_id === this.props.user.id){
                    if(item.id === cart.products_id){
                        const total = item.price*cart.qty
                        return(
                            <tr>
                                <td><img className="" style={{width: "50px"}} src={`http://localhost:2019/product/avatar/${item.image}`}/></td>
                                <td>{item.product_name}</td>
                                <td>Rp. {item.price.toLocaleString('IN')}</td>
                                <td>{cart.qty}</td>
                                <td>
                                    Rp. {total.toLocaleString('IN')}
                                </td>
                                <td>
                                <img className='' style={{width: 15, height: 15}} alt='' src='https://image.flaticon.com/icons/svg/148/148782.svg' onClick={()=>{this.minQty(cart)}}/>
                                <img className='ml-2' style={{width: 15, height: 15}} alt='' src='https://image.flaticon.com/icons/svg/148/148781.svg' onClick={()=>{this.addQty(item,cart)}}/>
                                <img className='ml-2' style={{width: 15, height: 15}} alt='' src='https://image.flaticon.com/icons/svg/291/291202.svg' onClick={()=>{this.deleteCart(cart.id)}}/>
                                </td>
                            </tr>
                        )
                    }
                }
            })
        })
    }

    render() {
        var {id} = this.props.user
        return (
            <div>
                <Header/>
                <div className="container" style={{ marginTop: "150px", marginBottom: "200px" }}>
                    <div className="row">
                        <div className="col-4">
                            <div className="card-body">
                                <h2 className="card-title">Cart Total</h2>
                                <hr/>
                                <div className="mt-3 justify-content-between">
                                    <div className="d-inline-block mr-4 ">
                                        <h5>Qty barang</h5>
                                    </div>
                                    <div className="d-inline-block ml-4">
                                        <h5>{this.totalQty()}</h5>
                                    </div>
                                </div>
                                <hr/>
                                <div className="mt-3 justify-content-between">
                                    <div className="d-inline-block mr-4">
                                        <h5>Total</h5>
                                    </div>
                                    <div className="d-inline-block ml-5">
                                        <h5>Rp {this.totalCart().toLocaleString('IN')}</h5>
                                    </div>
                                </div>
                                <hr/>

                                <p>
                                    <Link to={`/checkout/${id}`}>
                                        <button type="button" className="btn btn-dark btn-md mt-5 btn-block" >Checkout</button>
                                    </Link>
                                    <Link to={`/allproduct`}>
                                        <button type="button" className="btn btn-dark btn-md mt-5 btn-block" >continue shopping</button>
                                    </Link>
                                </p>
                            </div>
                        </div>
                        <div className="card col-8" style={{border:'none'}}>
                           <table className="table table-hover mb-5 mt-4 text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">Image</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Total</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderList()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth
    }
}

export default connect(mapStateToProps)(Cart)