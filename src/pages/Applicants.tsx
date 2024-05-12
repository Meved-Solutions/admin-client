import ApplicantCard from "@/components/ApplicantCard";
import { Button } from "@/components/ui/button";
import axios from "axios"
import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Applicants = () => {

  const [applicants, setApplicants] = useState([]);
  const [domain ,setDomain] = useState("");
  const [disabled,setDisabled] = useState(false);
  const [experienced,setExperienced] = useState(false);

  useEffect(()=>{
   const fetchApplicants = async() =>{
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/applicant/getApplicants`,{
      headers : {
        "Authorization" : localStorage.getItem("token"),
      },
      withCredentials : true
    })

    console.log(res.data);
    setApplicants(res.data);
   }

    fetchApplicants()
  },[])

  const filteredApplicants = applicants.filter(applicant=>
    (domain === "" ? applicant : applicant.domain === domain) && 
    (disabled ? applicant.physicallyHandiCapped === true : applicant) &&
    (experienced &&  applicant.experience.length > 0 ? applicant.experience : applicant)
  )

  return (
    <div className="px-10 py-4 w-screen">
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
            Applicants
          </h1>
        </div>
        <div>
          <Dialog>
            <DialogTrigger>
              <Button>
                Filter Applicants 
              </Button>
            </DialogTrigger>
            <DialogContent className="h-[70vh] overflow-auto">
              <DialogHeader>
                <DialogTitle>Filter Postings</DialogTitle>
              </DialogHeader>
              <div>
                  <h4 className="scroll-m-20 my-2 font-semibold tracking-tight">
                    Domain
                  </h4>
                  <Select onValueChange={(value)=>{setDomain(value)}}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Domain" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Software">Software</SelectItem>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                            <SelectItem value="Management">Management</SelectItem>
                            <SelectItem value="Consultancy">Consultancy</SelectItem>
                          </SelectContent>
                  </Select>
              </div>
              <div>
                  <h4 className="scroll-m-20 my-2 font-semibold tracking-tight">
                    Physically Disabled
                  </h4>
                  <Select onValueChange={(value)=>{setDisabled(value === 'true')}}>
                          <SelectTrigger className="w-full">
                            <SelectValue/>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">Yes</SelectItem>
                            <SelectItem value="false">No</SelectItem>
                          </SelectContent>
                  </Select>
              </div>
              <div>
                  <h4 className="scroll-m-20 my-2 font-semibold tracking-tight">
                    Experienced
                  </h4>
                  <Select onValueChange={(value)=>{setDisabled(value === 'true')}}>
                          <SelectTrigger className="w-full">
                            <SelectValue/>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">Yes</SelectItem>
                            <SelectItem value="false">No</SelectItem>
                          </SelectContent>
                  </Select>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="mt-6  grid grid-cols-3 gap-4 overflow-y-auto" style={{ maxHeight: '400px' }}>
        {applicants.map((applicant,index)=>(
          <ApplicantCard key={index} applicant={applicant}/>
        ))}
      </div>
  </div>
  )
}

export default Applicants
