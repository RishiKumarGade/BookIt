import {connect} from '@/dbConfig/dbConfig';
import Parking from '@/models/parkingModel';
import { NextRequest,NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { getDataFromToken } from '@/helpers/getDataFromToken';

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {longitude,latitude,description} = reqBody
        const userId = getDataFromToken(request)
        const newParking = new Parking({
            userId:userId,
            description:' ',
            pricePerSlot:0,
            location: {
              coordinates: [longitude, latitude] // Longitude first, then latitude
            }
          });
          await newParking.save()
        return NextResponse.json({message:'parking created',success:true})

        } catch (error:any) {

        return NextResponse.json({error: error.message},{status:500})

    }
}