import { useState } from "react";
import { useNavigate } from "react-router";
import Role from "../../components/Role";
import logo from "../../assets/uber_icon.png";
import { FaCarAlt } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedRole) {
      navigate(`/${selectedRole}`);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-evenly min-h-screen bg-gray-100 px-6">
        {/* icon */}
        <img src={logo} alt="Uber Logo" className="w-26 h-10" />
        <div className="flex flex-col items-center justify-center gap-4">
          <h2 className="text-2xl font-bold mb-6">
            Join as a Captain or Client
          </h2>

          {/* Role Selection Options */}
          <div className="w-full max-w-md space-y-4">
            {/* captain-role-section */}
            <Role
              role="login-captain"
              setSelectedRole={setSelectedRole}
              selectedRole={selectedRole}
            >
              <p className=" flex font-semibold text-xl gap-5 justify-center items-center text-center">
                {" "}
                <FaCarAlt className="text-2xl" /> I&apos;m a Captain (Driver)
              </p>
            </Role>
            {/* Passenger-role-section */}
            <Role
              role="login-client"
              setSelectedRole={setSelectedRole}
              selectedRole={selectedRole}
            >
              <p className="flex font-semibold text-xl gap-5 justify-center items-center text-center">
                {" "}
                <FaUserLarge className="text-2xl" /> I&apos;m a Client
                (Passenger)
              </p>
            </Role>
          </div>

          {/* Continue Button */}
          <button
            className={`mt-6 px-6 py-3 text-white rounded-lg ${
              selectedRole
                ? "bg-black hover:bg-gray-800 transition-all duration-150 ease-linear active:scale-95"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!selectedRole}
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
};

export default RoleSelection;
