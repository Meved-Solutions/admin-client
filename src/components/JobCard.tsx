import { IoIosPeople, IoIosBriefcase, IoIosCash } from 'react-icons/io';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const JobCard: React.FC<JobCardProps> = ({ job }) => {
    
    const navigate = useNavigate();

    return (
      <div className="bg-gray-200 h-24 rounded-md pl-2 pr-4 pt-1">
        <div className="flex flex-row justify-between">
          <h2 className="scroll-m-20 text-xl font-semibold tracking-tight first:mt-0 text-gray-900">
            {job.companyName}
          </h2>
          <h3 className="scroll-m-20 font-medium tracking-tight text-gray-600">
            {job.domain}
          </h3>
        </div>
        <h3 className="scroll-m-20 font-medium tracking-tight text-gray-600">
          {job.roleName}
        </h3>
        <div className="flex flex-row items-center justify-between text-gray-500 pb-2">
          <div className="flex flex-row items-center gap-3">
            <div className="flex flex-row items-center gap-1">
              <IoIosPeople />
              <h4 className="scroll-m-20 text-sm tracking-tight">
                Company Size: {job.companySize}
              </h4>
            </div>
            <div className="flex flex-row items-center gap-1">
              <IoIosBriefcase /> 
              <h4 className="scroll-m-20 text-sm tracking-tight">
                Experience Needed: {job.experienceNeeded}
              </h4>
            </div>
            <div  className="flex flex-row items-center gap-1">
              <IoIosCash />
              <h4 className="scroll-m-20 text-sm tracking-tight">
                Base Stipend: {job.baseStipend}
              </h4>
            </div>
          </div>
              <Button onClick={(e)=>{navigate(`/posting/${123}`)}}>See Updates</Button>
        </div>
      </div>
    );
  };
  
  export default JobCard;
