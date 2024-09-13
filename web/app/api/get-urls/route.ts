import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';


export async function GET() {

    const user = await currentUser();
    const allurls = await prisma.bitlink.findMany({
        where: { username: user?.username },
        orderBy: {
          updatedAt: 'desc', 
        },
      });
      
    return NextResponse.json({allurls});
  }

