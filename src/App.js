import React, { Component } from 'react';
import NavBar from './components/NavBar';
import ShoeList from './components/ShoeList';
import CartSummary from './components/CartSummary';
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

    this.state={
      shoes: [], cart:[], facetSelected:null,allshoes:[]} ;
      this.handleShoeSelect=this.handleShoeSelect.bind(this);
      this.handleFacetSelect=this.handleFacetSelect.bind(this);


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
                shoes, allshoes:shoes
            }
        )
        console.log(this.state)
    });

  }

  handleShoeSelect (shoe) {
      console.log("this.state",this.state);
      var tempcart = this.state.cart;
          tempcart.push(shoe);
          this.setState(
             {
               cart: tempcart
             }
         )
  console.log(tempcart)
  }

 handleFacetSelect (facetSelected) {

      if (this.state.facetSelected === facetSelected)


      {
          this.setState(


          {
               facetSelected: null
          }

      )}
      else
      {
      this.setState(

         {

           facetSelected: facetSelected
        }
      )
          console.log("shoes before filter",this.state.shoes);
          var filterBrand = this.state.allshoes.filter(function (shoe) {
              return (shoe.brand === facetSelected.brand)
          });

       this.setState({shoes:filterBrand});
      console.log(filterBrand);
      }

  }

  render()
  {      return (
      <div>

        <NavBar title="Hello World"/>

        <ShoeList onShoeSelect={this.handleShoeSelect} shoes={this.state.shoes}/>

        <Facet items={this.state.allshoes} onFacetSelect={this.handleFacetSelect} />

          <div className="row">

          <div className="col s3">
            I am the left pane
          </div>

          <div className="col s6">
            I am in the middle
          </div>

          <div className="col s3">
              <CartSummary cart={this.state.cart} />
          </div>

        </div>
      </div>

    );
  }
}

export default App;
