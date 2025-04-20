import React, { useState } from 'react'
import {assets} from '../assets/assets.js'
import axios from 'axios'
import { backEndUrl } from '../App'

const Add = () => {
   
  const [image1,setImage1]=useState(false)
  const [image2,setImage2]=useState(false)
  const [image3,setImage3]=useState(false)
  const [image4,setImage4]=useState(false)
  
  const [name,setName]=useState("")
  const [description,setDecription]=useState("")
  const [price,setPrice]=useState("")
  const [category,setCategory]=useState("Women")
  const [subCategory,setSubCategory]=useState("")
  const[bestseller,setBestseller]=useState(false)
  const[sizes,setSizes]=useState([]) 
  

  const onSubmitHandler=async(e)=>{
    e.preventDefault();
    try {
      const formData=new FormData;
      formData.append("name",name)
      formData.append("description",description)
      formData.append("price",price)
      formData.append("category",category)
      formData.append("subCategory",subCategory)
      formData.append("bestseller",bestseller)
      formData.append("sizes",JSON.stringify(sizes))
      image1 && formData.append("image1",image1)
      image2 && formData.append("image2",image2)
      image3 && formData.append("image3",image3)
      image4 && formData.append("image4",image4)
      
      const response=await axios.post(backEndUrl+"/api/product/add",formData );
      
      console.log(response.data);
      


    } catch (error) {
      console.log(error);
      
    }
    
  }

 






  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2' >Upload Image</p>

        <div className='flex gap-1'>
          <label htmlFor="image1">
            <img className='w-25' src={!image1?assets.upload_area:URL.createObjectURL(image1)} alt="" />
            <input  onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            
              <img  className='w-25' src={!image2?assets.upload_area:URL.createObjectURL(image2)}alt="" />
            <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img  className='w-25' src={!image3?assets.upload_area:URL.createObjectURL(image3)} alt="" />
            <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img  className='w-25' src={!image4?assets.upload_area:URL.createObjectURL(image4)} alt="" />
            <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product Name : </p>
        <input onChange={(e)=>setName(e.target.value)} value= {name} className='w-full max-w-[500px] px-3 py-2 border' type="text" placeholder='Enter Name of Product ' required />
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product Description : </p>
        <textarea onChange={(e)=>setDecription(e.target.value)} value= {description} className='w-full max-w-[500px] px-3 py-2 border' type="text" placeholder='Enter Descripiton of Product ' required />
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product Category : </p>
        <select onChange={(e)=>setCategory(e.target.value)}  className="w-full max-w-[200px] px-3 py-2" id="">
          <option value="Women">Women</option>
          <option value="Men">Men</option>
        </select>
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product Sub Category : </p>
        <input onChange={(e)=>setSubCategory(e.target.value)} value= {subCategory} className='w-full max-w-[500px] px-3 py-2 border' type="text" placeholder='Enter Sub Category of Product eg-Jeans,Shirts ' required />
      </div>
      
      <div className='w-full'>
        <p className='mb-2'>Product Price : </p>
        <input onChange={(e)=>setPrice(e.target.value)} value= {price} className='w-full max-w-[500px]  px-3 py-2 border' type="number" placeholder='Enter Price of Product ' required />
      </div>
      <div className='mb-1'>
        <p>Product Sizes</p>
      </div>
      <div className='flex gap-3'>
      <div onClick={()=>setSizes(prev=>prev.includes("S")?prev.filter(item=>item!=="S"):[...prev,"S"])}>
      <p className={`${sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
      </div>
      <div onClick={()=>setSizes(prev=>prev.includes("M")?prev.filter(item=>item!=="M"):[...prev,"M"])}>
        <p className={`${sizes.includes("M")?"bg-pink-100":"bg-slate-200"}  px-3 py-1 cursor-pointer `}>M</p>
      </div>
      <div onClick={()=>setSizes(prev=>prev.includes("L")?prev.filter(item=>item!=="L"):[...prev,"L"])}>
      <p className={`${sizes.includes("L")?"bg-pink-100":"bg-slate-200"}  px-3 py-1 cursor-pointer `}>L</p>
      </div>
      <div onClick={()=>setSizes(prev=>prev.includes("Xl")?prev.filter(item=>item!=="XL"):[...prev,"XL"])}>
      <p className={`${sizes.includes("XL")?"bg-pink-100":"bg-slate-200"}  px-3 py-1 cursor-pointer `}>XL</p>
      </div>
      <div onClick={()=>setSizes(prev=>prev.includes("XXl")?prev.filter(item=>item!=="XXL"):[...prev,"XXL"])}>
      <p className={`${sizes.includes("XXl")?"bg-pink-100":"bg-slate-200"}  px-3 py-1 cursor-pointer `}>XXL</p> 
      </div>
      </div>
      <div className='flex gap-2'>
        <input onChange={()=>setBestseller(prev=>!prev)} checked={bestseller} type="checkbox" id='bestseller' />
        <label className='cursor-pointer' htmlFor="bestseller">Add to Bestseller</label>
      </div>
    <button type='submit' className='w-28 py-3 mt-4 bg-black text-white' >ADD</button>

    </form>
  )
}

export default Add