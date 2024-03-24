import { SVGMotionProps, motion } from "framer-motion";
interface MenuToggleProps {
  toggle: () => void;
  isOpen: boolean;
}

const Path = (props: SVGMotionProps<SVGPathElement>) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(210, 20%, 98%)"
    strokeLinecap="round"
    {...props}
  />
);

export const MenuToggle = ({ toggle, isOpen = false }: MenuToggleProps) => (
  <button onClick={toggle} className="flex items-center justify-center">
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        animate={isOpen ? "open" : "closed"}
        initial={{ d: "M 2 2.5 L 20 2.5" }}
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        animate={isOpen ? "open" : "closed"}
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        initial={{ d: "M 2 16.346 L 20 16.346" }}
        animate={isOpen ? "open" : "closed"}
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
      />
    </svg>
  </button>
);
