import {connect} from '@/dbConfig/dbConfig';
import Slot from '@/models/slotModel';
import { NextRequest,NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { getDataFromToken } from '@/helpers/getDataFromToken';

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {imageUrl,parkingId} = reqBody
        const newSlot = new Slot({
            parkingId:parkingId,
            imageUrl:imageUrl,
        });
          await newSlot.save()
        return NextResponse.json({message:'slot added',success:true})

        } catch (error:any) {

        return NextResponse.json({error: error.message},{status:500})

    }
}