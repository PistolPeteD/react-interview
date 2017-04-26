import React from 'react';

const Shoe = (props) => (
    <div>
        {props.brand}
        {props.name}
        {props.price.toFixed(2)}

       <div>
            <a onClick={() => props.onShoeSelect(props)}>Add to Cart</a>
       </div>

    </div>
);

Shoe.propTypes = {
    brand: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    price: React.PropTypes.number.isRequired,
    onShoeSelect: React.PropTypes.func,
};

export default Shoe;

