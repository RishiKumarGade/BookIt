import {connect} from '@/dbConfig/dbConfig';
import Parking from '@/models/parkingModel';
import { NextRequest,NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import Slot from '@/models/slotModel';

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {parkingId} = reqBody
        const userId = getDataFromToken(request)
        const parking = await Parking.findOne({_id:parkingId})
        if(parking == null){
            return
        }
        let slot=null
        const slots = await Slot.find({parkingId:parkingId})
        for(var i=0;i<slots.length;i++){
            if(slots[i].isReserved !=true ){
                slot = slots[i]
            }else;
        }
        if(slot == null){
            return NextResponse.json({message:'no left bookings',success:true})
        }
        slot.reservedUserId = userId
        slot.isReserved = true
        await slot.save()
        return NextResponse.json({message:'parking created',success:true})

        } catch (error:any) {

        return NextResponse.json({error: error.message},{status:500})

    }
}