import { Link, NavLink } from "react-router";
import {
  MdOutlineDashboard,
  MdAssignment,
  MdRateReview,
  MdAddBox,
  MdPeople,
  MdAnalytics,
  MdOutlineAppRegistration,
  MdPayment,
  MdGroup,
} from "react-icons/md";
import { FiFileText, FiLogOut } from "react-icons/fi";
import { IoHomeSharp } from "react-icons/io5";
import { useContext } from "react";
import WebContext from "../Context/WebContext";
import { GpsFixed } from "@mui/icons-material";

const SideNav = ({ role }) => {
  const fixedRole = role?.toLowerCase() || "";
 console.log(fixedRole);

  const { handleLogout, } = useContext(WebContext);

  const commonLinks = [
    { to: "/dashboard/home", label: "Dashboard", icon: <MdOutlineDashboard /> },
    {
      to: "/dashboard/my-applications",
      label: "My Clubs",
      icon: <MdAssignment />,
      role: "member",
    },
    {
      to: "/dashboard/my-event",
      label: "My Events",
      icon: <MdAssignment/>,
      role: "member",
    },
    {
      to: "/dashboard/my-event",
      label: "Payment History",
      icon: <MdPayment />,
      role: "member",
    },
  ];

  const adminLinks = [
    {
      to: "/dashboard/manage-users",
      label: "Manage Users",
      icon: <MdPeople />,
    },
    { to: "/dashboard/analytics", 
      label: "Analytics", 
      icon: <MdAnalytics /> },
  ];

  const managerLinks = [
    { to: "/dashboard/add", 
      label: "Add Club", 
      icon: <MdAddBox /> },
    {
      to: "/dashboard/manage-clubs",
      label: "Manage Clubs",
      icon: <FiFileText />,
    },
    { to: "/dashboard/addEvent", 
      label: "Add Event", 
      icon: <MdAddBox /> 
    },
     {
      to: "/dashboard/manage-events",
      label: "Manage Events",
      icon: <FiFileText />,
    },
    {
      to: "/dashboard/club-members",
      label: "Club Members",
      icon: <MdGroup />,
    },
    {
      to: "/dashboard/event-registrations",
      label: "Event Registrations",
      icon: <MdOutlineAppRegistration />,
    },
  ];

  const renderLinks = () => {
    if (fixedRole === "admin") return [...commonLinks, ...adminLinks];
    if (fixedRole === "manager") return [...commonLinks, ...managerLinks];
    return commonLinks;
  };

  return (
    <div
      className={`w-full h-full sm:p-4 p-2 space-y-2 flex flex-col border-r bg-[#fff6f6] dark:bg-[#2c1f1f] border-[#682626] transition-colors duration-300`}
    >
      {/* Sidebar Links */}
      <div className="flex-1 space-y-1">
        {renderLinks().map((item) => {
          if (item.role && item.role !== fixedRole) return null;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-2 py-2 lg:w-full w-fit rounded-xl font-bold transition-all duration-300 ${isActive
                  ? "bg-[#682626] text-white shadow-lg shadow-[#682626]/30"
                  : "text-[#682626] hover:bg-[#cd974c]/10 hover:text-[#cd974c]"
                }`
              }
            >
              <span className="sm:text-2xl text-xl">{item.icon}</span>

              {/* desktop text */}
              <span className="lg:flex hidden text-sm xl:text-base tracking-tight">
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-[#682626]/20 my-4"></div>

      {/* Back Home Link */}
      <Link
        to={"/"}
        className="flex items-center gap-3 px-2 py-2 rounded-xl font-bold text-[#682626] hover:bg-[#cd974c]/10 hover:text-[#cd974c] transition-all duration-300"
      >
        <IoHomeSharp className="text-2xl" />
        <span className="lg:flex hidden lg:text-sm xl:text-base tracking-tight">
          Back Home
        </span>
      </Link>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-2 py-2 rounded-xl font-bold text-[#d71313] hover:bg-[#cd974c]/10 hover:text-[#cd974c] transition-all duration-300"
      >
        <FiLogOut className="text-2xl" />
        Logout
      </button>
    </div>

  );
};

export default SideNav;
