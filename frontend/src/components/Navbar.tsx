import axios from "axios";
import { Link } from "react-router-dom";

const Navbar = (props: any) => {
  const handleLogin = () => {
    window.location.href = `http://localhost:5050/auth/google`;
  };

  const handleLogout = async () => {
    try {
      const req = await axios.get("http://localhost:5050/auth/logout", {
        withCredentials: true,
      });
      if (req.status === 200) {
        window.location.href = "http://localhost:3000/";
        console.log(req.data);
        
      }

    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="fixed w-screen flex justify-between bg-black items-center h-20 p-5">
      <Link to={`/`}>
      <div className="text-white text-xl">
      Customer Servive Portal
      </div>
      </Link>
      <div className="">
        {props.email ? (
          <button className="p-2 rounded-lg color bg-gray-100" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className="p-2 rounded-lg color bg-gray-100" onClick={handleLogin}>
            Sign In with Google
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
