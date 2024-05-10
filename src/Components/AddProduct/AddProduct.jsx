import React, { useState } from 'react'
import './AddProduct.css';
import upload_Area from '../../Assets/upload_area.svg'
const AddProduct = () => {

  const [image,setImage] = useState(false);
  const [productDetails, setProductDetail] = useState({
    name: "",
    image: "",
    category:"women",
    new_price: "",
    old_price: ""
  })

  const imageHandler = (e) =>{
      setImage(e.target.files[0]);
  }

  const changeHandler = (e) =>{
    setProductDetail({...productDetails,[e.target.name]:e.target.value})
  }

  const addProduct = async ()=>{
    //console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append('product',image);

    await fetch('https://e-commerce-backend-ruby-eight.vercel.app/upload',{
      method: 'POST',
      headers:{
        Accept:'application/json',
      },
      body: formData,
    }).then((resp)=> resp.json()).then((data)=>{responseData=data})

    if(responseData.success)
    {
      product.image = responseData.image_url;
      //console.log(product);
      await fetch('https://e-commerce-backend-ruby-eight.vercel.app/addproduct',{
        method:'POST',
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(product),
      }).then((resp)=>resp.json()).then((data)=>{
        data.success?alert("Product Added"):alert("Failed")
      })
    }
  }
  return (
    <div className='addproduct'>
      <div className="addproduct-itemfeild">
        <p>Product title</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfeild">
          <p>Price</p>
          <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here' />
        </div>
        <div className="addproduct-itemfeild">
          <p>Offer Price</p>
          <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here' />
        </div>
      </div>
        <div className="addproduct-itemfeild">
          <p>Product Category</p>
          <select value={productDetails.category} onChange={changeHandler} name="category" className="addproduct-selector">
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
          </select>
        </div>
        <div className="addproduct-itemfeild">
          <div className='addproduct-upload'>
            <label htmlFor="file-input">
              <img src={image ? URL.createObjectURL(image):upload_Area} className='addproduct-thumbnail-img' alt="" />
            </label>
            <input onChange={imageHandler} type="file" name='image' id='file-input' hidden/>
          </div>
          <button onClick={addProduct} className='addproduct-btn'>ADD</button>
        </div>
    </div>
  )
}

export default AddProduct