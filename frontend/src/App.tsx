import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import axios from "axios";
import Services from "./components/Services";
import Cookies from "js-cookie";

function App() {
  const [user, setUser] = useState({ id: "", name: "" });
  const email = Cookies.get("email");
  console.log(email);
  
  useEffect(() => {
    if (email) {
      const getData = async () => {
        const response = await axios.post(
          "http://localhost:5050/auth/getUser",
          {
            email,
          },
          { withCredentials: true }
        );
        console.table(response.data.data[0]);
        
        const responseUser = response.data.data[0];
        setUser(responseUser);
      };
      getData();
    }
  }, []);
  useEffect(() => {
    console.log(user.id);
    
  })
  return (
    <div className="m-auto h-screen">
      <Navbar {...{ name: user.name, email }} />
      <div className="p-24"></div>
      {email ? (
        <Services id={user?.id} />
      ) : (
        <div className="flex h-full items-center justify-center">
          <h1>
            Please sign in with Google to access your customer service portal.
          </h1>
        </div>
      )}
    </div>
  );
}

export default App;
