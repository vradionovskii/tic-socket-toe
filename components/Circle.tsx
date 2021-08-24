import { motion } from "framer-motion";

export const Circle: React.FC = () => {
  return (
    <motion.svg
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ ease: "easeOut", duration: 0.2 }}
      className="w-10 h-10"
      style={{ transformOrigin: "center" }}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 13A6 6 0 107 1a6 6 0 000 12z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
};
