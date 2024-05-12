import { Input } from "@/components/ui/input";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
import { IoIosLink, IoMdDownload } from "react-icons/io";

const Applicant = () => {
    const location = useLocation()
    const pathname = location.pathname;
    const _id = pathname.split('/').pop();
    const [user,setUser] = useState({});

    useEffect(()=>{
      
      const fetchApplicant = async() =>{

        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/applicant/getApplicant/${_id}`,{
          headers : {
            "Authorization" : localStorage.getItem("token")
          },
          withCredentials : true
        })

        console.log(res.data);
        setUser(res.data)
      }


      fetchApplicant();
    },[_id])

  return (
    <div className="px-10 py-4 w-full " style={{ maxHeight: '100vh', overflowY: 'auto' }}>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
            Applicant Profile
        </h1>
        <div className="flex flex-row mt-6 gap-6">
            <div>
                <div>
                    <img src={user.image} className="w-56 rounded-full"/>
                </div>
                <div className="flex flex-row mt-6 justify-center gap-4">
                    <a href={user.linkedInProfile}>
                    <FaLinkedin size={25}/>
                    </a>
                    <a href={user.otherLinks}>
                    <IoIosLink size={25}/> 
                    </a>
                    <a href={user.resume}>
                    <IoMdDownload size={25} />
                    </a>            
                </div>
            </div>
            <div className="flex flex-col ml-8 w-[50vh]">
            <div>
                    <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                        Name
                    </h4>
                    <Input disabled type="text" value={user.name} className="mt-2"/>
                </div>
                <div className="mt-6">
                    <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    Email
                    </h4>
                <Input disabled type="text" value={user.email} className=" mt-2"/>
                </div>
                <div className="mt-6">
                      <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                        Phone Number
                      </h4>
                      <Input disabled type="text" value={user.phone} className=" mt-2"/>
                  </div>
                  <div className="mt-6">
                      <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                          Location
                            </h4>
                            <Input
                            disabled  
                            type="text" 
                            value={user.location?.name}  
                            className="mt-2"
                            />
                            <Input
                                disabled  
                                type="text" 
                                value={user.location?.state} 
                                className="mt-2"
                            />
                            <Input 
                                disabled 
                                type="text" 
                                value={user.location?.country} 
                                className="mt-2"
                            />
                    </div>
                    <div className="mt-6">
                        <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                        Gender
                        </h4>
                    <Input disabled type="text" value={user.gender} className=" mt-2"/>
                    </div>
                    <div className="mt-6">
                        <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                            Your Bio
                        </h4>
                        <div className="mt-2 w-[95vh]">
                            {user.bio}
                        </div>
                    </div>
                    <div className="mt-6">
                        <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                            Current CTC (in LPA)
                        </h4>
                        <Input disabled type="text" value={user.currentSalary}  className="mt-2"/>
                    </div> 
                    <div className="mt-6">
                        <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                            Expected CTC (in LPA)
                        </h4>
                        <Input disabled type="text" value={user.expectedSalary}  className="mt-2"/>
                    </div>  
                    <div className="mt-6">
                        <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                            Notice Period
                        </h4>
                        <Input disabled type="text" value={user.noticePeriod}  className="mt-2"/>
                    </div> 
                    <div className="mt-6">
                        <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                            Quota
                        </h4>
                        <Input disabled type="text" value={user.quota}  className="mt-2"/>
                    </div>
                    <div className="mt-6">
                        <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                            Domain
                        </h4>
                        <Input disabled type="text" value={user.domain}  className="mt-2"/>
                    </div>
                    <div className="mt-6">
                    <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    Education
                    </h4>
                    {user.education?.map((education, index) => (
                    <div key={index}>
                        <Input disabled type="text" value={education.institute_name} className="mt-2"/>
                        <Input disabled type="text" value={education.type} className="mt-2"/>
                        <Input disabled type="text" value={education.marks} className="mt-2"/>
                        <Input disabled type="text" value={education.year} className="mt-2"/>
                        <div className="mt-2 w-[95vh]">
                        {education.work_done.split('.').map((line, index) => (
                            line.trim() !== '' && <li key={index}>{line.trim()}</li>
                        ))}
                        </div>
                    </div>
                    ))}
                </div>
                <div className="mt-6">
                    <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    Experience
                    </h4>
                    {user.experience?.map((experience, index) => (
                    <div key={index}>
                        <Input disabled type="text" value={experience.company} className="mt-2"/>
                        <Input disabled type="text" value={experience.role} className="mt-2"/>
                        <Input disabled type="text" value={experience.timePeriod} className="mt-2"/>
                        <div className="mt-2 w-[95vh]">
                        {experience.description.split('.').map((line, index) => (
                            line.trim() !== '' && <li key={index}>{line.trim()}</li>
                        ))}
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Applicant
