import { motion } from "framer-motion";

export const Cross: React.FC = () => {
  return (
    <motion.svg
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ ease: "easeOut", duration: 0.2 }}
      className="w-10 h-10"
      fill="none"
      style={{ transformOrigin: "center" }}
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeWidth="1.5"
        d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
};
