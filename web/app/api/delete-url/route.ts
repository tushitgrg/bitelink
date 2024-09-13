import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';


export async function POST(req,res) {
    const body = await req.json();
  
    
    const allurls = await prisma.bitlink.delete({
      where: {
       alias:`${body.alias}` // this is the unique identifier
      },
       
      });

     console.log(body) 
    return NextResponse.json({"Done":"200"});
  }

