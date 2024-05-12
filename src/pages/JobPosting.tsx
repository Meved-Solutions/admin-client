import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IoLocationOutline, IoMailOutline, IoCallOutline } from 'react-icons/io5';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import InputDropdown from '@/components/ui/InputDropdown';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ApplicationCard from '@/components/ui/ApplicationCard';


const JobPosting = () => {

    const location = useLocation()
    const pathname = location.pathname;
    const _id = pathname.split('/').pop();

  const [selectedOption, setSelectedOption] = useState('');
  const [applications,setApplications] = useState([]);
  const [posting,setPosting] = useState({});

  useEffect(()=>{

    const fetchPosting = async () => {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/posting/getPosting/${_id}`,{
        headers : {
          "Authorization" : localStorage.getItem("token")
        },
        withCredentials : true
      });

      console.log(res.data);
      setPosting(res.data)
    }

    const fectchApplications = async () =>{
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/application/getApplicationsByPosting/${_id}`,{
      headers: {
          'Authorization': localStorage.getItem("token"),
          },
          withCredentials : true
      })

      console.log(res.data);
      setApplications(res.data)
    }
      
    fetchPosting();
    fectchApplications()
  },[_id])
  

  

  return (
    <div className="px-4 py-4 w-full " style={{ maxHeight: '100vh', overflowY: 'auto' }}>
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
        Job Posting
      </h1>
      <Tabs defaultValue="postingDetails" className="w-full my-2">
        <TabsList>
          <TabsTrigger value="postingDetails">Details</TabsTrigger>
          <TabsTrigger value="applicationsReceived">Applications</TabsTrigger>
        </TabsList>
        <TabsContent value="postingDetails">
          <div className="flex flex-row items-center gap-3">
                <div>
                        <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">
                            Info
                        </h1>
                </div>
          </div>
          <div className="mt-6">
                    <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    Posting Status
                    </h4>
                    <Input disabled type="text" value={posting.postingStatus ? "Showing" : "Hidden"} className="mt-2 w-full"/>
          </div>
          <div className="mt-6">
                    <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    Title
                    </h4>
                    <Input disabled type="text" value={posting.title} className="mt-2 w-full"/>
          </div>
          <div className="mt-6">
                    <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    Job Description
                    </h4>
                    <textarea disabled  value={posting.job_description} className="mt-2 w-full"/>
          </div>
          <div className="mt-6">
                    <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    Minimum Experience
                    </h4>
                    <Input disabled type="text" value={posting.minExperience} className="mt-2 w-full"/>
          </div>
          <div className="mt-6">
                    <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    Location
                    </h4>
                    {posting.location?.map((loc, index) => (
                    <div key={index}>
                        <Input disabled type="text" value={loc?.name} className="mt-2 w-full"/>
                        <Input disabled type="text" value={loc?.state} className="mt-2 w-full"/>
                        <Input disabled type="text" value={loc?.country} className="mt-2 w-full"/>
                    </div>
                ))}
                </div>
                <div className="mt-6">
                    <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    Number of Vacancies
                    </h4>
                    <Input disabled type="text" value={posting.numberOfVacancies} className="mt-2 w-full"/>
                </div>
                <div className="mt-6">
                    <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    Notice Period
                    </h4>
                    <Input disabled type="text" value={posting.notice_period} className="mt-2 w-full"/>
                </div>
                <div className="mt-6">
                    <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    Salary Range
                    </h4>
                    <Input disabled type="text" value={posting.salaryRange?.min} className="mt-2 w-full"/>
                    <Input disabled type="text" value={posting.salaryRange?.max} className="mt-2 w-full"/>
                </div>
                <div className="mt-6">
                    <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    Department
                    </h4>
                    <Input disabled type="text" value={posting.department} className="mt-2 w-full"/>
                </div>
                <div className="mt-6">
                    <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    Domain
                    </h4>
                    <Input disabled type="text" value={posting.domain} className="mt-2 w-full"/>
                </div>
                <div className="mt-6">
                    <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    Skills
                    </h4>
                    {posting.skills?.map((skill, index) => (
                        <Input key={index} disabled type="text" value={skill} className="mt-2 w-full"/>
                    ))}
                </div>
                <div className="mt-6">
                    <h4 className="scroll-m-20 text-sm font-medium tracking-tight">
                    Evaluation
                    </h4>
                    {posting.evaluation?.map((evalu, index) => (
                        <Input key={index} disabled type="text" value={evalu.question} className="mt-2 w-full"/>
                    ))}
                </div>
        </TabsContent>
        <TabsContent value="applicationsReceived">
          <div className= "flex flex-col gap-3 bg-gray-100 rounded-md h-[520px] overflow-auto py-2 px-2">
                {applications.map((application,index)=>(
                      <ApplicationCard key={index} application={application}/>
                ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default JobPosting