import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownTimer() {
  // 🎯 Set your launch date
  const targetDate = new Date("2025-12-31T23:59:59").getTime()
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance <= 0) {
        clearInterval(interval)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  const items = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ]

  return (
    <div className="flex items-center justify-center gap-8 mt-90">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          <Card className="backdrop-blur-lg bg-[#EEDFC5]/40 border border-black/10 shadow-md rounded-xl w-28 h-32 flex flex-col items-center justify-center overflow-hidden">
            <CardContent className="flex flex-col items-center justify-center p-2 relative">
              <div className="relative w-full h-16 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={item.value}
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ 
                      y: 0,
                      rotateX: 0,
                      opacity: 1,
                      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
                    }}
                    animate={{ 
                      y: 0,
                      rotateX: 0,
                      opacity: 1,
                      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
                    }}
                    exit={{ 
                      y: -20,
                      rotateX: -15,
                      opacity: 0,
                      clipPath: [
                        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                        "polygon(0% 0%, 100% 0%, 95% 60%, 5% 70%, 0% 100%)",
                        "polygon(0% 0%, 100% 0%, 90% 40%, 10% 50%, 0% 100%)",
                        "polygon(0% 0%, 100% 0%, 85% 20%, 15% 30%, 0% 100%)",
                        "polygon(50% 0%, 50% 0%, 50% 0%, 50% 0%)"
                      ],
                      transition: {
                        duration: 0.6,
                        ease: "easeInOut"
                      }
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      transformStyle: "preserve-3d",
                      transformOrigin: "center bottom"
                    }}
                  >
                    <span className="text-4xl font-extrabold text-black/80 tracking-tight relative z-10">
                      {item.value.toString().padStart(2, "0")}
                    </span>
                    
                    {/* Torn paper shadow effect */}
                    <motion.div
                      className="absolute inset-0 bg-black/10 rounded-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0 }}
                      exit={{ 
                        opacity: [0, 0.3, 0.5, 0.3, 0],
                        scale: [1, 1.02, 1.05, 1.03, 0.95],
                        transition: {
                          duration: 0.6,
                          ease: "easeInOut"
                        }
                      }}
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* New number sliding up */}
                <AnimatePresence>
                  <motion.div
                    key={`new-${item.value}`}
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ 
                      y: 30,
                      rotateX: 15,
                      opacity: 0,
                      scale: 0.8
                    }}
                    animate={{ 
                      y: 0,
                      rotateX: 0,
                      opacity: 1,
                      scale: 1,
                      transition: {
                        duration: 0.5,
                        delay: 0.2,
                        ease: "easeOut"
                      }
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                      transformOrigin: "center top"
                    }}
                  >
                    <span className="text-4xl font-extrabold text-black/80 tracking-tight">
                      {item.value.toString().padStart(2, "0")}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              <span className="text-sm text-black/60 uppercase tracking-wide mt-2 relative z-20">
                {item.label}
              </span>
            </CardContent>
            
            {/* Paper texture overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </Card>
          
          {/* Floating torn pieces */}
          <AnimatePresence>
            {[...Array(3)].map((_, idx) => (
              <motion.div
                key={`${item.value}-piece-${idx}`}
                className="absolute w-2 h-3 bg-[#EEDFC5]/60 rounded-sm pointer-events-none"
                style={{
                  top: `${20 + idx * 10}%`,
                  left: `${30 + idx * 20}%`,
                }}
                initial={{ 
                  opacity: 0,
                  scale: 0,
                  rotate: 0
                }}
                animate={{ 
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1, 0.8, 0],
                  rotate: [0, 180 + idx * 90, 360 + idx * 120],
                  y: [0, -20 - idx * 10, -40 - idx * 15],
                  x: [0, (idx - 1) * 15, (idx - 1) * 25],
                  transition: {
                    duration: 1.2,
                    delay: 0.1 + idx * 0.1,
                    ease: "easeOut"
                  }
                }}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}