import React, {Component} from 'react';
import NavBar from './components/NavBar';
import ShoeList from './components/ShoeList';
import CartSummary from './components/CartSummary';
import CartDetails from './components/CartDetails';
import Api from './api';
import Facet from './components/Facet';
import { Switch, Route, Link, Redirect } from 'react-router-dom'
// import CheckOutForm from  './components/CheckOutForm';



// class CheckOutForm extends Component {
//     constructor(props) {
//         super(props);
//
//     }
//
//     render() {
//         return (
//             <div>
//
//                 <div> I have landed on the page</div>
//             </div>
//
//
//
//
//
//         );
//     }
// }

class App extends Component {

    /**
     * TIP:
     *  - this.state = {...}
     *  - this.someFunction = this.someFunction.bind(this)
     * */
    constructor(props) {
        super(props);

        this.state = {
            shoes: [], cart: [], facetSelected: null, allshoes: [], isMainIn: true, removeCartButton:true
        };
        this.handleShoeSelect = this.handleShoeSelect.bind(this);
        this.handleFacetSelect = this.handleFacetSelect.bind(this);
        this.handleShoeRemove = this.handleShoeRemove.bind(this);
        this.switchScreens = this.switchScreens.bind(this);


    }

    /**
     * TIP:
     *  - Api.getShoes() returns a promise
     *  - Api.getShoes() returns a promise
     *  - this.setState() might be useful
     * */
    componentDidMount() {

        Api.getShoes().then(shoes => {
            this.setState(
                {
                    shoes, allshoes: shoes
                }
            )
        });

    }

    switchScreens(){
        if  (this.state.isMainIn) {
            this.setState({isMainIn: false, removeCartButton: false});
        } else
        {
            this.setState( { isMainIn: true, removeCartButton:true } );
        }
    }



    handleShoeSelect(shoe) {
        var tempcart = this.state.cart;

        console.log("test");
        console.log("tempcart.name :",tempcart);
        console.log("shoe.name :",shoe.name);
        var foundItem = tempcart.find(function (existingItem) {
            // console.log("existingItem :",existingItem.name);
            console.log("existingItemlength :",existingItem.name);
            return existingItem.name === shoe.name;
        });

        console.log("foundItem",foundItem)

        if (foundItem) {
            console.log("if condition");
            foundItem.quantity++;
            foundItem.amount += (foundItem.price);

        } else {

            shoe.quantity = 1;
            shoe.amount   = shoe.price;
            tempcart.push(shoe);
        }

        this.setState(
            {
                cart: tempcart
            }
        )
    }



    handleShoeRemove(shoe) {
        var tempcart = this.state.cart;
        tempcart.pop(shoe);
        this.setState(
            {
                cart: tempcart
            }
        )
    }



    handleFacetSelect(facetSelected) {



        if (this.state.facetSelected!= null && this.state.facetSelected.brand === facetSelected.brand)
        {

            if (this.state.facetSelected.brand != facetSelected.brand) {
                //to do restore the list of shoes.

                this.setState(
                    {
                        facetSelected: null,
                        shoes:this.state.allshoes

                    }

                )


            }}

        else {

            const filterBrand = this.state.allshoes.filter(function (shoe) {
                return (shoe.brand === facetSelected.brand)
            });
            this.setState({
                facetSelected: facetSelected,
                shoes: filterBrand
            });


        }
    }


    render() {
        console.log("this.state.cart",this.state.cart)
        if (this.state.isMainIn) {
            return (
                <div>

                    <NavBar title="My App Store" />
                    <div className="row">

                        <div className="col s3" >
                            <Facet items={this.state.allshoes} onFacetSelect={this.handleFacetSelect} />
                        </div>


                        <div className="col s6">
                            <ShoeList onShoeSelect={this.handleShoeSelect} shoes={this.state.shoes}/>
                        </div>


                        <div className="col s3" >
                            <CartSummary cart={this.state.cart}/>
                            <CartDetails onShoeRemove={this.handleShoeRemove} cart={this.state.cart} removeCartButton={this.state.removeCartButton}/>

                        </div>

                        <div>
                            <div>
                                {/*<a className="item" onClick={this.switchScreens} >CheckOut</a>*/}
                                <ul>
                                    {/*<li><Link to='/'>Home</Link></li>*/}
                                    <button>
                                    <Link to='/checkout' onClick={this.switchScreens}>CheckOut</Link>
                                    </button>
                                    {/*<li><Link to='/checkout'>Checkout</Link></li>*/}
                                    {/*<li><Link to='/schedule'>Schedule</Link></li>*/}
                                </ul>

                                {/*<Route path='/checkout' component={CheckOutForm}/>*/}
                                <Route exactly path="/" render={() => (
                                    <Redirect
                                        to="/"
                                    />
                                )} />

                                {/*<Switch>*/}
                                {/*<Route exact path='/' component={Home}/>*/}

                                {/*<Route path='/schedule' component={Schedule}/>*/}

                                {/*{this.props.children}*/}
                                {/*</Switch>*/}
                            </div>
                        </div>


                    </div>

                </div>


            );
        } else {
            return (
                <div>
                <CartSummary cart={this.state.cart}/>
                <CartDetails onShoeRemove={this.handleShoeRemove} cart={this.state.cart} removeCartButton={this.state.removeCartButton}/>
                <button type="button">Pay</button>
                    <hr/>
                    <button>
                        <Link to='/' onClick={this.switchScreens}>Back to Store</Link>
                    </button>
                </div>
            )
        }
    }
}


export default App;
