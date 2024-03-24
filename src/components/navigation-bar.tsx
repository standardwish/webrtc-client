import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./icon/logo";
import { MenuToggle } from "./ui/menu-toggle";

const locations = [
  {
    name: "React",
    to: "a0fmhkcc8e",
  },
  {
    name: "Angular",
    to: "bzdb1j45x19",
  },
  {
    name: "Vue",
    to: "85wv0xdhgk4",
  },
];
export function NavBar() {
  //Is NavigationBar Open
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Close the navbar when navigating to a different page
    setIsOpen(false);
  }, [location]);

  return (
    <header className={`w-full bg-primary md:px-11 py-4 fixed z-50 h-auto`}>
      <nav className="flex flex-col w-full">
        <div className="flex items-center justify-between w-full px-4">
          <Link to={"/"}>
            <Logo />
          </Link>
          <MenuToggle toggle={() => setIsOpen(!isOpen)} isOpen={isOpen} />
        </div>
        <ul
          className={`flex flex-col gap-3 overflow-hidden transition-nav duration-500 ${
            isOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {locations.map((val) => (
            <NavTab key={val.to} href={`/room/${val.to}`}>
              {val.name}
            </NavTab>
          ))}
        </ul>
      </nav>
    </header>
  );
}

function NavTab({
  href = "/",
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={href}
      className="px-4 py-2 text-lg font-medium text-gray-50 rounded-md"
    >
      {children}
    </Link>
  );
}
