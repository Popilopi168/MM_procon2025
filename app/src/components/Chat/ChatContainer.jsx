import { motion, AnimatePresence } from "framer-motion";
import useChatMessages from "../../hooks/useChatMessages";
import lyricIcon from "../../assets/lyric_icon.png";

export default function ChatContainer({ phrase }) {
  const [msgs, purge] = useChatMessages(phrase);

  return (
    <div className="flex flex-col justify-end h-full overflow-hidden px-4 py-2 space-y-2">
      <AnimatePresence initial={false}>
        {msgs.map((m) => (
          <motion.div
            key={m.id}
            layout      // let Framer handle re-calc
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-row  gap-2 bg-white/80 text-sm text-[#070203] p-2 rounded shadow"
            onAnimationComplete={(d) => {
              // when exit finishes, remove from array
              if (d === "exit") purge(m.id);
            }}
          > <img src={lyricIcon} alt="avatar" className="w-5 h-5 rounded-full" />
            {m.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
