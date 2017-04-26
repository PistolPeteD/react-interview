import React from 'react';
import Shoe from './Shoe';

const ShoeList = (props) => (

    <div>
        <div>Shoe List</div>
        {props.shoes.map((shoe) =>
         <Shoe brand={shoe.brand}
               name={shoe.name}
               price={shoe.price}
               onShoeSelect={()=> props.onShoeSelect(shoe)}
         />)}

   </div>
);



ShoeList.propTypes = {
  shoes: React.PropTypes.array.isRequired,
  onShoeSelect: React.PropTypes.func
};

export default ShoeList;


