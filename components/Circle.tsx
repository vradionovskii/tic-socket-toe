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
      <circle strokeWidth="1.5" cx="11" cy="11" r="7" />
    </motion.svg>
  );
};
