import React from 'react';

const CartDetails = (props) => {

    props.cart.forEach((Details) => {

    });

    return (

        <div>
            <div><h3>Cart Details</h3></div>
            {props.cart.map((Detail) =>
             <div>
                <div> {Detail.brand} </div>
                <div> {Detail.name}  </div>
                <div> {Detail.price} </div>
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