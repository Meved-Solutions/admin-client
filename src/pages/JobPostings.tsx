import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from '@/components/ui/input';
import axios from 'axios';
import PostingCard from '@/components/PostingCard';
import { FaPlus } from 'react-icons/fa';


const JobPostings = () => {
  

  const [jobData,setJobData] = useState([]);
  const [orgs,setOrgs] = useState([]);
  const [jobType,setJobType] = useState("");
  const [domain,setDomain] = useState("");


  const [newPostings, setNewPostings] = useState({
    title: "",
    job_description: "",
    minExperience: "",
    job_type: "",
    location: [{
      name: "",
      state: "",
      country: ""
    }],
    numberOfVacancies: 0,
    notice_period: "",
    salaryRange: {
      min: 0,
      max: 0,
    },
    department: "",
    domain: "",
    skills: [],
    evaluation: [{
      question: ""
    }],
    org_id: "",
    org_name : "" ,
  });

  const [skillInput, setSkillInput] = useState("");


  const addLocation = () => {
    setNewPostings({
      ...newPostings,
      location: [...newPostings.location, { name: "", state: "", country: "" }],
    });
  };
  
      const handleLocationChange = (index, field, value) => {
        const newLocation = [...newPostings.location];
        newLocation[index][field] = value;
        setNewPostings({ ...newPostings, location: newLocation });
      };

      const handleAddSkill = () => {
        setNewPostings({ ...newPostings, skills: [...newPostings.skills, skillInput] });
        setSkillInput("");
      };
  
        const handleRemoveSkill = (index) => {
          const newSkills = [...newPostings.skills];
          newSkills.splice(index, 1);
          setNewPostings({ ...newPostings, skills: newSkills });
        };

        const addEvaluation = () => {
          setNewPostings({
            ...newPostings,
            evaluation: [...newPostings.evaluation, { question: "" }],
          });
        };
        
        const handleEvaluationChange = (index, field, value) => {
          const newEvaluation = [...newPostings.evaluation];
          newEvaluation[index][field] = value;
          setNewPostings({ ...newPostings, evaluation: newEvaluation });
        };

        const handleCreatePosting =  async(e) => {
          e.preventDefault();
          console.log(newPostings);
  
          const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/posting/createPosting` , newPostings , {
            headers: {
              'Authorization': localStorage.getItem("token"),
            }
          });
  
          console.log(res.data);
          setNewPostings({
            title: "",
            job_description: "",
            minExperience: "",
            job_type: "",
            location: [{
              name: "",
              state: "",
              country: ""
            }],
            numberOfVacancies: 0,
            notice_period: "",
            salaryRange: {
              min: 0,
              max: 0,
            },
            department: "",
            domain: "",
            skills: [],
            evaluation: [{
              question: ""
            }],
            org_id: "",
            org_name : "" ,
          })
          
        };

  useEffect(()=>{
    const fetchPostings  = async () => {

      const res = await axios.get( `${import.meta.env.VITE_BACKEND_URL}/api/posting/getPostings`,{
        headers: {
          'Authorization': localStorage.getItem("token"),
        }
      })

      console.log(res.data);
      setJobData(res.data);
    }

    const fetchOrganizations = async() =>{

      const res = await axios.get( `${import.meta.env.VITE_BACKEND_URL}/api/org/getOrganizations`,{
        headers: {
          'Authorization': localStorage.getItem("token"),
        }
      })
      const organizations = res.data.map(org => ({
        name: org.name,
        _id: org._id
      }));
      console.log(organizations);
      
      setOrgs(organizations);
    }

    fetchPostings()
    fetchOrganizations()
  },[])

  const filteredPostings = jobData.filter(posting => 
    (jobType === "" ? posting : posting.job_type === jobType) &&
    (domain === "" ? posting : posting.domain === domain) 
  );

  return (
    <div className="px-8 py-4 w-screen">
      <div className='flex flex-row justify-between'>
        <div>
          <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">
            Job Postings
          </h1>
        </div>
        <div className='flex flex-row gap-4'>
          <div>
          <Dialog>
                  <DialogTrigger>
                      <Button>
                    Filer Postings
                  </Button>
                  </DialogTrigger>
                  <DialogContent className="h-[70vh] overflow-auto">
                    <DialogHeader>
                      <DialogTitle>Filter Postings</DialogTitle>
                    </DialogHeader>
                    <div className="mt-2">
                        <h4 className="scroll-m-20 my-2 font-semibold tracking-tight">
                            Job Type
                        </h4>
                        <Select onValueChange={(value)=>{setJobType(value)}}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Job type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Full-Time">Full-Time</SelectItem>
                            <SelectItem value="Part-Time">Part-Time</SelectItem>
                            <SelectItem value="Internship">Internship</SelectItem>
                            <SelectItem value="Contractual">Contractual</SelectItem>
                          </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <h4 className="scroll-m-20 my-2 font-semibold tracking-tight">
                            Domain
                        </h4>
                        <Select onValueChange={(value)=>{setDomain(value)}}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Job type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Software">Software</SelectItem>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                            <SelectItem value="Management">Management</SelectItem>
                            <SelectItem value="Consultancy">Consultancy</SelectItem>
                          </SelectContent>
                        </Select>
                    </div>
                  </DialogContent>
                </Dialog>
          </div>
          <div>
            <Drawer>
            <DrawerTrigger>
              <Button>
                + Create Posting
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Create Posting</DrawerTitle>
              </DrawerHeader>
              <div className='px-8 h-[50vh] overflow-auto'>
                          <div>
                            <h4 className="scroll-m-20 my-2 font-semibold tracking-tight">
                                Organization Name
                            </h4>
                            <Select onValueChange={(val) => {setNewPostings({...newPostings, org_name: val.name, org_id: val._id})}}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Org Name" />
                              </SelectTrigger>
                              <SelectContent>
                              {orgs.map((item, index) => (
                                  <SelectItem key={index} value={item}>{item.name}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        <div>
                            <h4 className="scroll-m-20 my-2 font-semibold tracking-tight">
                                Job Tittle
                            </h4>
                            <Input 
                              placeholder='Enter Posting Title' 
                              className='mt-2'
                              value={newPostings.title}
                              onChange={(e) => setNewPostings({ ...newPostings, title: e.target.value })}
                            />
                          </div>
                          <div>
                          <h4 className="scroll-m-20 my-2 font-semibold tracking-tight">
                              Job Description 
                          </h4>
                          <textarea 
                            placeholder='Enter Posting Description' 
                            className="text-xs h-20 px-1 py-1 mt-2 w-full rounded-sm shadow-sm ring-1 ring-gray-200"
                            value={newPostings.job_description}
                            onChange={(e) => setNewPostings({ ...newPostings, job_description: e.target.value })}
                          />
                        </div>
                        <div>
                          <h4 className="scroll-m-20 my-2 font-semibold tracking-tight">
                              Experience(In years) 
                          </h4>
                          <Input 
                            placeholder='Enter Experience' 
                            className='mt-2'
                            value={newPostings.minExperience}
                            onChange={(e) => setNewPostings({ ...newPostings, minExperience: e.target.value })}
                          />
                        </div>
                        <div>
                          <h4 className="scroll-m-20 my-2 font-semibold tracking-tight">
                              Job Type
                          </h4>
                          <Select onValueChange={(value)=>{setNewPostings({ ...newPostings, job_type: value })}}>
                              <SelectTrigger className="w-full mt-2">
                                <SelectValue/>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Full-Time">Full-Time</SelectItem>
                                <SelectItem value="Part-Time">Part-Time</SelectItem>
                                <SelectItem value="Internship">Internship</SelectItem>
                                <SelectItem value="Contractual">Contractual</SelectItem>
                              </SelectContent>
                            </Select>
                        </div>
                        <div>
                        {newPostings.location.map((loc, index) => (
                        <div key={index} className='w-full px-8'>
                          <h4 className="scroll-m-20 my-2 font-semibold tracking-tight">
                            Location {index + 1}
                          </h4>
                          <Input 
                            placeholder='Name' 
                            value={loc.name} 
                            onChange={(e) => handleLocationChange(index, 'name', e.target.value)} 
                            className='my-4'
                          />
                          <Input 
                            placeholder='State' 
                            value={loc.state} 
                            onChange={(e) => handleLocationChange(index, 'state', e.target.value)} 
                            className='my-4' 
                          />
                          <Input 
                            placeholder='Country' 
                            value={loc.country} 
                            onChange={(e) => handleLocationChange(index, 'country', e.target.value)} 
                            className='my-4' 
                          />
                        </div>
                      ))}
                        <Button onClick={addLocation}>Add Location</Button>
                        </div>
                        <div>
                          <h4 className="scroll-m-20 my-2 font-semibold tracking-tight">
                              Number Of Vacancies
                          </h4>
                          <Input 
                            placeholder='Enter Number Of Vacancies' 
                            className='mt-2'
                            value={newPostings.numberOfVacancies}
                            onChange={(e) => setNewPostings({ ...newPostings, numberOfVacancies: e.target.value })}
                          />
                        </div>
                        <div>
                          <h4 className="scroll-m-20 my-2 font-semibold tracking-tight">
                              Notice Period
                          </h4>
                          <Input 
                            placeholder='Enter Notice Period' 
                            className='mt-2'
                            value={newPostings.notice_period}
                            onChange={(e) => setNewPostings({ ...newPostings, notice_period: e.target.value })}
                          />
                        </div>
                        <div>
                          <h4 className="scroll-m-20 my-2 font-semibold tracking-tight">
                            Salary Range
                          </h4>
                          <div className="flex justify-between">
                            <Input 
                              placeholder='Min Salary' 
                              className='mt-2 mr-2' 
                              value={newPostings.salaryRange.min} 
                              onChange={(e) => setNewPostings({ 
                                ...newPostings, 
                                salaryRange: { ...newPostings.salaryRange, min: e.target.value } 
                              })}
                            />
                            <Input 
                              placeholder='Max Salary' 
                              className='mt-2 ml-2' 
                              value={newPostings.salaryRange.max} 
                              onChange={(e) => setNewPostings({ 
                                ...newPostings, 
                                salaryRange: { ...newPostings.salaryRange, max: e.target.value } 
                              })}
                            />
                          </div>
                        </div>
                        <div>
                          <h4 className="scroll-m-20 my-2 font-semibold tracking-tight">
                              Department (optional)
                          </h4>
                          <Input 
                            placeholder='Enter Department' 
                            className='mt-2'
                            value={newPostings.department}
                            onChange={(e) => setNewPostings({ ...newPostings, department: e.target.value })}
                          />
                        </div>
                        <div>
                              <h4 className="scroll-m-20 my-2 font-semibold tracking-tight">
                                Domain
                              </h4>
                              <Select onValueChange={(value) => setNewPostings({ ...newPostings, domain: value })}>
                                <SelectTrigger className="w-full mt-2">
                                  <SelectValue placeholder= "Select Domain"/>
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Software">Software</SelectItem>
                                  <SelectItem value="Marketing">Marketing</SelectItem>
                                  <SelectItem value="Management">Management</SelectItem>
                                  <SelectItem value="Consultancy">Consultancy</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="font-semibold flex flex-col">
                            <div>Skills</div>
                            <div className="flex flex-row">
                              <Input 
                                type="text" 
                                value={skillInput} 
                                onChange={(e) => setSkillInput(e.target.value)} 
                                className='w-full my-2' 
                              />
                              <button onClick={handleAddSkill}>
                                <FaPlus />
                              </button>
                            </div>
                         </div>
                         <div>
                      {newPostings.evaluation.map((evalu, index) => (
                        <div key={index} className='w-full px-8'>
                          <h4 className="scroll-m-20 my-2 font-semibold tracking-tight">
                            Evaluation {index + 1}
                          </h4>
                          <Input 
                            placeholder='Question' 
                            value={evalu.question} 
                            onChange={(e) => handleEvaluationChange(index, 'question', e.target.value)} 
                            className='my-4'
                          />
                        </div>
                      ))}
                      <Button onClick={addEvaluation}>Add Evaluation</Button>
                    </div>
                  </div> 
              <DrawerFooter>
                <Button onClick={handleCreatePosting}>Submit</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
          </div>
        </div>
      </div>
      <div className="mt-6  grid grid-cols-3 gap-4 overflow-y-auto" style={{ maxHeight: '400px' }}>
      {filteredPostings.map((posting, index) => (
              <div key={index}>
                <PostingCard
                _id = {posting._id}
                title = {posting.title}
                type = {posting.job_type}
                org_name = {posting.org_name}
                domain = {posting.domain}
                />
              </div>
            ))}
      </div>
    </div>
  );
};

export default JobPostings;