import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import Swal from 'sweetalert2'

import Header from '../navigation/Header'
import Footer from '../navigation/Footer'

class confirm extends Component {

    state = {
        checkout: [],
        allcheckout: [],
        kurir: []
    }

    componentDidMount() {
        this.getCheckout()
    }

    getCheckout = () => {
        let users_id = this.props.match.params.userid
        console.log(users_id);
        

        axios.get('http://localhost:2019/checkout/' + users_id)
        .then(res => {
            this.setState({checkout: res.data})
            console.log(res.data);
        })
    }

    gtKurir = () => {
        axios.get('http://localhost:2019/kurir/')
        .then(res => {
            this.setState({kurir: res.data})
            console.log(res.data);
        })
    }

    uploadImage = (id) => {
        const formData = new FormData()
        const image = this.image.files[0]
        console.log(image);
        
        
        formData.append('image', image)
        formData.append('id', id)

        axios.post('http://localhost:2019/checkout/receipt', formData
        ).then(res=>{
            Swal.fire(
                'Good job!',
                'Payment has been received',
                'success'
              )
            console.log(res.data);
            this.setRedirect()
        })
    }

    renderBilling = () => {
        return this.state.checkout.map( check => {
            return this.state.kurir.map ( kur => {
                if (check.kurir_id === kur.id) {
                    console.log(check.kurir_id);
                    
                    return (
                        <tr>
                            {check.kurir_id}
                        </tr>
                    )
                }
            })
        })
    }

    renderList() {
        return this.state.checkout.map (co=> {
            if (co.user_id === this.props.user.id && co.order_status !== "Transaksi Selesai") {
                return (
                    <div>
                        <div className='container' style={{ marginTop: "100px", marginBottom: "100px" }}>
                            <form class="needs-validation" novalidate="">
                                <hr class="mb-4"></hr>
                                <h4 class="mb-3 text-center ">Payment Bank</h4>
                                <div className=''>
                                    <h3 className='card-title text-center'>{co.bank}</h3>
                                </div>

                                <hr class="mb-4"></hr>
                                <h4 class="mb-3 text-center ">Nomer Rekening Kebunkelapa.id</h4>
                                <div className=''>
                                    <h3 className='card-title text-center'>1234567890</h3>
                                </div>
                                <hr class="mb-4"></hr>
                                

                                <h4 class="mb-3 text-center ">Total Harga</h4>
                                <div className='row'>
                                    <div className='card-body ' style={{borderStyle:"solid", borderColor:'AntiqueWhite'}}>
                                        <div className='card-body'>
                                            <h3 className='card-title text-center'>Rp. {co.total_harga}</h3>
                                        </div>
                                    </div>
                                </div>
                                <hr class="mb-4"></hr>

                                <h4 class="mb-3 text-center ">Konfirmasi Pembayaran</h4>
                                <div className='row'>
                                <img src={`http://localhost:2019/checkout/receipt/${co.order_receipt}`}  alt="Please choose your avatar" key={new Date()} style= {{width: "320px"}} />
                                        <input type='file' ref={input => {this.image = input}}></input>
                                </div>
                                <hr class="mb-4"></hr>

                                <div className='card success-color mt-4 mb-4' >
                                    <h3 className='card-title text-center'>{co.order_status}</h3>
                                </div>
                                <button class="btn btn-primary btn-lg btn-block" onClick={()=>{this.uploadImage(co.id)}}>Continue to checkout</button>
                            </form>
                        </div>
                    </div>
                )
            }
        })
    }

    render () {
        return (
            <div>
                <Header/>
                    {this.renderList()}
                <div className="">
                    <Footer/>
                </div>
            </div>
        )
    }
}

const mapStatetoProps = state => {
    return {
        user: state.auth
    }
}

export default connect(mapStatetoProps)(confirm)