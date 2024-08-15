import { useNavigate } from "react-router-dom"

//@ts-ignore
const OrgCard = ({org}) => {

    const navigate = useNavigate();
  return (
    <div onClick={()=>{navigate(`/organizations/${org._id}`)}} className="bg-gray-200 w-56 h-10 rounded-md shadow-md px-2 py-2 font-medium">
      {org.name}
    </div>
  )
}

export default OrgCard
