import React, { Component } from 'react'
import axios from 'axios'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Swal from 'sweetalert2'

import Header from '../navigation/Header'
import Footer from '../navigation/Footer'

class Checkout extends Component {

    state = {
        product: [],
        cart: [],
        kurir: [],
        size: [],
        checkout: [],
        pending: [],
        cancel: [],
        user_cart: [],
        redirect: false,
        redirectcancel: false
    }

    componentDidMount(){
        this.getProduct()
        this.getCart()
        this.getKurir()
        this.getSize()
        this.getCheckoutPending()
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    setRedirectcancel = () => {
        this.setState({
            redirectcancel: true
        })
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
            this.getCartUser()
            })
    }

    getCartUser = () => {
        const cart_filter = this.state.cart.filter(cart =>{
            if (cart.users_id === this.props.user.id) {
                return cart
            }
        })
        this.setState({user_cart : cart_filter})
    }

    getKurir = () => {
        axios.get('http://localhost:2019/kurir')
            .then(res => {
                this.setState({kurir: res.data})
            })
    }

    getSize = () => {
        axios.get('http://localhost:2019/size')
            .then(res => {
                this.setState({size: res.data})
            })
        }

    getCheckout = () => {
        axios.get('https://localhost:2019/checkout'+this.props.user.id)
            .then(res => {
                this.setState({checkout: res.data})
            })
    }

    getCheckoutPending = () => {
        let users_id = this.props.match.params.userid
        
        axios.get('http://localhost:2019/pendingpayment/' + users_id)
        .then(res => {
            this.setState({pending: res.data})
            console.log(res.data);
            
        })
    }
    
    renderKurir = () => {
        return this.state.kurir.map(item => {
            return (<option key={item.id} value={item.id}>{item.kurir_name}</option>
            )
        })
    }

    renderSize = () => {
        return this.state.size.map(item => {
            return (<option key={item.id} value={item.id}>{item.size}</option>
            )
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

    renderListCart = () => {
        return this.state.product.map(item=>{
            return this.state.cart.map(cart => {
                if(cart.users_id === this.props.user.id){
                    if(item.id === cart.products_id){
                        const total = item.price*cart.qty
                        return(
                            <li class="list-group-item d-flex justify-content-between lh-condensed">
                                <div>
                                    <h6 class="my-0">{item.product_name}</h6>
                                    <small class="text-muted">Qty: {cart.qty}</small>  <br></br>
                                    <small class="text-muted">Rp. {item.price.toLocaleString('IN')}</small>
                                    {/* <div className="mt-3 mb-2 justify-content-between d-flex"> */}
                                        {/* <h6 class="my-2 mr-2 ml-4">S</h6> <br></br> */}
                                        {/* <input placeholder="input qty" type="number" className="form-control" ref={input => this.inputS = input}/> */}

                                        {/* <h6 class="my-2 mr-2 ml-4"> M</h6> */}
                                        {/* <input placeholder="input qty" type="number" className="form" ref={input => this.inputM = input}/> */}
                                    {/* </div> */}
                                    {/* <div className="mt-3 mb-2 justify-content-between d-flex"> */}
                                        {/* <h6 class="my-2 mr-2 ml-4">L</h6> <br></br> */}
                                        {/* <input placeholder="input qty" type="number" className="form-control" ref={input => this.inputL = input}/> */}

                                        {/* <h6 class="my-2 mr-2 ml-4"> XL</h6> */}
                                        {/* <input placeholder="input qty" type="number" className="form" ref={input => this.inputXL = input}/> */}
                                    {/* </div> */}
                                </div>
                                <span class="text-muted">Rp. {total.toLocaleString('IN')}</span>
                            </li>
                        )
                    }
                }
            })
        })
    }

    continueToPayment = async () => {
        if (this.state.pending.length > 0) {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Please Complete the payment before'
              })
            this.setRedirect()
        } else if (this.state.cancel.length > 0){
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Product has rejected, please complete the payment before',
              })
            this.setRedirectcancel()
        } else if (this.state.user_cart.length === 0){
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Please input the product first',
              })
        }
        else {
            const user_id = parseInt(this.props.user.id)
            const address = this.address.value
            const country = this.country.value
            const states = this.states.value
            const zip = this.zip.value
            const bank = this.bank.value
            const admin_id = 1
            const kurir_id = this.shipping.value
            const total_harga = this.totalCart()
            const order_status = "Pending"

            console.log(`${user_id}, ${address}, ${country}, ${states}, ${zip}, ${bank},${admin_id} ,${kurir_id} `)
    
            const resOrder = await axios.post('http://localhost:2019/addcheckout',{
                user_id,
                address,
                country,
                state : states,
                zip,
                bank,
                admin_id,
                kurir_id,
                total_harga,
                order_status
            })

        console.log(resOrder);

        let arrayCart = []
        let carts = this.state.user_cart
        console.log(carts);

        for(let i = 0; i < carts.length; i++) {
            arrayCart.push([carts[i].products_id, carts[i].qty, resOrder.data[0].id])
        }

        const resOrderDetail = await axios.post(
                'http://localhost:2019/orderdetail', {arrayCart})  
        console.log(resOrderDetail)

        await axios.delete(
            `http://localhost:2019/hapuscart/${this.props.user.id}`)
        this.setRedirect()
    }}

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to={'/confirm/'+this.props.user.id} />
        }
    }

    renderRedirectCancel = () => {
        if (this.state.redirectcancel) {
          return <Redirect to={'/OrderHistory/'+this.props.user.id} />
        }
    }

    render() {
        var {id, name, username, email } = this.props.user
        return (
        <div>
            <Header/>
            <div className='container' style={{ marginTop: "120px", marginBottom: "120px" }}>
                <h1 className="text-center mb-4"> Checkout </h1>
                    <div class="row">
                        <div class="col-md-6 order-md-2 mb-4">
                            <h4 class="d-flex justify-content-between align-items-center mb-3">
                                <span class="text-muted">Your cart</span>
                                <span class="badge badge-secondary badge-pill">{this.totalQty()}</span>
                            </h4>
                            <ul class="list-group mb-3">
                                {this.renderListCart()}
                            </ul>

                            <h4 class="d-flex justify-content-between align-items-center mb-3">
                                <span class="badge badge-secondary badge-pill"></span>
                            </h4>

                            <ul class="list-group mb-3">
                                <li class="list-group-item d-flex justify-content-between lh-condensed">
                                    <div>
                                        <h6 class="my-0">Total Amount</h6>
                                    </div>
                                    <span class="text-muted">Rp {this.totalCart().toLocaleString('IN')}</span>
                                </li>
                                <button className="btn btn-dark" onClick={() => {this.continueToPayment()}}>Continue To Payment</button>
                            </ul>
                        </div>
                            
                        <div class="col-md-6 order-md-1">

                            <h4>Data Cutomers</h4>
                            <hr></hr>
                            
                            <label for="zip">Username</label>
                            <input ref={input => this.username = input}
                                type="text" class="form-control" id="zip" defaultValue={username} disabled/>

                            <label for="zip">Name</label>
                            <input ref={input => this.name = input}
                                type="text" class="form-control" id="zip" defaultValue={name} disabled/>

                            <label for="zip">Email</label>
                            <input ref={input => this.email = input}
                                type="text" class="form-control" id="zip" defaultValue={email} disabled/>
                            
                            <h4 class="mb-3 mt-3">Billing Address</h4>
                            {/* <hr class="mb-4"></hr> */}
                            {/* {this.renderAlamat()} */}
                            <hr class="mb-4"></hr>
                            <form class="needs-validation" novalidate="">
                                <div class="mb-3">
                                    <label for="address">Address</label>
                                    <input ref={input => this.address = input}
                                        type="text" class="form-control" id="address" placeholder="input your address" required=""/>
                                </div>
                            <div class="row">
                                <div class="col-md-5 mb-3">
                                    <label for="country">Country</label>
                                    <select ref={input => this.country = input} class="custom-select d-block w-100" id="country" required="">
                                        <option value="indonesia">Indonesia</option>
                                    </select>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label for="state">State</label>
                                        <select ref={input => this.states = input} class="custom-select d-block w-100" id="state" required="">
                                            <option value="jakarta">jakarta</option>
                                            <option value="bogor">bogor</option>
                                            <option value="depok">depok</option>
                                            <option value="Tangerang">Tangerang</option>
                                            <option value="bekasi">bekasi</option>
                                        </select>
                                </div>
                                <div class="col-md-3 mb-3">
                                    <label for="zip">Zip</label>
                                    <input ref={input => this.zip = input}
                                        type="number" class="form-control" id="zip" placeholder="" required/>
                                </div>
                            </div>

                            <hr class="mb-4"></hr>
                            
                            <h4 class="mb-3">Payment Method</h4>
                                <select ref={input => this.bank = input} class="custom-select d-block w-100" id="state" required="">
                                    <option value="bca">BCA</option>
                                    <option value="mandiri">Mandiri</option>
                                    <option value="bri">BRI</option>
                                    <option value="cimb">CIMB NIAGA</option>
                                    <option value="bri">BRI</option>
                                </select>

                            <hr class="mb-4"></hr>
                            
                            <h4 class="mb-3">Shipping</h4>
                                <select ref={input => this.shipping = input} class="custom-select d-block w-100" id="state" required="">
                                    {this.renderKurir()}
                                </select>
                                    {this.renderRedirect()}
                                    {this.renderRedirectCancel()}
                            </form>
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



export default connect(mapStateToProps)(Checkout)