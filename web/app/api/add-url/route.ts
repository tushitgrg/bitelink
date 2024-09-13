import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';


export async function POST(req,res) {
    const body = await req.json();
    const user = await currentUser();
    const allurls = await prisma.bitlink.upsert({
      where: {
       alias:`${user?.username}/${body.name}` // this is the unique identifier
      },
       
       update : {
        url:body.newLink
       },
       create:{
        username: user?.username,
        alias:`${user?.username}/${body.name}` ,
        url:body.newLink,
        views:0
       }
      });

     console.log(body) 
     return NextResponse.json({allurls})

  }

