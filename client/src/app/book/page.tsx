'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { io } from 'socket.io-client'
const socket = io("http://localhost:3001")
function Page() {

    const [parkings,setParkings] =useState([])
    const [longitude,setLongitude] = useState()
    const [latitude,setLatitude] = useState()
    const [bookings,setBookings] = useState([])

    useEffect(()=>{
        socket.on("SLOT_BOOKING_UPDATED_RESPONSE",()=>{
            getNearestParkings();
        })
        socket.on("PARKINGS_UPDATED_RESPONSE",()=>{
            getNearestParkings();
        })
    },[socket])

    useEffect(()=>{
        getLocation();
        getMyBookings()
    },[])

    const setLatLong = (position) =>{
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
    }

    useEffect(()=>{
        getNearestParkings();
    },[latitude, longitude])

    
    const getLocation = ()=>{
        if(navigator.geolocation)
        navigator.geolocation.getCurrentPosition(setLatLong)
        else
        toast.error('unknown error')
    }


    const getNearestParkings = async() =>{
       if(longitude == undefined || latitude == undefined){
        return
       }
       try {
        await axios.post('/api/users/getnearestparkings',{longitude,latitude}).then((res:any)=>{
            setParkings(res.data.parkings)
            console.log(parkings)
        })
       } catch (error) {
        
       }
    }

    const bookSlot = async(parkingId: any)=>{
        try {
            await axios.post('/api/users/bookslot',{parkingId}).then(response=>{
                socket.emit('SLOT_BOOKING_UPDATED')
                getMyBookings();
            })    
        } catch (error) {
            console.log(error)            
        }
    }


    const cancelBooking = () =>{
        
    }

    const getMyBookings = async()=>{
        try {
            await axios.get('/api/users/mybookings').then((res)=>{
                setBookings(res.data.bookings)
                console.log(res.data.bookings)
            })
        } catch (error) {

        }
    }

    return (
        <>
            {parkings.length>0 && <>
            {parkings.map((parking)=>{
                return <div key={parking._id}>
                        <p>{parking._id} </p>
                        <button onClick={()=>bookSlot(parking._id)} > Book Slot </button>

                </div>
            })}
            
            </>}
            ---My Booked Slots-----
            {bookings.length>0 && <>
            
            {bookings.map((booking)=>{
                return <div key={booking._id}>
                    <p>{booking._id}</p> 
                    <Link href={`https://www.google.com/maps/search/?api=1&query=${booking.parkingId.location.coordinates[0]},${booking.parkingId.location.coordinates[1]}`} target="_blank"  > open in google maps</Link>
                </div>
            })}
            </>}
        </>
    )
}

export default Page