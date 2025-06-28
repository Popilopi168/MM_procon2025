import { motion } from "framer-motion";

export default function AnimatedCard() {
  return (
    <motion.div
      className="bg-yellow-300 text-black text-xl p-8 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      👋 Welcome to the Vtuber Stream!
    </motion.div>
  );
}
