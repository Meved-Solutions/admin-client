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
import { useState } from 'react';


const JobPosting = () => {

  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const applicants = [
    {
      name: 'Applicant 1',
      location: 'Location 1',
      email: 'applicant1@example.com',
      phone: '123-456-7890',
      status: 'Pending',
    },
    {
      name: 'Applicant 2',
      location: 'Location 2',
      email: 'applicant2@example.com',
      phone: '098-765-4321',
      status: 'Accepted',
    },
    // Add more applicants as needed
  ];

  return (
    <div className="px-10 py-4 w-full overflow-none custom-scroll">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
        Job Posting
      </h1>
      <Tabs defaultValue="postingDetails" className="w-full my-2">
        <TabsList>
          <TabsTrigger value="postingDetails">Posting Details</TabsTrigger>
          <TabsTrigger value="applicationsReceived">Applications Received</TabsTrigger>
        </TabsList>
        <TabsContent value="postingDetails">
          {/* Posting Details content goes here */}
          <div>
            <h4 className="scroll-m-20 my-2 text-xl font-semibold tracking-tight">
              Job Title
            </h4>
            <Input disabled placeholder='Job Title'/>
            <h4 className="scroll-m-20 my-2 text-xl font-semibold tracking-tight">
              Job Domain
            </h4>
            <Input disabled placeholder='Job Domain'/>
            <h4 className="scroll-m-20 my-2 text-xl font-semibold tracking-tight">
              Experience Required
            </h4>
            <Input disabled placeholder='Experience Required'/>
            <h4 className="scroll-m-20 my-2 text-xl font-semibold tracking-tight">
              Notice Period
            </h4>
            <Input disabled placeholder='Notice Period'/>
            <h4 className="scroll-m-20 my-2 text-xl font-semibold tracking-tight">
              Job Description
            </h4>
            <textarea disabled placeholder='Job Description' className='ring-2 ring-gray-50 px-2 w-full h-24 text-medium text-gray-50 bg-white rounded-md'/>
          </div>
        </TabsContent>
        <TabsContent value="applicationsReceived">
          {/* Applications Received content goes here */}
          <div className= "flex flex-col gap-3 bg-gray-100 rounded-md h-[520px] overflow-auto py-2 px-2">
            {applicants.map((applicant, index) => (
              <div key={index} className="flex flex-col justify-between bg-gray-200 rounded-md pl-2 pr-4 py-1 h-24">
                <div className="flex flex-row justify-between">
                  <div className="font-semibold text-xl">
                    {applicant.name}
                  </div>
                  <div className="flex flex-row gap-3 text-sm font-medium">
                    <div className="flex flex-row items-center gap-2">
                      <IoLocationOutline />
                      <div>{applicant.location}</div>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <IoMailOutline />
                      <div>{applicant.email}</div>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <IoCallOutline />
                      <div>{applicant.phone}</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-between mb-1">
                  <Dialog>
                    <DialogTrigger>
                       <Button>Info</Button>
                    </DialogTrigger>
                    <DialogContent className='overflow-auto h-[70vh]'>
                        <DialogHeader>
                        <DialogTitle>
                        <h2 className="scroll-m-20 my-2 text-xl font-semibold tracking-tight">
                            Applicant Description
                        </h2>
                        </DialogTitle>
                        </DialogHeader>
                        <div>
                        <h4 className="scroll-m-20 my-2 text-xl font-semibold tracking-tight">
                        Name
                        </h4>
                        <Input disabled placeholder='Applicant Name'/>
                        <h4 className="scroll-m-20 my-2 text-xl font-semibold tracking-tight">
                        Email
                        </h4>
                        <Input disabled placeholder='Email'/>
                        <h4 className="scroll-m-20 my-2 text-xl font-semibold tracking-tight">
                        Phone
                        </h4>
                        <Input disabled placeholder='Phone'/>
                        <h4 className="scroll-m-20 my-2 text-xl font-semibold tracking-tight">
                        Location
                        </h4>
                        <Input disabled placeholder='Location'/>
                        <h4 className="scroll-m-20 my-2 text-xl font-semibold tracking-tight">
                        Image
                        </h4>
                        <Input disabled placeholder='Image'/>
                        <h4 className="scroll-m-20 my-2 text-xl font-semibold tracking-tight">
                        Gender
                        </h4>
                        <Input disabled placeholder='Gender'/>
                        <h4 className="scroll-m-20 my-2 text-xl font-semibold tracking-tight">
                        Bio
                        </h4>
                        <textarea disabled placeholder='Bio' className='ring-2 ring-gray-50 px-2 w-full h-24 text-medium text-gray-50 bg-white rounded-md'/>
                        <h4 className="scroll-m-20 my-2 text-xl font-semibold tracking-tight">
                        Years of Experience
                        </h4>
                        {/* You can map over the years_of_experience array to generate the inputs */}
                        <h4 className="scroll-m-20 my-2 text-xl font-semibold tracking-tight">
                        Education
                        </h4>
                        {/* You can map over the education array to generate the inputs */}
                        <h4 className="scroll-m-20 my-2 text-xl font-semibold tracking-tight">
                        Resume
                        </h4>
                        <Input disabled placeholder='Resume'/>
                        </div>
                        <h4 className="scroll-m-20 mt-2 text-xl font-semibold tracking-tight">
                            Status
                        </h4>
                        <InputDropdown options={["Accepted", "Pending", "Rejected"]} onChange={handleChange}/>
                    </DialogContent>
                    </Dialog>
                  <div>
                    {applicant.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default JobPosting