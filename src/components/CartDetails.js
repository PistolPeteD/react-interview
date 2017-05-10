import React from 'react';

const CartDetails = (props) => {

    props.cart.forEach((Details) => {

    });

    return (

        <div>
            <div><h3>Cart Details</h3></div>
            {props.cart.map((Detail) =>
             <div>
                <div> {Detail.brand} >> {Detail.name}  </div>
                <div> No.of Units: {Detail.quantity}  </div>
                <div> Price per Unit: {Detail.price.toFixed(2)}  </div>
                <div> Total Amount: {Detail.amount.toFixed(2)}      </div>
                <div>
                     <a onClick={() => props.onShoeRemove(props)}>Remove From Cart</a>
                 </div>
             </div>

            )}


        </div>


    )
};

CartDetails.propTypes = {
    cart: React.PropTypes.array.isRequired
};

export default CartDetails;