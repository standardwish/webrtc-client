import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useProfileQuery } from "@/hooks/profile-query";
import { socket } from "@/lib/socket";
import { cn } from "@/lib/utils";
import {
  TokenResponse,
  googleLogout,
  useGoogleLogin,
} from "@react-oauth/google";
import { motion, useCycle } from "framer-motion";
import { useEffect, useState } from "react";
import Logo from "./icon/logo";
import { Button } from "./ui/button";
import { MenuToggle } from "./ui/menu-toggle";

// const components: { title: string; href: string; description: string }[] = [
//   {
//     title: "Alert Dialog",
//     href: "/docs/primitives/alert-dialog",
//     description:
//       "A modal dialog that interrupts the user with important content and expects a response.",
//   },
//   {
//     title: "Hover Card",
//     href: "/docs/primitives/hover-card",
//     description:
//       "For sighted users to preview content available behind a link.",
//   },
//   {
//     title: "Progress",
//     href: "/docs/primitives/progress",
//     description:
//       "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
//   },
//   {
//     title: "Scroll-area",
//     href: "/docs/primitives/scroll-area",
//     description: "Visually or semantically separates content.",
//   },
//   {
//     title: "Tabs",
//     href: "/docs/primitives/tabs",
//     description:
//       "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
//   },
//   {
//     title: "Tooltip",
//     href: "/docs/primitives/tooltip",
//     description:
//       "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
//   },
// ];

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

  const { status } = useProfileQuery(tokenResponse);
  console.log(status);

  return (
    <header className="w-full h-[60px] flex items-center justify-between bg-primary px-11">
      <Logo />
      <NavigationMenu className="md:flex hidden">
        <NavigationMenuList>
          {/* <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink href="/" asChild>
                    <p className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                      <div className="mb-2 mt-4 text-lg font-medium">
                        shadcn/ui
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Beautifully designed components that you can copy and
                        paste into your apps. Accessible. Customizable. Open
                        Source.
                      </p>
                    </p>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/docs" title="Introduction">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
                <ListItem href="/docs/installation" title="Installation">
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href="/docs/primitives/typography" title="Typography">
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem> */}
          {/* <NavigationMenuItem>
            <a href="/docs" target="_blank">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Variants
              </NavigationMenuLink>
            </a>
          </NavigationMenuItem> */}
        </NavigationMenuList>
      </NavigationMenu>
      {tokenResponse ? (
        <Button
          variant={"link"}
          onClick={() => logout()}
          className="text-gray-50 md:inline-flex hidden"
        >
          Sign out
        </Button>
      ) : (
        <Button
          variant={"link"}
          onClick={() => login()}
          className="text-gray-50 md:inline-flex hidden"
        >
          Sign in
        </Button>
      )}
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className="flex md:hidden"
      >
        <MenuToggle toggle={() => toggleOpen()} />
      </motion.nav>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
