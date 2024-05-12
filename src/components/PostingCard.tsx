import { useNavigate } from "react-router-dom"

const PostingsCard = ({_id,title,type,org_name,domain}) => {

  const navigate = useNavigate()

  return (
    <div onClick={()=>{navigate(`/posting/${_id}`)}}>
       <div className="bg-gray-200 h-20 flex flex-col justify-between px-2 py-1 shadow-md rounded-md">
            <div className="font-bold text-xm">
                {title}
            </div>
            <div className="font-semibold text-xm">
                {org_name}
            </div>
            <div className="flex flex-row justify-between font-medium text-xs">
                <div>
                    {type}
                </div>
                <div>
                    {domain}
                </div>
            </div>
       </div>
    </div>
  )
}

export default PostingsCard
