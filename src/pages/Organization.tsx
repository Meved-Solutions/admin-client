import { Input } from "@/components/ui/input";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosLink } from "react-icons/io";
import { IoGlobeOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";

const Organization = () => {
  const location = useLocation()
  const pathname = location.pathname;
  const _id = pathname.split('/').pop();

  const [org , setOrg] = useState({});

  useEffect(()=>{
      
    const fetchOrg = async() =>{

      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/org/getOrganization/${_id}`,{
        headers : {
          "Authorization" : localStorage.getItem("token")
        },
        withCredentials : true
      })

      console.log(res.data);
      setOrg(res.data)
    }


    fetchOrg();
  },[_id])

  return (
    <div className="px-10 py-4 w-full " style={{ maxHeight: '100vh', overflowY: 'auto' }}>
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
          Org Profile
        </h1>
      </div>
      <div className="pt-16 px-4 flex flex-row gap-4">
        <div>
            <div>
              <img src={org.logo} className="w-48 h-48 rounded-full"/>
            </div>
            <div className="flex flex-row mt-6 justify-center gap-4">
                  <a href={org.website}>
                    <IoGlobeOutline size={25}/>
                  </a>
                  <a href={org.otherLinks}>
                    <IoIosLink size={25}/>
                  </a>
          </div>
          </div>
          <div className="ml-8 w-[50vh]">
            <div>
                  <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    Approved By Admin
                  </h4>
                <Input disabled type="text" value={org.approvedByAdmin} className="mt-2"/>
              </div>
              <div>
                <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                  Name
                </h4>
              <Input disabled type="text" value={org.name} className="mt-2"/>
            </div>
            <div className="mt-6">
                <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                  Email
                </h4>
              <Input disabled type="text" value={org.email} className="mt-2"/>
            </div>
            <div className="mt-6">
                <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                  Phone Number
                </h4>
              <Input disabled type="text" value={org.phone} className="mt-2"/>
            </div>
            <div className="mt-6">
                <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    Location
                </h4>
                <Input
                    disabled  
                    type="text" 
                    value={org.location?.name}  
                    className="mt-2"
                />
                <Input
                    disabled  
                    type="text" 
                    value={org.location?.state} 
                    className="mt-2"
                />
                <Input 
                    disabled 
                    type="text" 
                    value={org.location?.country} 
                    className="mt-2"
                />
            </div>
            <div className="mt-6">
                  <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    Description
                  </h4>
                  <div className="mt-2 w-[95vh]">
                    {org.description}
                  </div>
            </div>
            <div className="mt-6">
                  <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    Why to Join
                  </h4>
                  <div className="mt-2 w-[95vh]">
                    {org.reasonForJoining}
                  </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Organization
