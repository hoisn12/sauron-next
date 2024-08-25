import { ReactNode } from "react";

const SideBarItem = ({ children }: SideBarItemProps) => {
  return (
    <div className="h-10 rounded-md w-full hover:bg-gray-200 hover:cursor-pointer p-2 flex items-center">
      {children}
    </div>
  );
};

interface SideBarItemProps {
  children: ReactNode;
}

export default SideBarItem;
