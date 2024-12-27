import React, { useEffect } from 'react'
import './verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { verifyPaymentApi } from '../components/services/allApi';

const Verify = () => {

    const [searchParams,setSearchParams]=useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const navigate =useNavigate();

    

    const verifyPayment = async async => {

        const response = await verifyPaymentApi({success,orderId})
        console.log(response);
        
        if(response.data.success){
            navigate("/myorders")
        }
        
        
    }
    
    useEffect(()=>{
        verifyPayment()
    },[])

  return (
    <div className='verify'>
      <div className="spinner">

      </div>
    </div>
  )
}

export default Verify
