import { useState } from 'react';
import InputDropdown from '@/components/ui/InputDropdown';
import JobCard from '@/components/JobCard';
import { IoIosSearch, IoIosBriefcase, IoIosPin } from 'react-icons/io';
import { Button } from '@/components/ui/button';
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


const JobPostings = () => {
  const [domain, setDomain] = useState('Select Your Domain');
  const [jobTitle, setJobTitle] = useState('Enter Your Job Title');
  const [jobLocation, setJobLocation] = useState('Enter Job Location');

  const domains = ['Domain 1', 'Domain 2', 'Domain 3'];
  const jobTitles = ['Job Title 1', 'Job Title 2', 'Job Title 3'];
  const jobLocations = ['Location 1', 'Location 2', 'Location 3'];


  const jobData = [
    {
      companyName: 'Company 1',
      domain: 'Domain 1',
      roleName: 'Role 1',
      companySize: '100-200',
      experienceNeeded: '2-3 years',
      baseStipend: '$3000',
    },
    {
      companyName: 'Company 2',
      domain: 'Domain 2',
      roleName: 'Role 2',
      companySize: '200-300',
      experienceNeeded: '3-4 years',
      baseStipend: '$4000',
    },
    {
      companyName: 'Company 3',
      domain: 'Domain 3',
      roleName: 'Role 3',
      companySize: '300-400',
      experienceNeeded: '4-5 years',
      baseStipend: '$5000',
    },
    {
      companyName: 'Company 4',
      domain: 'Domain 4',
      roleName: 'Role 4',
      companySize: '400-500',
      experienceNeeded: '5-6 years',
      baseStipend: '$6000',
    },
    // Add more job data here
  ];

  return (
    <div className="px-8 py-4">
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">
        Job Postings
      </h1>
      <div className="flex flex-row justify-between items-center px-10 bg-gray-200 w-[1280px] h-16 rounded-md mx-2 my-6 text-semibold">
        <IoIosSearch className="mr-4" size={80} opacity={0.5}/>
        <InputDropdown value={domain} options={domains} onChange={setDomain} />
        <IoIosBriefcase className="my-5 mx-4" size={80} opacity={0.5}/>
        <InputDropdown value={jobTitle} options={jobTitles} onChange={setJobTitle} />
        <IoIosPin className="my-5 mx-4" size={80} opacity={0.5} />
        <InputDropdown value={jobLocation} options={jobLocations} onChange={setJobLocation} />
      </div>
      <div className='my-4 flex flex-row justify-end'>
        <Drawer>
        <DrawerTrigger><Button> + Create Posting</Button></DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
            <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">
              Create Job Posting
            </h1>
            </DrawerTitle>
          </DrawerHeader>
          <div className='px-8  overflow-auto custom-scrollbar h-[60vh]'>
              <div>
                <h4 className="scroll-m-20 my-2 font-semibold tracking-tight">
                    Job Tittle
                </h4>
                <Input placeholder='Enter Posting Tittle'/>
            </div>
            <div>
                <h4 className="scroll-m-20 my-2 font-semibold tracking-tight">
                    Job Description
                </h4>
                <textarea placeholder='Enter Posting Title' className='h-48 w-full rounded-md  px-1 py-1 ring-2 ring-gray-100'/>
            </div>
            <div>
                <h4 className="scroll-m-20 my-2 font-semibold tracking-tight">
                    Job Type
                </h4>
                <Input placeholder='Enter Posting Type'/>
            </div>
            <div className="w-full">
                    <h4 className="scroll-m-20 my-2 font-semibold tracking-tight">
                    Job Domain
                    </h4>
                    <InputDropdown 
                    options={['Domain 1', 'Domain 2', 'Domain 3']} 
                    />
            </div>
            <div>
                <h4 className="scroll-m-20 my-2 font-semibold tracking-tight">
                    Job Location
                </h4>
                <Input placeholder='Enter Posting Location'/>
            </div>  
            <div>
                <h4 className="scroll-m-20 my-2 font-semibold tracking-tight">
                    Job Experience Required
                </h4>
                <Input placeholder='Enter Posting Experience Required'/>
            </div>  
            <div>
                <h4 className="scroll-m-20 my-2 font-semibold tracking-tight">
                    Job Offered By
                </h4>
                <Input placeholder='Enter Posting Company'/>
            </div>  
            <div>
                <h4 className="scroll-m-20 my-2 font-semibold tracking-tight">
                    Job Package Offered
                </h4>
                <Input placeholder='Enter Posting Package Offered'/>
            </div>  
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      </div>
      <div className="flex flex-col gap-4 overflow-auto max-h-[500px] custom-scrollbar">
        {jobData.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobPostings;