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
} from "@/components/ui/select";
import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import axios from "axios";

interface Application {
  _id: string;
  applicant_id: string;
  posting_id: string;
  applicant_name: string;
  evaluation: string[];
  status: string;
  // Add any other properties here if needed
}

interface ApplicationCardProps {
  application: Application;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application }) => {
  const navigate = useNavigate();
  const user_id = application.applicant_id;
  // const posting_id = application.posting_id;

  const [status, setStatus] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const handleSubmit = async () => {
    const data = {
      status: status,
      comments: comment,
    };

    const res = await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/api/application/updateApplication/${application._id}`,
      data,
      {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
        withCredentials: true,
      }
    );

    console.log(res.data);
  };

  return (
    <div className="bg-gray-200 w-64 h-16 rounded-sm shadow-md px-2 py-2 font-semibold">
      <Dialog>
        <DialogTrigger>{application.applicant_name}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{application.applicant_name}</DialogTitle>
            <DialogDescription>Applicant Info</DialogDescription>
          </DialogHeader>
          <div className="mt-2 h-[50vh] overflow-auto">
            <div onClick={() => navigate(`/applicants/${user_id}`)}>
              <h4 className="scroll-m-20 my-2 font-semibold tracking-tight">
                User Profile
              </h4>
            </div>
            <div>
              <h4 className="scroll-m-20 my-2 font-semibold tracking-tight">
                Evaluation Response
              </h4>
              <div>
                {application.evaluation.map((res, index) => (
                  <div key={index}>
                    <textarea
                      value={res}
                      className="mt-2 h-20 px-1 py-1 w-full rounded-sm shadow-sm ring-1 ring-gray-200"
                      readOnly
                    />
                  </div>
                ))}
              </div>
              <div>
                <h4 className="scroll-m-20 my-2 font-semibold tracking-tight">
                  Status
                </h4>
                <Select onValueChange={(val) => setStatus(val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={application.status} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Selected">Selected</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-6">
                <h4 className="scroll-m-20 my-2 font-semibold tracking-tight">
                  Comments(if any)
                </h4>
                <textarea
                  value={comment}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setComment(e.target.value)
                  }
                  className="text-xs h-20 px-1 py-1 mt-2 w-full rounded-sm shadow-sm ring-1 ring-gray-200"
                />
              </div>
              <div className="mt-6">
                <Button onClick={handleSubmit}>Submit Changes</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div className="text-xs">Status : {application.status}</div>
    </div>
  );
};

export default ApplicationCard;