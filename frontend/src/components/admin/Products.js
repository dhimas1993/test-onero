import React, { Component } from 'react'
import axios from 'axios'
import { Nav, NavItem, NavLink, TabContent, TabPane, Row, Col} from 'reactstrap'
import classnames from 'classnames'
import { connect } from 'react-redux'

class Product extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            activeTab: '1',
            product: [],
            category: [],
            search_pro: [],
            search_cat: []
        }
        this.toggle = this.toggle.bind(this);
        this.toggleModal = this.toggleModal.bind(this)
        this.toggleUpload = this.toggleUpload.bind(this)
    }

    componentDidMount(){
        this.getProduct()
        this.getCategory()
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
        })}
    }
    
    toggleModal() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    toggleUpload() {
        this.setState(prevState => ({
            upload: !prevState.upload
        }));
    }

    getProduct = () => {
        axios.get('http://localhost:2019/product')
            .then(res => {
            this.setState({product: res.data, search_pro: res.data})
            })
        }

    getCategory = () => {
        axios.get('http://localhost:2019/category')
            .then(res => {
               this.setState({category: res.data, search_cat : res.data})
            })
    }

    uploadImage = (item) => {
        const formData = new FormData()
        const image = this.image.files[0]
        
        formData.append('image', image)
        formData.append('id', item)

        axios.post('http://localhost:2019/product/image/', formData
        ).then(res=>{
            this.getProduct()
            alert('berhasil upload')
        })
    }

    deleteProduct = (item) => {
        axios.delete('http://localhost:2019/product/'+item.id).then(res=>{
            console.log("data telah dihapus");
            console.log(res);
            this.getProduct() 
        })
    }

    addProduct = () => {
        const product_name = this.product_name.value
        const category_id = this.categories.value
        const price = this.price.value
        const stock = this.stock.value
        const detail = this.deskripsi.value
        console.log(category_id);
        console.log(this.category)
        
        
        axios.post('http://localhost:2019/addproduct',
        {
            product_name,
            category_id,
            price,
            stock,
            detail
        }).then(res=>{
            console.log("data telah disimpan");
            console.log(res.data);
            this.getProduct()
            alert('Upload Berhasil')
        })
    }

    renderCategory = () => {
        return this.state.category.map( catMap => {
            return (<option value={catMap.id}>{catMap.category_name}</option>)
        })
    }

    renderListCategory = ()=> {
        return this.state.category.map (catMap => {
            if(this.state.editCat !== catMap.id){
                return (
                    <tr>
                        <td>{catMap.id}</td>
                        <td>{catMap.category_name}</td>
                        <td>
                            {/* <button className="btn btn-primary" onClick={() => {this.setState({editCat: catMap.id})}}>edit</button> */}
                        </td>
                    </tr>
                )
            } else {
                return (
                    <tr>
                        <td>{catMap.id}</td>
                        <td><input type="text" className="form-control" placeholder={catMap.category_name} /></td>
                        {/* <td>
                            <button className="btn btn-primary">Save</button>
                            <button className="btn btn-primary ml-2" onClick={() => {this.setState({editCat: 0})}}>Cancel</button>
                        </td> */}
                    </tr>
                )
            }
        })
    }

    handleEditProduct = (item) => {
        const product_name = this.product_name.value
        const category_id = this.editCategory.value
        const detail = this.detail.value
        const price = this.price.value
        const stock = this.stock.value

        axios.patch(`http://localhost:2019/product/${item}`,
            {
                product_name,
                category_id, 
                detail,price, 
                stock
            }).then(res=> {
                console.log(res.data)
                this.getProduct()
                this.setState({edit:0})
            })
    }

    onBtnSearch = () => {
        const name = this.nama.value
        const category = this.category.value
        const max = parseInt(this.max.value) 
        const min = parseInt(this.min.value)
        
        var proSearch = this.state.search_pro.filter (item => {
            if(isNaN(min) && isNaN(max)){ // Search by Name
                return (
                    item.product_name.toLowerCase().includes(name.toLowerCase())
                )
            } else if (isNaN(min)){ // Name and Max
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

        var catSearch = this.state.search_cat.filter (item => {
            if(category){
                return(
                    item.category_name.toLowerCase().includes(category.toLowerCase())
                )
            }
        })

        if (catSearch[0]) {
            this.setState({category: catSearch})
        }
        if (proSearch[0]) {
            this.setState({product: proSearch})
        }
    }

    resetFilter = () => {
        return(
            this.setState({products:this.state.search_pro, category:this.state.search_cat})
        )
    }



    renderList = () => {
        return this.state.product.map( item => {
            if (this.state.edit !== item.id) {
                return this.state.category.map ( cat => {
                if (item.category_id === cat.id) {
                    return (
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.product_name}</td>
                            <td>{item.detail}</td>
                            <td>{item.price}</td>
                            <td>{cat.category_name}</td>
                            <td>{item.stock}</td>
                            <td>
                            <img className='list' alt='' onClick={()=>{this.setState({upload : item.id})}} style={{width: 75}} src={`http://localhost:2019/product/avatar/${item.image}`}/>
                            </td>
                            <td>
                                <button className="btn btn-primary" onClick={()=> {this.setState({edit: item.id})}}>Edit</button>
                                <button className="btn btn-danger" onClick={() => {this.deleteProduct(item)}}>Delete</button>
                            </td>
                        </tr>
                    )
                }
                })
            }
            return (
                <tr>
                    <td>{item.id}</td>
                    <td><input type="text" className="form-control" defaultValue={item.product_name} ref={input => this.product_name = input}/></td>
                    <td><textarea rows="4" type="text" className="form-control" defaultValue={item.detail} ref={input => this.detail = input}/></td>
                    <td><input type="text" className="form-control" defaultValue={item.price} ref={input => this.price = input}/></td>
                    <td>
                        <select class="form-control" ref={input => {this.editCategory = input}} defaultValue={item.category_id}>
                            {this.renderCategory()}
                        </select>
                    </td>
                    <td>
                        <input type="text" className="form-control" defaultValue={item.stock} ref={input => this.stock = input}/>
                    </td>
                    <td>
                        <input type='file' ref={input => (this.image = input)}></input>
                    </td>
                    <td>
                        <button className="btn btn-primary" onClick={() => {this.handleEditProduct(item.id)}}>Save</button>
                        <button className="btn btn-primary" onClick={() => {this.uploadImage(item.id)}}>upload</button>
                        <button className="btn btn-danger"onClick={()=> {this.setState({edit: 0})}}>Cancel</button>
                    </td>
                </tr>
            )
        })
    }

    render () {
        return (
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.state.activeTab === '1' })}
                        onClick={() => { this.toggle('1'); }}
                        >
                        Add Product
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.state.activeTab === '2' })}
                        onClick={() => { this.toggle('2'); }}
                        >
                        List Product
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                        className={classnames({ active: this.state.activeTab === '3' })}
                        onClick={() => { this.toggle('3'); }}
                        >
                        List Category
                        </NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <div className="row">
                                    <div className="col-md-5">
                                        <div className="container d-block">
                                            <h5>Nama Product</h5>
                                            <input className="form-control"ref={(product_name) => {this.product_name = product_name}}></input>
                                            <h5>Harga</h5>
                                            <input type="number" className="form-control" ref={(price) => {this.price = price}}></input>
                                            <p className="font-italic text-danger">masukan angka saja tanpa ","</p>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="container d-block">
                                            <h5>Category</h5>
                                                <form>
                                                <select class="form-control" ref={(category) => {this.categories = category}}>
                                                    {this.renderCategory()}
                                                </select>
                                                </form>
                                            <h5>Stock</h5>
                                                <input type="number" className="form-control" ref={(stock) => {this.stock = stock}}></input>
                                            <p className="font-italic text-danger">masukan angka saja tanpa ","</p>
                                            <h5>Deskripsi</h5>
                                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" ref={(deskripsi) => {this.deskripsi = deskripsi}}></textarea>
                                        </div>
                                        <div className="offset-10">
                                            <button className="btn btn-primary justify-content-center mt-3" onClick={() => {this.addProduct()}}>Save</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-10">
                                    
                                </div>
                            </Col>
                        </Row>
                    </TabPane>

                    <TabPane tabId="2">
                    <div className="mt-4 mb-4">
                        <h1 className="display-4 text-center">List Product</h1>
                        <div class="input-group mb-3 mt-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">Nama Product</span>
                            </div>
                            <input type="text" class="form-control" ref={input => {this.nama = input}} placeholder="Nama product disini" defaultValue='' aria-describedby="basic-addon1"/>
                            <div class="input-group-prepend">
                                <span class="input-group-text ml-2" id="basic-addon1">Category</span>
                            </div>
                            <input type="text" class="form-control" ref={input => {this.category = input}} placeholder="Category product disini" defaultValue='' aria-describedby="basic-addon1"/>
                            <div class="input-group-prepend">
                                <span class="input-group-text ml-2" id="basic-addon1">Harga</span>
                            </div>
                            <input type="text" class="form-control" ref={input => {this.min = input}} placeholder="Masukan harga minimal product" defaultValue='' aria-describedby="basic-addon1"/>
                            <input type="text" class="form-control" ref={input => {this.max = input}} placeholder="Masukan harga maximal product" defaultValue='' aria-describedby="basic-addon1"/>
                            <button className='btn btn-primary ml-2' onClick={()=>this.onBtnSearch()}>Search</button>
                        </div>
                        <table className="table table-hover mb-5 text-center">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">NAME</th>
                                    <th scope="col">DESC</th>
                                    <th scope="col">PRICE</th>                                    
                                    <th scope="col">CATEGORY</th>                                    
                                    <th scope="col">STOCK</th>                                    
                                    <th scope="col">PICTURE</th>
                                    <th scope="col">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderList()}
                            </tbody>
                        </table>
                    </div>
                    </TabPane>

                    <TabPane tabId="3">
                        <div className="">
                            <h1 className="display-4 text-center">List Product</h1>
                            <table className="table table-hover mb-5 text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">NAME</th>
                                        {/* <th scope="col">ACTION</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderListCategory()}
                                </tbody>
                            </table>
                        </div>
                    </TabPane>
                </TabContent>
            </div>    
            )   
        }
    }

const mapStatetoProps = state => {
    return {
        user: state.auth
    }
}


export default connect(mapStatetoProps)(Product)