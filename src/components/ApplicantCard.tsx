import { useNavigate } from "react-router-dom"

const ApplicantCard = ({applicant}) => {
    const navigate = useNavigate();
  return (
    <div onClick={()=>{navigate(`/applicants/${applicant._id}`)}} className="bg-gray-200 w-56 h-10 rounded-md shadow-md px-2 py-2 font-medium">
      {applicant.name}
    </div>
  )
}

export default ApplicantCard
