import React, { Component } from 'react';
import axios from 'axios'
import {connect} from 'react-redux'
import Swal from 'sweetalert2'

import Header from '../navigation/Header'
import Footer from '../navigation/Footer'
import ProductItem from './productItem'

class DetailProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: [],
            category: [],
            allproduct: []
        };
    }

    componentDidMount(){
        this.getCategory()
        this.getProduct()
        this.getAllProduct()
    }

    getAllProduct = () => {
        axios.get('http://localhost:2019/product')
        .then(res => {
            this.setState({allproduct: res.data})
            console.log(res.data)
        })
    }

    getProduct = () => {
        axios.get('http://localhost:2019/product/'+this.props.match.params.id)
            .then(res => {
                this.setState({product: res.data[0]})
                // console.log(res.data);
                
            })
            .catch(err => {
                console.log(err)
            })
        }

    getCategory = () => {
        axios.get('http://localhost:2019/category/'+this.props.match.params.id)
            .then(res => {
                this.setState({category: res.data})
                // console.log(res.data);  
        })
        }

    addToCart = () => {
        const user_id = this.props.user.id
        var id = this.state.product.id
        console.log(id)
        console.log(this.state.product.id)
        console.log(user_id)
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
                alert('Silahkan login terlebih dahulu untuk melanjutkan transaksi')
            )
        }
        }

        renderRecommendProduct = () => {
            return this.state.allproduct.slice(0,4).map((item) => {
                return (
                    <div>
                        <ProductItem items={item}/>
                    </div>
                )
            })
        }
    

    render() {
        const {product, category} = this.state
        console.log(product);
        
        return (
            <div>
                <Header/>
                <div className="container" style={{marginTop: "140px", marginBottom: "140px"}}>
                    <div className="row justify-content-center">
                        <div className="col-md-7 ">
                            <div className="card">
                                <img className="card-img-top" src={`http://localhost:2019/product/avatar/${product.image}`} alt="Card image cap"/>
                            </div>
                        </div>


                        <div className="col-md-5">
                            <div className="card mb-3" style={{border: "none"}}>
                                <div className="card-body">
                                    <h2 className="card-title">{product.product_name}</h2>

                                        <hr></hr>

                                    <div className="justify-content-between">
                                        <h4 className="mt-3">Price : </h4>
                                        <h6 className="mt-3 mb-0">Rp. {product.price} </h6>
                                    </div>

                                        <hr></hr>

                                    <h5> Detail </h5>
                                    <div className="card-text">
                                        {product.detail}
                                    </div>

                                    <p><button type="button" className="btn btn-dark btn-md mt-5 btn-block" onClick={this.addToCart}>ADD TO CART</button></p>

                                    {/* <p className="card-text">Category</p> */}
                                </div>
                            </div>

                            {/* <div className="card mb-3" style={{border: "none"}}>
                                <div className="card-body">
                                    <h2 className="card-title">Comment</h2>
                                        <hr></hr>
                                    <textarea className="form-control" aria-label="With textarea" placeholder="Input Comment" style={{height:"150px"}}></textarea>
                                    <button type="button" className="btn btn-dark btn-md mt-3 btn-block" >ADD Comment</button>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
                
                <div className="container">
                <div className="row">
                    {this.renderRecommendProduct()}
                </div>
                </div>

                <Footer/>
            </div>
        )
    }   
}

const mapStatetoProps = state => {
    return {
        user: state.auth
    }
}


export default connect(mapStatetoProps) (DetailProduct)