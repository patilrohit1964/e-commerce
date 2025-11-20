"use client";
import React from "react"
import { AnimatePresence, motion } from "motion/react";

import { cn } from "../../lib/utils"

export function WordRotate({
  words,
  className,
  duration = 2000
}) {
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (index === words.length - 1) {
        setIndex(0)
      } else {
        setIndex(index + 1)
      }
    }, duration)
    return () => clearTimeout(timeoutId);
  }, [index, words, duration])

  return (
    <div className="overflow-hidden p-2">
      <AnimatePresence mode="wait">
        <motion.div
          key={words[index]}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={cn(className)}>
          {words[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
