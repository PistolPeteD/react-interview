import React from 'react';

const CartSummary = (props) => {
    var TotalSum = 0;
    var TotalQuantity = 0;

    props.cart.forEach((value) => {
        TotalSum += (value.amount);
        TotalQuantity+= (value.quantity);

    });

    return (


        <div className="CartSummary">
            <h3>My Cart Summary</h3>
            <label id="ItemCount">{TotalQuantity}</label><br/>
            <label id="TotalCost">{TotalSum.toFixed(2)}</label>

        </div>



    )
};

CartSummary.propTypes = {
    cart: React.PropTypes.array.isRequired
};

export default CartSummary;