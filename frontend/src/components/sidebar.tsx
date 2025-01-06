import { Link, useLocation, useNavigate } from "react-router-dom";
import { routes } from "../../constants";
import logoutImg from "../assets/logout.png";
import mainIcon from "../assets/mainicon.png";
import classnames from "classnames";
import useAuth from "@/store/store";
import { useIsMobile } from "@/hooks/use-mobile";
import React from "react";

export default function Sidebar({ expanded, setExpanded }: any) {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleExpanded = () => {
    if (window.innerWidth < 768) {
      setExpanded(false);
    }
  };

  React.useEffect(() => {
    setExpanded(!isMobile);
  }, [isMobile]);

  return (
    <section
      className={classnames(
        "transition-all duration-300 ease-in-out rounded-lg",
        {
          "blur blur-high md:w-[226px] h-full": expanded,
          "h-0 blur blur-low opacity-0 md:opacity-100 md:h-full md:w-[44px] overflow-hidden":
            !expanded,
        }
      )}
    >
      <nav className="flex flex-col md:h-full">
        <div
          className={classnames({
            "flex justify-center": true,
            "my-5": expanded,
            "flex justify-center items-center mb-6 mt-9": !expanded,
          })}
        >
          <img src={mainIcon} alt="main" />
        </div>
        {routes.map((route, index) => {
          const isActive = route.path === location.pathname;
          return (
            <div
              key={index}
              className={classnames({
                "flex gap-2 py-3": true,
                "pl-4": expanded,
                "justify-center items-center": !expanded,
                "border-r-4 border-[#d9b906] bg-gradient-to-r from-[#cdcdc869] to-[#f8df4e73]":
                  isActive,
                "hover:border-[#d9b906] hover:border-r-4": !isActive,
              })}
            >
              <Link
                to={route.path}
                className={classnames({
                  "font-semibold text-lg pr-1 flex gap-2": true,
                  "text-[#d9b906]": isActive,
                  "hover:text-[#d9b906]": !isActive,
                })}
              >
                <img
                  src={route.image}
                  alt={route.name}
                  className={classnames({
                    "w-[24px] h-[24px]": true,
                    "filter-gold": isActive,
                  })}
                />
                <span
                  className={classnames({ hidden: !expanded })}
                  onClick={() => handleExpanded()}
                >
                  {route.name}
                </span>
              </Link>
            </div>
          );
        })}
        <div
          className={classnames({
            "font-semibold text-lg flex gap-2 mt-auto mx-4 mb-2 hover:text-[#d9b906] hover:border-[#d9b906] hover:border-r-4":
              true,
            "mx-0 flex justify-center": !expanded,
          })}
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          <img src={logoutImg} alt="logout" className="min-w-[24px] h-[24px]" />
          <span className={classnames({ hidden: !expanded })}>Logout</span>
        </div>
      </nav>
    </section>
  );
}
