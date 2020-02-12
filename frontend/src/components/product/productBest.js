import React, { Component } from 'react'
import axios from 'axios'
import ProductItem from './productItem'

class ProductBest extends Component {

    state = {
        category: 0,
        products: [],
        search_pro: []
    }

    componentDidMount () {
        this.getProduct()
    }

    getProduct = () => {
        axios.get('http://localhost:2019/product-bestseller')
        .then(res => 
            this.setState({products: res.data, search_pro: res.data})
        )
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
            const urutan = this.state.products.indexOf(item)
            const latest = this.state.products.length - 5
    
        if(item.category_id === this.state.category)  
        {
            return (
            <ProductItem items={item}/>
            )
        }
    
        if(urutan > latest){
            if(this.state.category === 0){
            return (
                <ProductItem items={item}/>
            )
            }
        }
        })
    }

    renderList = () => {
        return (
          <div className="row">
            {this.renderCategory()}
          </div>
        )
      }

    render () {
        if (this.state.products === null){
            return <h1> L o a d i n g . . . </h1>
        }
            return (
                <div className="container" style={{ marginTop: "60px" }}>
                    <div className="text-center">
                        <h2>Best Seller</h2>
                    </div>
                    <div className="container">
                        {this.renderList()}
                    </div>
                </div>
        )
    }
}

export default ProductBest