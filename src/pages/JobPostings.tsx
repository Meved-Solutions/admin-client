import { useState } from 'react';
import InputDropdown from '@/components/ui/InputDropdown';
import JobCard from '@/components/JobCard';
import { IoIosSearch, IoIosBriefcase, IoIosPin } from 'react-icons/io';

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
        <IoIosSearch className="my-5 mr-4" size={28} opacity={0.5}/>
        <InputDropdown value={domain} options={domains} onChange={setDomain} />
        <IoIosBriefcase className="my-5 mx-4" size={28} opacity={0.5}/>
        <InputDropdown value={jobTitle} options={jobTitles} onChange={setJobTitle} />
        <IoIosPin className="my-5 mx-4" size={30} opacity={0.5} />
        <InputDropdown value={jobLocation} options={jobLocations} onChange={setJobLocation} />
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