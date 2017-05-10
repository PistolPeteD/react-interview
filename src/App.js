import React, {Component} from 'react';
import NavBar from './components/NavBar';
import ShoeList from './components/ShoeList';
import CartSummary from './components/CartSummary';
import CartDetails from './components/CartDetails';
import Api from './api';
import Facet from './components/Facet';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

const Match = ({ pattern, component: Component }) => {
    const pathname = window.location.pathname;
    if (pathname.match(pattern)) {
        return (
            <Component />
        );
    } else {
        return null;
    }
};


const Atlantic = () => { return(<h2>Atlantic</h2> )};

const Pacific = () => { return(<h2>Pacific</h2> )};

class App extends Component {

    /**
     * TIP:
     *  - this.state = {...}
     *  - this.someFunction = this.someFunction.bind(this)
     * */
    constructor(props) {
        super(props);

        this.state = {
            shoes: [], cart: [], facetSelected: null, allshoes: []
        };
        this.handleShoeSelect = this.handleShoeSelect.bind(this);
        this.handleFacetSelect = this.handleFacetSelect.bind(this);
        this.handleShoeRemove = this.handleShoeRemove.bind(this);


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

             // var CheckOut={shoe: shoe,quantity:1};
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

        if (this.state.facetSelected.brand === facetSelected.brand) {
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
                        <CartDetails onShoeRemove={this.handleShoeRemove} cart={this.state.cart}/>


                    </div>


                </div>

                <ul>
                    <li>
                        <a href='/atlantic'>
                            <code>/atlantic</code>
                        </a>
                    </li>
                    <li>
                        <a href='/pacific'>
                            <code>/pacific</code>
                        </a>
                    </li>
                </ul>
                <hr />
                <Match pattern='/atlantic' component={Atlantic} />
                <Match pattern='/pacific' component={Pacific} />
            </div>

        );
    }
}

export default App;
