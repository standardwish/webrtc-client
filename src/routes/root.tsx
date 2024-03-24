import { NavBar } from "@/components/navigation-bar";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div>
      <NavBar />
      <div className="h-[60px]"></div>
      <div className="w-full md:px-11 px-4">
        <Outlet />
      </div>
    </div>
  );
}
