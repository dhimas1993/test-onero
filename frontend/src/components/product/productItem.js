import React, { Component } from 'react'
import { Link, Redirect} from 'react-router-dom'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import axios from '../../config/axios'
import {connect} from 'react-redux'
import Swal from 'sweetalert2'


class ProductItem extends Component {

    state = {
        redirect: false
      }

    refresh = (reload) => {
        document.location.reload(reload)
    }

    setRedirect = () => {
        this.setState({
        redirect: true
        })
    }
    
    renderRedirect = () => {
        if (this.state.redirect) {
        return <Redirect to='/login' />
        }
    }
    
    addToCart = () => {
        const user_id = this.props.user.id
        var {id} = this.props.items
        const qty = 1

        if(user_id !== '') {
            axios.get(
                'http://localhost:2019/cart/'+user_id+'/'+id
            ).then( res => {
                console.log(res.data);
                
                // const totalQty = parseInt(res.data[0].qty) + (qty) 
                if(res.data.length > 0){
                    const totalQty = parseInt(res.data[0].qty) + (qty)  
                    axios.patch('http://localhost:2019/cart/'+res.data[0].id,
                        { // jika user tsb telah memasukan product tersebut maka jumlah qty akan di update
                            qty : totalQty
                        }).then(res=>{
                            Swal.fire({
                                title: 'Are you sure?',
                                text: "your product will be added to the cart",
                                type: 'success',
                                showCancelButton: false,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes, add to cart'
                            }).then((result) => {
                                if (result.value) {
                                    document.location.reload(true)
                                }
                            })
                        })
                } else {
                    axios.post('http://localhost:2019/addcart',
                        {
                            users_id : user_id,
                            products_id : id,
                            qty,
                        }).then(res=>{
                            Swal.fire({
                                title: 'Are you sure?',
                                text: "your product will be added to the cart",
                                type: 'success',
                                showCancelButton: false,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes, add to cart'
                            }).then((result) => {
                                if (result.value) {
                                    document.location.reload(true)
                                }
                            })
                    })
                }
            })
        } if(user_id === ""){ // memunculkan alert jika blom login
            return (
                alert('Silahkan login terlebih dahulu untuk melanjutkan transaksi'),
                this.setRedirect()
            )
        }
    }

    render () {
        var {id,product_name,price,image} = this.props.items
            return (
                <div className="mb-4">
                    {this.renderRedirect()}
                    <MDBCol>
                        <MDBCard style={{ width : "15rem", height: "22rem" }}>
                            <MDBCardImage className="img-fluid" src={`http://localhost:2019/product/avatar/${image}`} waves />
                                <MDBCardBody>
                                <MDBCardTitle>{product_name}</MDBCardTitle>
                                <MDBCardText>Rp. {price.toLocaleString('IN')} </MDBCardText>
                                <div className=" d-inline-flex ml-1">
                                <Link to={`/detailproduct/${id}`}>
                                    <MDBBtn><i class="fa fa-eye" aria-hidden="true"></i></MDBBtn>
                                </Link>
                                <MDBBtn href="#" onClick={()=>{this.addToCart(this.props.items)}}><i class="fa fa-cart-plus" aria-hidden="true"></i></MDBBtn>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </div>
            )
        }
} 

const mapStatetoProps = state => {
    return {
        user: state.auth
    }
}

export default connect(mapStatetoProps)(ProductItem)