import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';


export default async function name({ params })  {

//   const router = useRouter();
   const { username, slug } = params;
const url = await prisma.bitlink.update({
    where:{alias:`${username}/${slug}`},
    data:{
        views: {
            increment: 1,  
          },
    }
})
if(url){
  redirect(url.url)
}
  return (

    <div>
      <h1>No Such Link!</h1>
    
      {/* Your content based on the username */}
    </div>
  );
}

