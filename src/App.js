import React, {Component} from 'react';
import NavBar from './components/NavBar';
import ShoeList from './components/ShoeList';
import CartSummary from './components/CartSummary';
import CartDetails from './components/CartDetails';
import Api from './api';
import Facet from './components/Facet';
import {Switch, Route, Link, Redirect} from 'react-router-dom'

class App extends Component {

    /**
     * TIP:
     *  - this.state = {...}
     *  - this.someFunction = this.someFunction.bind(this)
     * */
    constructor(props) {
        super(props);

        this.state = {
            shoes: [], cart: [], facetSelected: null, allshoes: [], isMainIn: true, removeCartButton: true
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

    switchScreens() {
        if (this.state.isMainIn) {
            this.setState({isMainIn: false, removeCartButton: false});
        } else {
            this.setState({isMainIn: true, removeCartButton: true});
        }
    }


    handleShoeSelect(shoe) {
        var tempcart = this.state.cart;


        var foundItem = tempcart.find(function (existingItem) {
            return existingItem.name === shoe.name;
        });


        if (foundItem) {
            foundItem.quantity++;
            foundItem.amount += (foundItem.price);

        } else {

            shoe.quantity = 1;
            shoe.amount = shoe.price;
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

        var foundItem = tempcart.findIndex(function (existingItem) {
            return existingItem.name === shoe.name;
        });

        if (tempcart[foundItem].quantity == 1) {

            tempcart.splice(foundItem, 1);

        } else if (tempcart[foundItem].quantity > 1) {
            tempcart[foundItem].quantity--;
            tempcart[foundItem].amount -= tempcart[foundItem].price;

        }


        this.setState(
            {
                cart: tempcart
            }
        )
    }


    handleFacetSelect(facetSelected) {


        if (this.state.facetSelected != null && this.state.facetSelected.brand === facetSelected.brand) {

            if (this.state.facetSelected.brand === facetSelected.brand) {
                //to do restore the list of shoes.

                this.setState(
                    {
                        facetSelected: null,
                        shoes: this.state.allshoes

                    }
                )


            }
        }

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

        if (this.state.isMainIn) {
            return (
                <div>

                    <NavBar title="My App Store"/>
                    <div className="row">

                        <div className="col s3">
                            <Facet items={this.state.allshoes} onFacetSelect={this.handleFacetSelect}/>
                        </div>


                        <div className="col s6">
                            <ShoeList onShoeSelect={this.handleShoeSelect} shoes={this.state.shoes}/>
                        </div>


                        <div className="col s3">
                            <div>

                                <CartSummary cart={this.state.cart}/>

                            </div>
                            <button id="fixed-button">
                                <Link to='/checkout' onClick={this.switchScreens}>CheckOut</Link>
                            </button>

                            <div>
                                <CartDetails onShoeRemove={this.handleShoeRemove} cart={this.state.cart}
                                             removeCartButton={this.state.removeCartButton}/>
                            </div>


                            <Route exactly path="/" render={() => (
                                <Redirect
                                    to="/"
                                />
                            )}/>

                        </div>


                    </div>

                    <div>


                    </div>

                </div>


            );
        } else {
            return (
                <div>
                    <CartSummary cart={this.state.cart}/>
                    <CartDetails onShoeRemove={this.handleShoeRemove} cart={this.state.cart}
                                 removeCartButton={this.state.removeCartButton}/>
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
