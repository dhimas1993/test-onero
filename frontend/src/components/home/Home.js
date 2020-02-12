import React, { Component } from 'react'

import Header from '../navigation/Header'
import Footer from '../navigation/Footer'
import Carousel from './Carousel'
import Producthome from '../product/Producthome'
import ProductBest from '../product/productBest'

class Home extends Component {

    componentDidMount() {
        window.scrollTo(0, 0)
    }
    
    render () {
        return (
            <div>
                <Header/>
                <div style={{ marginTop: "80px" }}>
                    <Carousel />
                    <Producthome />
                    <ProductBest />
                        <div className="container-fluid mt-5 mb-5">
                            <div className="">
                            </div>
                            <hr></hr>
                        </div>
                        <div className="container">
                            <hr></hr>
                            <div className="row">
                                <div className="col-md-6">
                                    <div class="hovereffect">
                                        <img style={{width: "530px"}} to="" class="img-responsive" src="https://media.wonderlandmagazine.com/uploads/2019/05/1T0A1300.jpg" alt=""/>>
                                        <div class="overlay">
                                        <h2>Tshirt</h2>
                                        <a class="info" href="product/1">link here</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="">
                                        <div class="hovereffect">
                                            <img style={{width: "580px"}} class="img-responsive" src="https://cdn3.eyeem.com/thumb/fa4252d5eab689a036e2e77342d9d8de07a453af-1529876102099/w/800" alt=""/>
                                            <div class="overlay">
                                            <h2>Hanging Wall</h2>
                                            <a class="info" href="product/4">link here</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div class="hovereffect">
                                            <img style={{width: "580px", height: "580x"}} class="img-responsive" src="https://images.unsplash.com/photo-1514792024323-7b7cf14ea4cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=932&q=80" alt=""/>
                                            <div class="overlay">
                                            <h2>Scarf</h2>
                                            <a class="info" href="product/3">link here</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <Footer/>
                </div>
            </div>
        )
    }
}

export default Home