import React from 'react';

const CartSummary = (props) => {
    var TotalSum = 0;

    props.cart.forEach((value) => {
        TotalSum += (value.price);

    });

    return (


        <div className="CartSummary">
            <h3>My Cart </h3>
            <label id="ItemCount">{props.cart.length}</label><br/>
            <label id="TotalCost">{TotalSum.toFixed(2)}</label>

        </div>


    )
};

CartSummary.propTypes = {
    cart: React.PropTypes.array.isRequired
};

export default CartSummary;