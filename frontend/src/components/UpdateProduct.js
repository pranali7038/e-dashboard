import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = ()=>{
    const [name,setName]=React.useState('');
    const [price,setprice]=React.useState('');
    const [category,setcategory]=React.useState('');
    const [company,setcompany]=React.useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        getProductDetails();
    },[])

    const getProductDetails = async ()=>{
        console.warn(params)
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        setName(result.name)
        setprice(result.price)
        setcategory(result.category)
        setcompany(result.company)
    }

    const UpdateProduct=async()=>{
        console.warn(name,price,category,company)
        let result = fetch(`http://localhost:5000/product/${params.id}`,{
            method :"Put",
            body:JSON.stringify({name,price,category,company}),
            headers:{
                'Content-Type':"application/json"
            }
        });
        result =  (await result).json
        console.warn(result)
        navigate('/')
    }

    return(
        <div className='product'>
            <h1>Update Product</h1>
            <input type="text" placeholder='Enter Product Name' className='inputBox'
            value={name} onChange={(e)=>{setName(e.target.value)}}/>

            <input type="text" placeholder='Enter Product price'className='inputBox'
            value={price} onChange={(e)=>{setprice(e.target.value)}}/>

            <input type="text" placeholder='Enter Product category'className='inputBox'
            value={category} onChange={(e)=>{setcategory(e.target.value)}}/>

            <input type="text" placeholder='Enter Product company'className='inputBox'
            value={company} onChange={(e)=>{setcompany(e.target.value)}}/>

            <button onClick={UpdateProduct} className='appButton'>Update Product</button>

        </div>
    )
}

export default UpdateProduct;