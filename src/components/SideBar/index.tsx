import { ReactNode } from "react";

const SideBar = ({ children }: SideBarProps) => {
  return (
    <div className="w-full h-full max-w-[300px] border-r-0 px-2 bg-gray-50">
      {children}
    </div>
  );
};

interface SideBarProps {
  children: ReactNode;
}

export default SideBar;
