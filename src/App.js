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
      shoes: [], cart:[]};
      this.handleShoeSelect=this.handleShoeSelect.bind(this);

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
                shoes
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

  render()
  {      return (
      <div>

        <NavBar title="Hello World"/>

        <ShoeList onShoeSelect={this.handleShoeSelect} shoes={this.state.shoes}/>

        <Facet items={this.state.shoes}/>

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
