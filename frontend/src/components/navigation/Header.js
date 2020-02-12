import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { onLogoutUser} from '../../action'
import {
    Navbar,
    Nav,
    NavDropdown,
    Button,
    } from 'react-bootstrap'
import axios from '../../config/axios';
import './Header.css'

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            hidden: true,
            password: "",
            category: [],
            cart: []
        };
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.toggle = this.toggle.bind(this);
        this.toggleShowPassword = this.toggleShowPassword.bind(this)
    }
    componentDidMount (){
        this.getCategory()
        this.getCart()
        this.renderCategory()
    }

    onButtonClick = () => {
        // Menghapus username dari redux state
        this.props.onLogoutUser()
    }
    
    toggle() {
        this.setState(prevState => ({
        modal: !prevState.modal
        }));
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    toggleShowPassword() {
        this.setState({ hidden: !this.state.hidden});
    }

    getCategory = () => {
        axios.get('/category')
            .then(res => {
                this.setState({category: res.data})
            })
    }

    getCart = () => {
        axios.get('http://localhost:2019/cart')
            .then(res => {
                this.setState({cart: res.data})
            })
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

    renderCategory = () => {
        return this.state.category.map(cat => {
            return(
                <NavDropdown.Item as={Link} to={"/product/"+cat.id}>{cat.category_name}</NavDropdown.Item>
            )
        })
    }
  
    render () {
        console.log(this.state.category);
        const {user} = this.props
        if(user.username === ''){
            return (
                <div className="fixed-top">
                    <div>
                        <Navbar expand="lg" bg="dark" variant="dark">
                            <Navbar.Brand className="header-text" as={Link} to='/'>Test Onero</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto ml-auto nav-text">
                                    <Nav.Link className="text-light" as={Link} to='/'>HOME</Nav.Link>
                                    <NavDropdown title="SHOP" >
                                        <NavDropdown.Item as={Link} to='/allproduct'>All</NavDropdown.Item>
                                        {this.renderCategory()}
                                    </NavDropdown>
                                </Nav>
                                <Nav.Link className="text-light nav-text" as={Link} to='/login'>
                                    <Button className="btn btn-outline-light">LOGIN</Button>    
                                </Nav.Link>
                                <Nav.Link className="text-light nav-text"  as={Link} to='/register'>
                                    <Button className="btn btn-outline-light">REGISTER</Button>
                                </Nav.Link>
                            </Navbar.Collapse>
                        </Navbar>
                    </div>
                 </div>
            )
        } 
        return (
            <div className="fixed-top">
                <Navbar expand="lg" bg="dark" gradient="blue" variant="dark">
                    <Navbar.Brand className="header-text" as={Link} to='/'>Test onero</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto ml-auto nav-text">
                        <Nav.Link className="text-light" as={Link} to='/profile'>PROFILE</Nav.Link>
                            <Nav.Link className="text-light" as={Link} to='/'>HOME</Nav.Link>
                            <NavDropdown title="SHOP" >
                            <NavDropdown.Item as={Link} to='/allproduct'>All</NavDropdown.Item>
                                {this.renderCategory()}
                            </NavDropdown>
                            <Nav.Link className="text-light" as={Link} to={"/confirm/"+this.props.user.id}>LIST ORDER</Nav.Link>
                        </Nav>
                        <Nav.Link className="text-light nav-text" as={Link} to={"/cart/"+this.props.user.id}>
                            <i className="fa fa-shopping-cart mr-1" style={{fontSize:'1.2em'}}></i><span>{this.totalQty()}</span>
                        </Nav.Link>
                        <Nav.Link className="text-light nav-text" onClick={() => {this.onButtonClick()}}>LOGOUT</Nav.Link>
                    </Navbar.Collapse>
                </Navbar>
             </div>
        )
    }
}

const mapStateToProps = state => {
    return {
       user: state.auth // id dan username
    }
 }
 
 export default connect(mapStateToProps, { onLogoutUser })(Header)
