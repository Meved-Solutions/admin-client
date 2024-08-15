import OrgCard from "@/components/OrgCard";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
import { FaCaretDown } from "react-icons/fa";
import { IoIosLink, IoMdCheckmark } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface OrganizationType {
  _id: string;
  name: string;
  approvedByAdmin: boolean;
}

const Organizations: React.FC = () => {
  const navigate = useNavigate();

  const [aOrgs, setAOrgs] = useState<OrganizationType[]>([]);
  const [uOrgs, setUOrgs] = useState<OrganizationType[]>([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/org/getOrganizations`, {
          headers: {
            "Authorization": localStorage.getItem("token") || '',
          },
          withCredentials: true,
        });

        console.log(res.data);
        const approvedOrgs = res.data.filter((org: OrganizationType) => org.approvedByAdmin === true);
        const unapprovedOrgs = res.data.filter((org: OrganizationType) => org.approvedByAdmin === false);

        console.log(approvedOrgs);
        console.log(unapprovedOrgs);
        setAOrgs(approvedOrgs);
        setUOrgs(unapprovedOrgs);
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };
    fetchApplicants();
  }, []);

  const handleApprove = async (org: OrganizationType) => {
    const data = { "approvedByAdmin": true };

    try {
      const approval = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/org/updateOrganization/${org._id}`, data, {
        headers: {
          'Authorization': localStorage.getItem("token") || '',
        },
        withCredentials: true,
      });
      console.log(approval.data);
    } catch (error) {
      console.error('Error approving organization:', error);
    }
  };

  const handleReject = async (org: OrganizationType) => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/org/deleteOrganization/${org._id}`, {
        headers: {
          'Authorization': localStorage.getItem("token") || '',
        },
        withCredentials: true,
      });
      console.log(res.data);
    } catch (error) {
      console.error('Error rejecting organization:', error);
    }
  };

  return (
    <div className="px-10 py-4 w-screen">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
            Organizations
          </h1>
        </div>
        <div className="flex flex-row gap-4">
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button>
                  <div className="flex flex-row items-center gap-3 py-2">
                    <FaCaretDown /> Check Requests
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {uOrgs.map((org, index) => (
                  <DropdownMenuItem key={index}>
                    <div className='flex flex-row gap-2'>
                      <div>
                        {org.name}
                      </div>
                      <div className='flex flex-row gap-3'>
                        <Button onClick={() => navigate(`/organizations/${org._id}`)}>
                          <IoIosLink />
                        </Button>
                        <Button onClick={() => handleApprove(org)}>
                          <IoMdCheckmark />
                        </Button>
                        <Button onClick={() => handleReject(org)}>
                          <MdOutlineCancel />
                        </Button>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-4 overflow-y-auto" style={{ maxHeight: '400px' }}>
        {aOrgs.map((org, index) => (
          <OrgCard key={index} org={org} />
        ))}
      </div>
    </div>
  );
};

export default Organizations;