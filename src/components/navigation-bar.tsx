import { socket } from "@/lib/socket";
import {
  TokenResponse,
  googleLogout,
  useGoogleLogin,
} from "@react-oauth/google";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import { useEffect, useState } from "react";
import Logo from "./icon/logo";
import { MenuToggle } from "./ui/menu-toggle";

export function NavigationBar() {
  //Is NavigationBar Open
  const [isOpen, toggleOpen] = useCycle(false, true);
  //Profile Data
  const [tokenResponse, setTokenResponse] = useState<TokenResponse>();

  //Login
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => setTokenResponse(tokenResponse),
    onError: (error) => console.error(error),
  });
  //Lgout
  const logout = () => {
    googleLogout();
    setTokenResponse(undefined);
  };

  useEffect(() => {
    if (tokenResponse) {
      socket.connect();
    } else {
      socket.disconnect();
    }
  }, [tokenResponse]);

  return (
    <header
      className={`w-full transition-height bg-primary md:px-11 py-4 fixed z-50`}
      style={
        isOpen
          ? { height: "auto", paddingBottom: "1rem" }
          : { height: "60px", paddingBottom: "0" }
      }
    >
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className="flex flex-col w-full"
      >
        <div className="flex items-center justify-between w-full px-4">
          <Logo />
          <MenuToggle toggle={toggleOpen} />
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-3"
            >
              <NavTab href="/">Item 1</NavTab>
              <NavTab href="/">Item 2</NavTab>
              <NavTab href="/">Item 3</NavTab>
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.nav>
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
    <a
      href={href}
      className="px-4 py-2 text-sm font-medium text-gray-50 rounded-md"
    >
      {children}
    </a>
  );
}
