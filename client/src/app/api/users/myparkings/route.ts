

import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Parking from "@/models/parkingModel";
import Slot from "@/models/slotModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(request:NextRequest) {
    try {
        const userId = await getDataFromToken(request)
        const parkings = await Parking.find({userId:userId})
            const response = NextResponse.json({
                message:'sessions found',
                parkings: parkings,
            })
            return response
        } catch (error:any) {
            return NextResponse.json({error: error.message })
        }
}
