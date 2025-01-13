import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { formatRelative } from "date-fns/fp";

type Complaints = {
  id: string;
  complaint: string;
  category: string;
  updated_at: number;
};
const Services = ({ id }: any) => {
  const [category, setCategory] = useState("All Queries");
  const [complaints, setComplaints] = useState<Complaints[]>([]);
  const [visibleComplaints, setVisibleComplaints] = useState<Complaints[]>([]);
  const getComplaints = async () => {
    const response = await axios.post<any>(
      "http://localhost:5050/service/get",
      { userId: id },
      { withCredentials: true }
    );
    const tempComplaint: any[] = [];
    response.data.data.map((comp: any) => {
      const htmlString = comp.source.body;
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, "text/html");

      const jsonContent = doc.body.firstChild?.textContent;
      try {
        if (jsonContent) {
          const parsed = JSON.parse(jsonContent);
          const complaintInstance = {
            id: comp.id,
            complaint: parsed.comments,
            category: parsed.category,
            ...comp
          };
          tempComplaint.push(complaintInstance);
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
      setComplaints(tempComplaint);
      setVisibleComplaints(tempComplaint);
    });
  };
  useEffect(() => {
    getComplaints();

  }, [id]);

  return (
    <div className="complaints">
      <h2 className="text-center text-4xl font-bold m-10">Complaints</h2>
      <select
        className="bg-slate-50 p-2 appearance-none rounded-xl m-2"
        value={category}
        onChange={(e) => {
          if (e.target.value == "All Queries") {
            setVisibleComplaints(complaints);
            setCategory(e.target.value);
          } else {
            const tempComplaints = complaints.filter((complaint: any) => {
              return complaint.category == e.target.value;
            });
            setVisibleComplaints(tempComplaints);
            setCategory(e.target.value);
          }
        }}
      >
        <option value="All Queries">All Queries</option>
        <option value="General Queries">General Queries</option>
        <option value="Product Features Queries">
          Product Features Queries
        </option>
        <option value="Product Pricing Queries">Product Pricing Queries</option>
        <option value="Product Feature Implementation Requests">
          Product Feature Implementation Requests
        </option>
      </select>
      <Link to={`/${id}/create`}>
        <button className="bg-black h-10 text-white p-2 px-3 rounded-xl">
          New Complaint
        </button>
      </Link>
      <div className="w-full flex flex-col items-center content-start p-5 gap-3">
        {visibleComplaints.map((complaint) => {
          
          return (
            <Link
              to={`/${complaint.id}`}
              key={complaint.id}
              className="flex flex-col items-start max-w-96 w-full p-3 rounded-lg bg-gray-50"
            >
              <div className="bg-white w-full p-2 rounded-md mb-6">Complaint No: {complaint.id}</div>
              <div className="font-bold">{complaint.category}</div>
              <div className="text-gray-400">{complaint.complaint}</div>
              <div className="text-xs self-end">
                {formatRelative(Date.now(), new Date(complaint.updated_at * 1000))}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Services;