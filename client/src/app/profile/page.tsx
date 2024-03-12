'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { io } from 'socket.io-client'
const socket = io("http://localhost:3001")



function Page() {
    const [latitude, setLatitude] =useState(null);
    const [longitude,setLongitude] = useState(null);
    const [description,setDescription] = useState();
    const [parkings,setParkings] = useState([]);
    const [addSlotBox , setAddSlotBox] = useState(null)
 
    const getLocation = ()=>{
        if(navigator.geolocation)
        navigator.geolocation.getCurrentPosition(setLatLong)
        else
        toast.error('unknown error')
    }
    useEffect(()=>{
        getLocation();
    },[])


    useEffect(()=>{
        socket.on("PARKINGS_UPDATED_RESPONSE",()=>{
        })
    },[socket])


    const addParking = async() =>{
        try {
           
            if(latitude==null || longitude==null){
                toast.error('please specify latitude and longitude')
                return
            }
            await axios.post('/api/users/newparking', {latitude,longitude,description:description || 'desc'}).then((response) => {
                getMyParkings();
            })
        } catch (error) {
            
        }
    }

    const setLatLong = (position) =>{
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
    }

    const addSlot = async(imageurl,parkingId) =>{
        try {
            await axios.post('/api/users/addslot',{parkingId,imageurl:imageurl || ' '}).then((response) => {
                getMyParkings();
                socket.emit("PARKINGS_UPDATED")
            })
        } catch (error) {
            
        }
    }

    const getMyParkings = async()=>{
        try {
            await axios.get('/api/users/myparkings').then((response) => {
                setParkings(response.data.parkings)
                socket.emit("PARKINGS_UPDATED")
            })
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        getMyParkings();
    },[])
 
    return (
        <>
        {parkings.length>0 && <>
        
        {parkings.map((parking)=>{
            return <div key={parking._id}>
                <p>{parking._id}</p>
                <button onClick={()=>addSlotBox == parking._id ? setAddSlotBox(null) : setAddSlotBox(parking._id)} > open Slot </button>
                {addSlotBox == parking._id && <>
                    <div >
                        <button onClick={()=>addSlot("image",parking._id)} >Add Slot</button>
                    </div>
                </>}
            </div> 
        })}
        
        </>}
        <input type="text" onChange={(e)=>setDescription(e.target.value)}  name="" id="" />
        <button onClick={addParking} > Add Parking </button>
        </>
        )
}

export default Page