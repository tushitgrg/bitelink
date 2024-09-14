import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';


export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');


    const allurls = await prisma.bitlink.findMany({
        where: { username: username },
        orderBy: {
          updatedAt: 'desc', 
        },
      });
      
    return NextResponse.json({allurls});
  }

