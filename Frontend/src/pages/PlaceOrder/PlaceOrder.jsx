import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/storeContext';
import { placeOrderApi } from '../../components/services/allApi';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems } = useContext(StoreContext);

  const navigate = useNavigate()

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChaneHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2, // Delivery fee is added
    };

    console.log(orderData);

    const headers = {
      authorization: `Bearer ${localStorage.getItem('token')}`
    };

    const response = await placeOrderApi(orderData, headers);
    console.log(response);

    // If the order was placed successfully, initiate Razorpay
    if(response.data.success){
      const{session_url} = response.data;
      window.location.replace(session_url)
    }
    else{
      alert("Error");
    }

    useEffect(()=>{


      if(!token){

        navigate('/cart')

      }

      else if(getTotalCartAmount()===0){

        navigate('/cart')

      }



    },[token])

      
  };

  return (
    <div>
      <form onSubmit={placeOrder} className='place-order'>

        <div className="place-order-left">
          <p className="title">Delivery Information</p>

          <div className="multi-fields">
            <input required onChange={onChaneHandler} value={data.firstName} name='firstName' type="text" placeholder='First Name' />
            <input required onChange={onChaneHandler} value={data.lastName} name='lastName' type="text" placeholder='Last Name' />
          </div>

          <input required type="email" onChange={onChaneHandler} name='email' value={data.email} placeholder='Email Address' />
          <input required type="text" onChange={onChaneHandler} name='street' value={data.street} placeholder='Street' />

          <div className="multi-fields">
            <input required onChange={onChaneHandler} name='city' value={data.city} type="text" placeholder='City' />
            <input required onChange={onChaneHandler} name='state' value={data.state} type="text" placeholder='State' />
          </div>

          <div className="multi-fields">
            <input required onChange={onChaneHandler} name='zipcode' value={data.zipcode} type="text" placeholder='Zip Code' />
            <input required onChange={onChaneHandler} name='country' value={data.country} type="text" placeholder='Country' />
          </div>

          <input required onChange={onChaneHandler} name='phone' value={data.phone} type="number" placeholder='Phone' />
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount() === 0 ? 0 : 2}</p> {/* Delivery Fee logic */}
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b> {/* Total with delivery fee */}
              </div>
            </div>
            <button type='submit'>PROCEED TO PAYMENT</button>
          </div>
        </div>

      </form>
    </div>
  );
};

export default PlaceOrder;
