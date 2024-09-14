import Dashboard from "@/components/dashboard";

import { currentUser } from "@clerk/nextjs/server";
import axios from "axios";

export default async function DashboardPage() {
  const user =await currentUser()
  let query= await axios.get(`https://bitelink.site/api/get-urls?username=${user.username}`)
  
  let allurls = []
if(query.data.allurls.length>=1){
  console.log(query.data.allurls)
  for(let i=0; i<query.data.allurls.length; i++){
    let v =  { original: query.data.allurls[i].url, shortened: query.data.allurls[i].alias, views: query.data.allurls[i].views }
    allurls.push(v)
  }

}
// console.log(allurls )
  return (
    <div>
<Dashboard query={allurls}/>
    </div>
  );
}
