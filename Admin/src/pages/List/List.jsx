import React, { useEffect, useState } from 'react'
import './List.css'
import { foodListApi, removeFoodApi } from '../../services/allApis'
import { BaseUrl } from '../../services/baseUrl'
import { Bounce, toast } from 'react-toastify'

const List = () => {

    const [list,setList] = useState([])




    
    // food list api 


    const foodlist =async()=>{

         const response = await foodListApi()

         setList(response.data.data);
         

    }

    // remove food api 

    const removeFood=async(id)=>{

       
        const body = {id}


        const response = await removeFoodApi(body)

        if(response.data.success){
            
            toast.success(`${response.data.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
              });
            foodlist()
        }
        
        
    }


    useEffect(()=>{

        foodlist()

    },[])


    
    

    
    

  return (
    <div className='list add flex-col'>

        <p>All Foods List</p>

        <div className="list-table">
            <div className="list-table-format title">

                <b>Image</b>
                <b>Name</b>
                <b>Category</b>
                <b>Price</b>
                <b>Action</b>

            </div>
            {list.map((item,index)=>{

                return(
                    <div key={index} className='list-table-format'>

                        <img src={`${BaseUrl}/${item.image}`} alt="" />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>${item.price}</p>
                        <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
                    </div>
                )

            })}
        </div>
      
    </div>
  )
}

export default List
