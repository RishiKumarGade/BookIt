import {connect} from '@/dbConfig/dbConfig';
import Parking from '@/models/parkingModel';
import { NextRequest,NextResponse } from 'next/server';

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {longitude,latitude} = reqBody
        const parkings = await Parking.find({
          "location": {
              $near: {
                  $geometry: {
                      type: "Point",
                      coordinates: [longitude, latitude]
                  },
                  $maxDistance: 2000
              }
          }
      }).catch(err =>{console.error(err)})
      
        return NextResponse.json({message:'parkings',success:true,parkings:parkings})

        } catch (error:any) {

        return NextResponse.json({error: error.message},{status:500})

    }
}