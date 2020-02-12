import React, { Component } from 'react';
import axios from 'axios'

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkout : [],
        }
    }

    componentDidMount(){
        this.getCheckout()
    }

    getCheckout = () => {
        axios.get('http://localhost:2019/checkout')
        .then(res=>
            this.setState({checkout:res.data})    
        )
    }

    ConfirmPayment = (id) => {
        axios.get('http://localhost:2019/confirmpayment/'+id)
        .then(
            document.location.reload(true),
            this.getCheckout()
        )
    }
    CancelPayment = (id) => {
        axios.delete('http://localhost:2019/checkout/receipt/'+id)
        .then(
            document.location.reload(true),
            this.getCheckout()
        )
    }
    

    renderList = () => {
        return this.state.checkout.map(item => {
            if(item.order_receipt !== null){
                return (
                    <tr>
                        <th scope="col">{item.id}</th>
                        <th scope="col">{item.CREATED_AT}</th>
                        <th scope="col">Rp. {item.total_harga}</th>
                        <th scope="col">{item.order_status}</th>
                        <th scope="col"><img className="card-img-top" src={`http://localhost:2019/checkout/receipt/${item.order_receipt}`} style={{width: "100px"}} alt="Card image cap"/> </th>
                        <th scope="col">
                            {item.order_status !== 'Transaksi Selesai' ?
                            <div>
                                <button className="btn btn-primary" onClick={() => {this.ConfirmPayment(item.id)}}>Accept</button>
                                <button className="btn btn-primary" onClick={() => {this.CancelPayment(item.id)}}>Decline</button>
                            </div> :
                            <h6>Selesai</h6>
                            }
                        </th>
                    </tr>
                ) 
            } 
            
        })
    }



    render() {
        return (
            <div className="text-center mt-5">
                <h1 className="mb-4">Manage Order</h1>
                <table className="table table-hover mb-5 mt-4">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Order Date</th>
                            <th scope="col">Total</th>
                            <th scope="col">Status</th>
                            <th scope="col">Bukti Transfer</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderList()}

                    </tbody>
                </table>
            </div>
        )
    }
}

export default Order