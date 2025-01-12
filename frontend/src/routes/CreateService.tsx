import axios from "axios";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CreateService = () => {
  const { id } = useParams();
  const [userId, setUserId] = useState(id);
  const [category, setCategory] = useState("General Queries");
  const [comments, setComments] = useState("");
  const [user, setUser] = useState({ name: "", email: "" });
  const nav = useNavigate();
  const submitHandler = async (e: any) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5050/service/create",
        {
          userId,
          comments,
          category,
        },
        { withCredentials: true }
      ).then(() => {
        nav('/');
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const getData = async () => {
      const respone = await axios.get(
        `http://localhost:5050/auth/getUser/${id}`,
      );
      console.log(respone.data);
      
      const responseUser = respone.data;
      setUser(responseUser);
    };
    if (id) {
      getData();
    }
  }, [id]);
  useEffect(() => {
    console.log(id);    
  })
  return (
    <>
      <Navbar {...user}/>
      <div className="p-24"></div>
      <div className="w-screen">
        <form className="m-auto flex flex-col max-w-96 gap-2" onSubmit={submitHandler}>
          <h2 className="text-3xl m-4">Create Complaint Form</h2>

          <input
            type="text"
            placeholder="ID"
            className="bg-slate-50 p-2 appearance-none rounded-xl"
            value={userId}
            disabled
            onChange={(e) => {
              setUserId(e.target.value);
            }}
          />
          <select
            value={category}
            className="resize-none outline-none bg-slate-50 p-2 appearance-none rounded-xl"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="Product Features Queries">
              Product Features Queries
            </option>
            <option value="Product Pricing Queries">
              Product Pricing Queries
            </option>
            <option value="Product Feature Implementation Requests">
              Product Feature Implementation Requests
            </option>
            <option value="General Queries"> General Queries</option>
          </select>
          <textarea
            placeholder="Description"
            className=" resize-none outline-none bg-slate-50 p-2 appearance-none rounded-xl"
            required
            rows={4}
            cols={50}
            value={comments}
            onChange={(e) => {
              setComments(e.target.value);
            }}
          />
          <button className="bg-black h-10 text-white p-2 px-3 rounded-xl">Submit</button>
        </form>
      </div>
    </>
  );
}

export default CreateService