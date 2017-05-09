import React from 'react';

const Shoe = (props) => (
    <div>
        {props.brand}
        {props.name}
        {props.price.toFixed(2)}

        return (  <div>
            {/*{<a href="#" onClick={props.onShoeSelect(Shoe)}>Add to cart please</a>}*/}

            {/*<button onClick={props.onShoeSelect}>Add to cart</button>*/}
            <a href="#" onClick={props.onShoeSelect({
                id: props.id,
                brand: props.brand,
                name: props.name,
                price: props.price
            })}>Add to cart</a>

            {/*<button onClick={props.onShoeSelect({*/}
                {/*id: props.id,*/}
                {/*brand: props.brand,*/}
                {/*name: props.name,*/}
                {/*price: props.price*/}
            {/*})}>Add to cart</button>*/}
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


