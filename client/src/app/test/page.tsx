"use client"

import axios from 'axios';
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';

function Page() {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);
  };

  const UploadToCloudinary = async() =>{
    try {
        if (selectedFile?.type === 'image/png' || selectedFile?.type === 'image/jpeg' || selectedFile?.type === 'image/jpg'){
            
          const formdata = new FormData();
          formdata.append('file', selectedFile)
          formdata.append('upload_preset','cvrhackthon')
          const uploadResponse = await fetch(
            "https://api.cloudinary.com/v1_1/dvudkkxl4/image/upload",
            {
              method: "POST",
              body: formdata,
            }
          );
          const uploadedImageData = await uploadResponse.json();
          const imageUrl = uploadedImageData.url;
          return imageUrl
        }
        else{
            console.log('Please upload only images')
        }
    } catch (error) {
        console.log(error);
    }

  } 


  const onLogout = ()=>{
    try {
      axios.get('/api/users/logout').then(()=>{
        toast.success('logout successfully')
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    
    <>
   <input type="file" onChange={handleFileInput} />
   <button onClick={(e)=>{e.preventDefault();UploadToCloudinary()}}>Add File</button>



   <div className=" w-full border " >
      <button onClick={e=>{onLogout()}} type="submit" className="border" >logout</button>
    </div>
    </>
  )
}

export default Page