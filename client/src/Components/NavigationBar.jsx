import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";

const NavigationBar = () => {
  const { authUser, setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  return (
    <div className=" w-screen flex bg-blue-500 text-lg text-white justify-between p-3">
      <div className=" flex gap-12 mx-8">
        <button
          onClick={() => {
            navigate("/search");
          }}
        >
          Search
        </button>
        <button
          onClick={() => {
            navigate("/lists");
          }}
        >
          Lists
        </button>
      </div>
      <div className=" flex gap-12 mx-8">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            setAuthUser(null);
          }}
        >
          Logout ({authUser})
        </button>
      </div>
    </div>
  );
};

export default NavigationBar;
