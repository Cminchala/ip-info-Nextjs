
import { stat } from 'fs';
import { NextResponse } from 'next/server';

export async function GET(request : Request){
    try{
     const forwardedFor = request.headers.get('x-forwarded-for');
     const ip = forwardedFor ? forwardedFor.split(',')[0] : 'Unknown';
     console.log(ip);
    return NextResponse.json({ip : ip}, {status: 200});
    }
    catch(error){
        console.error('Error fetching IP:', error);
        return NextResponse.json({ error: 'Failed to fetch IP' }, { status: 500 });
    }
    
}