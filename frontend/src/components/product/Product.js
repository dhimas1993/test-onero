import React, { Component } from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBCardHeader, MDBIcon } from 'mdbreact';
import axios from 'axios'

import Header from '../navigation/Header'
import Footer from '../navigation/Footer'
import ProductItem from './productItem'


class Product extends Component {

    state = {
        category: [],
        products: [],
        search_pro: [],
        search_cat : [],
    }

    componentDidMount () {
        this.getProduct()
        this.getCategory()
    }

    getProduct = () => {
        axios.get('http://localhost:2019/product')
            .then(res => {
                this.setState({products: res.data, search_pro : res.data})
                console.log(res.data);
        })
    }
    
    getCategory = () => {
        axios.get('http://localhost:2019/category')
            .then(res => {
                this.setState({category: res.data, search_cat : res.data})
                console.log(res.data);
                
        })
    }
    
    
    renderProduct = () => {
        return this.state.products.map(item => { // hasil map = item{id,name,desc,price,src}
            return (
                <ProductItem item={item}/>
            )
        })
    }

    renderCategory = () => {
        return this.state.products.map(item => { // hasil map = item{id,name,desc,price,src}
            return this.state.category.map(catMap => {
                if(item.category_id === catMap.id){
                    return (
                        <ProductItem items={item}/>
                    )
                }
            })
        })
    }

    renderList = () => {
        return (
            <div className="row">
                {this.renderCategory()}
            </div>
        )
    }

    resetFilter = () => {
        return(
            this.setState({products:this.state.search_pro, category:this.state.search_cat}),
            this.getProduct()
        )
    }

    onBtnSearch = () => {
        const name = this.nama.value
        // const category = this.category.value
        const max = parseInt(this.max.value) 
        const min = parseInt(this.min.value)
        
        var proSearch = this.state.search_pro.filter (item => {
            if(isNaN(min) && isNaN(max)){ // Search by Name
                return (
                    item.product_name.toLowerCase().includes(name.toLowerCase())
                )
            } else if (isNaN(min)){ // Name and min
                return (
                    item.product_name.toLowerCase().includes(name.toLowerCase())
                    &&
                    item.price <= max
                )
            } else if (isNaN(max)){ // Name and Max
                return (
                    item.product_name.toLowerCase().includes(name.toLowerCase())
                    &&
                    item.price >= min
                )
            } else if (item.price <= max && item.price >= min){
                return (
                    item.product_name.toLowerCase().includes(name.toLowerCase())
                    &&
                    item.price <= max && item.price >= min
                )
            }
        })

        // var catSearch = this.state.search_cat.filter (item => {
        //     if(category){
        //         return(
        //             item.category_name.toLowerCase().includes(category.toLowerCase())
        //         )
        //     }
        // })

        // if (catSearch[0]) {
        //     this.setState({category: catSearch})
        // }
        if (proSearch[0]) {
            this.setState({products: proSearch})
        }
    }

    render () {
        return (
            <div className="" style={{marginTop: "120px"}}>
                <Header/>
                <h1 className="display-4 text-center mb-5 mt-5" >All Product</h1>
                    <div className="container-fluid row">
                        <MDBCol lg="3" md="3" className="mb-lg-0 mb-4">
                            <MDBCol>
                                <MDBCard >
                                    <MDBCardBody>
                                        <MDBCardHeader className="form-header deep-blue-gradient rounded text-center mb-4">
                                            <h3 className="my-3">
                                                <MDBIcon icon="search" /> Search
                                            </h3>
                                        </MDBCardHeader>
                                            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                                                Nama Product
                                            </label>
                                            <input type="text" id="defaultFormRegisterNameEx" ref={input => {this.nama = input}} className="form-control"/>
                                            {/* <label htmlFor="defaultFormRegisterNameEx" className="grey-text mt-4">
                                                Category
                                            </label>
                                            <input type="text" id="defaultFormRegisterNameEx" ref={input => {this.category = input}} className="form-control mb-4"/>
                                            <hr className="mt-5 mb-4"></hr> */}
                                            <div className="row">
                                                <div className="col-6">
                                                    <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                                                        Harga max
                                                    </label>
                                                    <input type="number" id="defaultFormRegisterNameEx" ref={input => {this.max = input}} className="form-control"/>
                                                </div>
                                                <div className="col-6">
                                                    <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                                                        Harga min
                                                    </label>
                                                    <input type="number" id="defaultFormRegisterNameEx" ref={input => {this.min = input}} className="form-control"/>
                                                </div>
                                            </div>
                                            <div className="text-center mt-3">
                                                <button className="btn btn-primary" onClick={()=>this.onBtnSearch()} >Search</button>
                                                <button className="btn btn-primary" onClick={this.resetFilter}>Cancel</button>
                                            </div>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBCol>

                        <MDBCol lg="9" md="9" className="mb-lg-0 mb-4">
                            <div>
                                {this.renderList()}
                            </div>
                        </MDBCol>
                    </div>
                <Footer/>
            </div>
        )
    }
}

export default Product