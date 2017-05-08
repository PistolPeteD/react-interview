import React, {Component} from 'react';
import NavBar from './components/NavBar';
import ShoeList from './components/ShoeList';
import CartSummary from './components/CartSummary';
import CartDetails from './components/CartDetails';
import Api from './api';
import Facet from './components/Facet';

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
        tempcart.push(shoe);
        this.setState(
            {
                cart: tempcart
            }
        )
    }

    handleFacetSelect(facetSelected) {

          console.log("before peter ",this.state.allshoes);
        console.log("this.state.facetSelected ",this.state.facetSelected);
        console.log("facetSelected ",facetSelected);
        // debugger;
        if (this.state.facetSelected!= null)
        {


        if (this.state.facetSelected.brand === facetSelected.brand) {
            //to do restore the list of shoes.
            console.log("after peter ",this.state.allshoes);
            this.setState(
                {
                    facetSelected: null,
                    shoes:this.state.allshoes

                }

            )

            console.log("after peter shoes ",this.state.shoes);
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

                <NavBar title="Hello World"/>

                <ShoeList onShoeSelect={this.handleShoeSelect} shoes={this.state.shoes}/>

                <Facet items={this.state.allshoes} onFacetSelect={this.handleFacetSelect} />


                <div className="row">

                    {/*<div className="col s3">*/}
                        {/*I am the left pane*/}
                    {/*</div>*/}

                    {/*<div className="col s6">*/}
                        {/*I am in the middle*/}
                    {/*</div>*/}

                    <div className="col s3">
                        <CartSummary cart={this.state.cart}/>
                    </div>

                    <div className="col s7">
                        <CartDetails cart={this.state.cart}/>
                    </div>

                </div>
            </div>

        );
    }
}

export default App;
